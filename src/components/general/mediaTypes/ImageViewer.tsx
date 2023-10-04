/* Import Dependencies */
import { useEffect, useState } from "react";
import OpenSeaDragon from 'openseadragon';
import KeycloakService from "keycloak/Keycloak";
import { isEmpty } from "lodash";
// @ts-expect-error
import * as Annotorious from '@recogito/annotorious-openseadragon';

/* Import Store */
import { useAppSelector, useAppDispatch } from "app/hooks";
// import { getAnnotoriousToggle, setAnnotoriousToggle } from "redux/general/GeneralSlice";
import { getDigitalMedia, getDigitalMediaAnnotations } from "redux/digitalMedia/DigitalMediaSlice";

/* Import Types */
import { ImageAnnotationTemplate, Annotation, Dict } from "global/Types";

/* Import API */
import InsertAnnotation from "api/annotate/InsertAnnotation";
import PatchAnnotation from "api/annotate/PatchAnnotation";
import DeleteAnnotation from "api/annotate/DeleteAnnotation";


/* Props Typing */
interface Props {
    mediaUrl: string,
    UpdateAnnotationsSource: Function
};


const ImageViewer = (props: Props) => {
    const { mediaUrl, UpdateAnnotationsSource } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const [annotorious, setAnnotorious] = useState<any>();
    const [renderTrigger, setRenderTrigger] = useState<boolean>(false);
    // const annotoriousToggle = useAppSelector(getAnnotoriousToggle);
    const digitalMedia = useAppSelector(getDigitalMedia);
    const digitalMediaAnnotations = useAppSelector(getDigitalMediaAnnotations);
    const [image, setImage] = useState<HTMLImageElement>();
    const [viewer, setViewer] = useState<any>();
    const config = {
        widgets: ['COMMENT']
    };

    /* OnLoad: fetch image details */
    useEffect(() => {
        new Promise((resolve, reject) => {
            const image = new Image();

            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = digitalMedia.mediaUrl;
        }).then((image: any) => {
            setImage(image);
        });
    }, [mediaUrl]);

    /* OnChange of Digital Media: Prepare OpenSeaDragon Image Viewer and initialise Annotorious */
    useEffect(() => {
        if (image) {
            if (!viewer) {
                const viewer = OpenSeaDragon({
                    id: "openSeaDragon",
                    preserveViewport: true,
                    visibilityRatio: 1,
                    tileSources: {
                        "type": 'image',
                        "url": mediaUrl
                    },
                    defaultZoomLevel: 0,
                    sequenceMode: true,
                    showFullPageControl: false,
                    showHomeControl: false,
                    prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@2.4/build/openseadragon/images/"
                });

                setViewer(viewer);
            } else {
                viewer.addSimpleImage({
                    url: mediaUrl
                });

                setViewer(viewer);
            }
        }
    }, [image]);

    /* Function for setting Annotorious */
    useEffect(() => {
        if (viewer) {
            const anno = Annotorious(viewer, config);

            /* If present, load existing annotations */
            if (digitalMediaAnnotations.visual.length) {
                const visualImageAnnotations = CalculateAnnotationPositions();

                /* Draw annotations on image */
                anno.setAnnotations(visualImageAnnotations);
            }

            /* Set Annotorious actions as object to state */
            setAnnotorious(anno);

            /* Event called when creating a new annotation */
            if (KeycloakService.IsLoggedIn()) {
                anno.on('createAnnotation', (w3cAnnotation: Dict) => {
                    SubmitAnnotation(w3cAnnotation, 'insert');

                    // dispatch(setAnnotoriousToggle(false));
                });

                anno.on('updateAnnotation', (w3cAnnotation: Dict) => {
                    SubmitAnnotation(w3cAnnotation, 'patch');
                });

                anno.on('deleteAnnotation', (w3cAnnotation: Dict) => {
                    RemoveAnnotation(w3cAnnotation);
                });

                anno.on('cancelSelected', () => {
                    // dispatch(setAnnotoriousToggle(false));
                });
            } else {
                anno.readOnly = true;
            }
        }
    }, [viewer]);

    /* Function for calculating annotation positions */
    const CalculateAnnotationPositions = () => {
        const visualImageAnnotations: Dict[] = [];

        if (image) {
            /* Get original size of image */
            const imgWidth = image.width;
            const imgHeight = image.height;

            /* For each annotation, calculate the W3C pixels relative to the TDWG AC position */
            digitalMediaAnnotations.visual.forEach((imageAnnotation: Annotation) => {
                /* Check if the annotation is a visual one */
                if (imageAnnotation.target.selector && imageAnnotation.target.selector.hasROI) {
                    const ROI = imageAnnotation.target.selector.hasROI;

                    const x = ROI["ac:xFrac"] * imgWidth;
                    const y = ROI["ac:yFrac"] * imgHeight;
                    const w = ROI["ac:widthFrac"] * imgWidth;
                    const h = ROI["ac:heightFrac"] * imgHeight;

                    visualImageAnnotations.push({
                        id: imageAnnotation.id,
                        "@context": 'http://www.w3.org/ns/anno.jsonld',
                        type: 'Annotation',
                        body: [{
                            purpose: 'commenting',
                            type: 'TextualBody',
                            value: imageAnnotation.body.values
                        }],
                        target: {
                            selector: {
                                conformsTo: 'http://www.w3.org/TR/media-frags/',
                                type: 'FragmentSelector',
                                value: `xywh=pixel:${x},${y},${w},${h}`
                            },
                            source: digitalMedia.mediaUrl
                        }
                    });
                }
            });
        }

        return visualImageAnnotations;
    }

    /* Function for submitting an Annotation */
    const SubmitAnnotation = (w3cAnnotation: Dict, method: string) => {
        if (image) {
            /* Get Annotation values */
            const bodyValues: string[] = [];

            w3cAnnotation.body.forEach((bodyValue: Dict) => {
                bodyValues.push(bodyValue.value);
            });

            /* Calculate W3C pixels to TDWG AC position */
            const coordinates = w3cAnnotation.target.selector.value.split(',');

            const xFrac = Number(coordinates[0].replace('xywh=pixel:', '')) / image.width;
            const yFrac = Number(coordinates[1]) / image.height;
            const widthFrac = Number(coordinates[2]) / image.width;
            const heightFrac = Number(coordinates[3]) / image.height;

            /* Prepare new Annotation object */
            const imageAnnotation: ImageAnnotationTemplate = {
                type: 'Annotation',
                motivation: 'commenting',
                body: {
                    type: 'TextualBody',
                    values: bodyValues
                },
                target: {
                    id: digitalMedia.id,
                    type: 'MediaObject',
                    selector: {
                        type: 'FragmentSelector',
                        conformsTo: 'https://ac.tdwg.org/termlist/#711-region-of-interest-vocabulary',
                        hasROI: {
                            "ac:xFrac": xFrac,
                            "ac:yFrac": yFrac,
                            "ac:widthFrac": widthFrac,
                            "ac:heightFrac": heightFrac
                        }
                    }
                }
            };

            /* Check if to post or patch */
            if (method === 'insert') {
                /* Post Annotation */
                InsertAnnotation(imageAnnotation, KeycloakService.GetToken()).then((annotation) => {
                    UpdateAnnotationsSource(annotation, false);

                    setRenderTrigger(true);
                }).catch(error => {
                    console.warn(error);
                });
            } else if (method === 'patch') {
                /* Patch Annotation */
                PatchAnnotation(imageAnnotation, w3cAnnotation.id, KeycloakService.GetToken()).then((annotation) => {
                    UpdateAnnotationsSource(annotation);
                }).catch(error => {
                    console.warn(error);
                });
            }
        }
    }

    /* Function for deleting an annotation */
    const RemoveAnnotation = (annotation: Dict) => {
        /* First, confirm if the user wants to delete the annotation, otherwise rerender */
        if (window.confirm(`Do you really want delete the annotation with id: ${annotation.id}`)) {
            /* Remove annotation */
            DeleteAnnotation(annotation.id, KeycloakService.GetToken()).then(() => {
                UpdateAnnotationsSource(annotation, true);
            }).catch(error => {
                console.warn(error);
            });
        } else {
            /* Redraw the annotation by triggering a rerender */
            setRenderTrigger(true);
        }
    }

    /* Function for updating annotations on Annotorious */
    useEffect(() => {
        /* If there are visual annotations present, calculate positions and redraw */
        if (!isEmpty(digitalMediaAnnotations.visual) && annotorious && renderTrigger) {
            const visualImageAnnotations = CalculateAnnotationPositions();

            annotorious.setAnnotations(visualImageAnnotations);

            /* If delete trigger is active, set to false */
            if (renderTrigger) {
                setRenderTrigger(false);
            }
        }
    }, [digitalMediaAnnotations, renderTrigger]);

    /* Function for toggling the strict annotation mode */
    // useEffect(() => {
    //     if (annotoriousToggle) {
    //         annotorious.setDrawingEnabled(true);
    //     }
    // }, [annotoriousToggle]);

    return (
        <div id="openSeaDragon" style={{ width: '100%', height: '100%' }} />
    );
}

export default ImageViewer;