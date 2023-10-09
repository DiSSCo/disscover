/* Import Dependencies */
import { useEffect, useState, useRef } from 'react';
import KeycloakService from 'keycloak/Keycloak';
import { isEmpty } from 'lodash';
import {
    AnnotoriousOpenSeadragonAnnotator,
    ImageAnnotation,
    OpenSeadragonAnnotator,
    OpenSeadragonPopup,
    OpenSeadragonViewer,
    PointerSelectAction,
    useAnnotator
} from '@annotorious/react';

/* Import Store */
import { useAppSelector, useAppDispatch } from "app/hooks";
import { getAnnotoriousMode, setAnnotoriousMode } from "redux/general/GeneralSlice";
import { getDigitalMedia, getDigitalMediaAnnotations } from "redux/digitalMedia/DigitalMediaSlice";

/* Import Types */
import { Annotation, ImageAnnotationTemplate, Dict } from 'global/Types';

/* Import API */
import InsertAnnotation from 'api/annotate/InsertAnnotation';
import PatchAnnotation from 'api/annotate/PatchAnnotation';
import DeleteAnnotation from 'api/annotate/DeleteAnnotation';

/* Import Components */
import ImagePopup from './ImagePopup';


/* Props Typing */
interface Props {
    mediaUrl: string,
    UpdateAnnotationsSource: Function
};


const ImageViewer = (props: Props) => {
    const { mediaUrl, UpdateAnnotationsSource } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const annotorious = useAnnotator<AnnotoriousOpenSeadragonAnnotator>();
    const viewerRef = useRef<OpenSeadragon.Viewer>(null);
    const tooltipFieldRef = useRef<HTMLInputElement>(null);

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    const digitalMediaAnnotations = useAppSelector(getDigitalMediaAnnotations);
    const annotoriousMode = useAppSelector(getAnnotoriousMode);
    const [image, setImage] = useState<HTMLImageElement>();
    const [selectedAnnotation, setSelectedAnnotation] = useState<ImageAnnotation | null>(null);
    const [editAnnotation, setEditAnnotation] = useState<ImageAnnotation | null>(null);

    const OSDOptions: OpenSeadragon.Options = {
        prefixUrl: 'https://cdn.jsdelivr.net/npm/openseadragon@3.1/build/openseadragon/images/',
        tileSources: {
            type: 'image',
            url: mediaUrl
        },
        crossOriginPolicy: 'Anonymous',
        gestureSettingsMouse: {
            clickToZoom: false
        }
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

            if (viewerRef.current) {
                viewerRef.current.open({
                    type: 'image',
                    url: mediaUrl
                });
            }
        });
    }, [mediaUrl]);

    /* Function for handling Annotorious */
    useEffect(() => {
        if (annotorious && image) {
            const annotoriousAnnotations = annotorious.getAnnotations();

            if (!annotoriousAnnotations.length) {
                RefreshAnnotations();
            }

            /* Event for when selecting or deselecting an Annotation */
            annotorious.on('selectionChanged', (w3cAnnotations: ImageAnnotation[]) => {
                const selected: boolean = annotorious.state.selection.isSelected(w3cAnnotations[0]);

                if (selected) {
                    /* Set selected annotation */
                    setSelectedAnnotation(w3cAnnotations[0]);
                } else {
                    if ((digitalMediaAnnotations.visual.length && annotorious.getAnnotations().length)
                        && annotorious.getAnnotations().length !== digitalMediaAnnotations.visual.length) {
                        RefreshAnnotations();
                    }

                    /* Reset selected and edit annotation */
                    setSelectedAnnotation(null);
                    setEditAnnotation(null);
                }
            });

            /* Event for when creating an Annotation */
            annotorious.on('createAnnotation', (w3cAnnotation: ImageAnnotation) => {
                /* Return to cursor tool */
                dispatch(setAnnotoriousMode('cursor'));

                /* Set selected annotation */
                setEditAnnotation(w3cAnnotation);

                /* Focus on input field */
                setTimeout(() => {
                    tooltipFieldRef.current?.focus();
                }, 300);
            });

            /* Event for when an Annotatio has been edited */
            annotorious.on('updateAnnotation', (W3cAnnotation: ImageAnnotation) => {
                /* Set new edit target */
                setEditAnnotation(W3cAnnotation);
            });
        }
    }, [annotorious, image]);

    /* Function for refreshing annotations on Annotorious layer */
    const RefreshAnnotations = () => {
        /* If there are visual annotations present, calculate positions and redraw */
        if (!isEmpty(digitalMediaAnnotations.visual)) {
            const visualImageAnnotations = CalculateAnnotationPositions();

            annotorious.setAnnotations(visualImageAnnotations);
        } else {
            annotorious.setAnnotations([]);
        }
    }

    useEffect(() => {
        if (annotorious) {
            RefreshAnnotations();
        }
    }, [digitalMediaAnnotations]);

    /* Function for depicting method when selecting an Annotation */
    const SelectAction = (w3cAnnotation: ImageAnnotation) => {
        let selectAction;

        /* Enable Annotorious edit mode if logged in and Annotation belongs to user, otherwise highlight */
        if (KeycloakService.IsLoggedIn() && (KeycloakService.GetSubject() === w3cAnnotation.bodies[0].creator.id)) {
            selectAction = PointerSelectAction.EDIT;
        } else {
            selectAction = PointerSelectAction.HIGHLIGHT;
        }

        return selectAction;
    }

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
                if (imageAnnotation.target.selector?.hasROI) {
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
                            type: 'TextualBody',
                            value: imageAnnotation.body.values,
                            purpose: 'commenting',
                            creator: {
                                id: imageAnnotation.creator
                            }
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
    const SubmitAnnotation = (values: string[], method: string) => {
        if (image) {
            /* Calculate W3C pixels to TDWG AC position */
            const coordinates = editAnnotation.target.selector.value.split(',');

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
                    values: values
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
                }).catch(error => {
                    console.warn(error);
                });
            } else if (method === 'patch') {
                /* Patch Annotation */
                PatchAnnotation(imageAnnotation, editAnnotation.id, KeycloakService.GetToken()).then((annotation) => {
                    UpdateAnnotationsSource(annotation);
                }).catch(error => {
                    console.warn(error);
                });
            }
        }
    }

    /* Function for removing an Annotation */
    const RemoveAnnotation = () => {
        /* Ask for user confirmation */
        if (window.confirm(`Do you really want delete the annotation with id: ${selectedAnnotation.id}?`)) {
            /* Remove annotation */
            DeleteAnnotation(selectedAnnotation.id, KeycloakService.GetToken()).then(() => {
                UpdateAnnotationsSource(selectedAnnotation, true);
            }).catch(error => {
                console.warn(error);
            });
        }
    }

    /* Prepare ToolTip */
    const tooltip = <ImagePopup selectedAnnotation={selectedAnnotation}
        editAnnotation={editAnnotation}
        tooltipFieldRef={tooltipFieldRef}
        annotorious={annotorious}

        RefreshAnnotations={() => RefreshAnnotations()}
        SubmitAnnotation={(values: string[], method: string) => SubmitAnnotation(values, method)}
        SetSelectedAnnotation={(selectedAnnotation: ImageAnnotation) => setSelectedAnnotation(selectedAnnotation)}
        SetEditAnnotation={(editAnnotation: ImageAnnotation) => setEditAnnotation(editAnnotation)}
        RemoveAnnotation={() => RemoveAnnotation()}
    />

    return (
        <div className="w-100 h-100">
            <OpenSeadragonAnnotator className="h-100"
                keepEnabled={false}
                tool={annotoriousMode}
                pointerSelectAction={SelectAction}
            >
                <OpenSeadragonViewer className="openseadragon h-100"
                    ref={viewerRef}
                    options={OSDOptions}
                />

                <OpenSeadragonPopup
                    popup={() => (
                        tooltip
                    )}
                />
            </OpenSeadragonAnnotator>
        </div>
    );
}

export default ImageViewer;