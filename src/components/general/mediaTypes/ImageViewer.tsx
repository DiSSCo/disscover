/* Import Dependencies */
import { useEffect, useState, useRef } from 'react';
import KeycloakService from 'keycloak/Keycloak';
import { isEmpty } from 'lodash';
import {
    AnnotoriousImageAnnotator,
    ImageAnnotation,
    OpenSeadragonAnnotator,
    OpenSeadragonPopup,
    OpenSeadragonViewer,
    PointerSelectAction,
    useAnnotator,
    W3CImageFormat,
    W3CAnnotation,
    W3CAnnotationTarget
} from '@annotorious/react';

/* Import Store */
import { useAppSelector, useAppDispatch } from "app/hooks";
import { getAnnotoriousMode, setAnnotoriousMode } from "redux/general/GeneralSlice";
import { getDigitalMedia, getDigitalMediaAnnotations } from "redux/digitalMedia/DigitalMediaSlice";
import { getUser } from 'redux/user/UserSlice';

/* Import Types */
import { AnnotationTemplate } from 'app/Types';
import { Annotation } from 'app/types/Annotation';

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
    const annotorious = useAnnotator<AnnotoriousImageAnnotator<W3CAnnotation>>();
    const viewerRef = useRef<OpenSeadragon.Viewer>(null);
    const tooltipFieldRef = useRef<HTMLInputElement>(null);

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    const digitalMediaAnnotations = useAppSelector(getDigitalMediaAnnotations);
    const annotoriousMode = useAppSelector(getAnnotoriousMode);
    const user = useAppSelector(getUser);
    const [image, setImage] = useState<HTMLImageElement>();

    const OSDOptions: OpenSeadragon.Options = {
        prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@3.1/build/openseadragon/images/",
        crossOriginPolicy: "Anonymous",
        gestureSettingsMouse: {
            clickToZoom: false
        }
    };

    /* OnLoad: fetch image details */
    useEffect(() => {
        new Promise((resolve, reject) => {
            const image = new Image();

            image.src = digitalMedia.digitalEntity['ac:accessUri'];

            image.onload = (image) => resolve(image);
            image.onerror = () => reject;
        }).then((image: any) => {
            setImage(image.target);

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
            /* Load initial Annotorious Annotations */
            LoadAnnotations();

            /* Event for when selecting or deselecting an Annotation */
            annotorious.on('selectionChanged', (selectedAnnotations: W3CAnnotation[]) => {
                const annotoriousAnnotations = annotorious.getAnnotations();
                const annotoriousAnnotation = selectedAnnotations[0];

                /* Check for unfinished annotations */
                annotoriousAnnotations.forEach((annotation) => {
                    if (!annotation.id.includes('20.5000.1025') && !annotation.id.includes('TEST') && (!annotoriousAnnotation || annotoriousAnnotation.id !== annotation.id)) {
                        annotorious.removeAnnotation(annotation);
                    }
                });
            });

            /* Event for when creating an Annotation */
            annotorious.on('createAnnotation', () => {
                /* Return to cursor tool */
                dispatch(setAnnotoriousMode('move'));

                /* Focus on input field */
                setTimeout(() => {
                    tooltipFieldRef.current?.focus();
                }, 300);
            });

            /* Event for when an Annotation has been edited */
            annotorious.on('updateAnnotation', () => {

            });
        }
    }, [annotorious, image]);

    /* OnChange of Digital Media Annotations: check state of Annotations on the canvas */
    useEffect(() => {
        if (annotorious && annotorious.getAnnotations().length !== digitalMediaAnnotations.visual.length) {
            const annotoriousAnnotations: W3CAnnotation[] = annotorious.getAnnotations();

            /* For each Annotorious Annotation, check if it still exists, otherwise remove */
            annotoriousAnnotations.forEach((annotoriousAnnotation) => {
                if (!(digitalMediaAnnotations.visual.find((annotation) => annotation['ods:id'] === annotoriousAnnotation.id))) {
                    annotorious.removeAnnotation(annotoriousAnnotation);
                }
            });
        } else if (annotorious && !annotorious.getAnnotations().length) {
            LoadAnnotations();
        }
    }, [digitalMediaAnnotations]);

    /* Function for loading initial Annotorious Annotations upon the canvas */
    const LoadAnnotations = () => {
        if (!isEmpty(digitalMediaAnnotations.visual)) {
            const visualImageAnnotations: W3CAnnotation[] = [];

            digitalMediaAnnotations.visual.forEach((annotation) => {
                const annotoriousAnnotation = ReformatToAnnotoriousAnnotation(annotation);

                if (annotoriousAnnotation) {
                    visualImageAnnotations.push(annotoriousAnnotation);
                }
            });

            annotorious.setAnnotations(visualImageAnnotations);
        } else {
            annotorious.setAnnotations([]);
        }
    }

    /* Function for depicting a method when selecting an Annotation */
    const SelectAction = (annotoriousAnnotation: ImageAnnotation) => {
        let selectAction;

        /* Enable Annotorious edit mode if logged in and Annotation belongs to user, otherwise highlight */
        if (KeycloakService.IsLoggedIn() && (user.orcid && user.orcid === annotoriousAnnotation?.bodies?.[0]?.creator?.id)) {
            selectAction = PointerSelectAction.EDIT;
        } else {
            selectAction = PointerSelectAction.SELECT;
        }

        return selectAction;
    }

    /* Function for calculating annotation positions and formatting to the Annotorious format */
    const ReformatToAnnotoriousAnnotation = (annotation: Annotation) => {
        let annotoriousAnnotation: W3CAnnotation = {} as W3CAnnotation;

        if (image) {
            /* Get original size of image */
            const imgWidth = image.width;
            const imgHeight = image.height;

            /* Check if the annotation is a visual one and */
            if (annotation['oa:target']['oa:selector']?.['ac:hasRoi']) {
                /* Calculate the W3C pixels relative to the TDWG AC position */
                const ROI = annotation['oa:target']['oa:selector']['ac:hasRoi'] as {
                    "ac:xFrac": number,
                    "ac:yFrac": number,
                    "ac:widthFrac": number,
                    "ac:heightFrac": number
                };

                const x = ROI["ac:xFrac"] * imgWidth;
                const y = ROI["ac:yFrac"] * imgHeight;
                const w = ROI["ac:widthFrac"] * imgWidth;
                const h = ROI["ac:heightFrac"] * imgHeight;

                annotoriousAnnotation = {
                    id: annotation['ods:id'],
                    "@context": 'http://www.w3.org/ns/anno.jsonld',
                    type: 'Annotation',
                    body: [{
                        type: 'TextualBody',
                        value: annotation['oa:body']['oa:value'][0] as string ?? '',
                        purpose: 'commenting',
                        creator: {
                            id: annotation['oa:creator']['ods:id']
                        }
                    }],
                    target: {
                        selector: {
                            conformsTo: 'http://www.w3.org/TR/media-frags/',
                            type: 'FragmentSelector',
                            value: `xywh=pixel:${x},${y},${w},${h}`
                        },
                        source: digitalMedia.digitalEntity['ac:accessUri']
                    }
                };
            }
        }

        return annotoriousAnnotation;
    }

    /* Function to update an Annotorious Annotation on the canvas */
    const UpdateAnnotoriousAnnotation = (annotoriousAnnotation: W3CAnnotation, originalId?: string) => {
        /* Remove old Annotorious Annotation */
        if (originalId) {
            annotorious.removeAnnotation(originalId);

            /* Replace with new version of Annotation */
            annotorious.addAnnotation(annotoriousAnnotation);
        } else {
            annotorious.updateAnnotation(annotoriousAnnotation);
        }

        /* Set selected annotation */
        annotorious.setSelected(annotoriousAnnotation.id);
    }

    /* Function for submitting an Annotation */
    const SubmitAnnotation = (values: string[], method: string) => {
        if (image) {
            const annotoriousAnnotation = annotorious.getSelected()[0];

            /* Calculate W3C pixels to TDWG AC position */
            const target = annotoriousAnnotation.target as W3CAnnotationTarget & { selector: { value: string } };
            const coordinates = target.selector?.value.split(',');

            const xFrac = Number(coordinates[0].replace('xywh=pixel:', '')) / image.width;
            const yFrac = Number(coordinates[1]) / image.height;
            const widthFrac = Number(coordinates[2]) / image.width;
            const heightFrac = Number(coordinates[3]) / image.height;

            /* Prepare new Annotation object */
            const imageAnnotation: AnnotationTemplate = {
                "oa:motivation": 'oa:commenting',
                "oa:target": {
                    "ods:id": digitalMedia.digitalEntity['ods:id'],
                    "ods:type": 'MediaObject',
                    "oa:selector": {
                        "ods:type": 'FragmentSelector',
                        "dcterms:conformsTo": 'https://ac.tdwg.org/termlist/#711-region-of-interest-vocabulary',
                        "ac:hasRoi": {
                            "ac:xFrac": xFrac,
                            "ac:yFrac": yFrac,
                            "ac:widthFrac": widthFrac,
                            "ac:heightFrac": heightFrac
                        }
                    }
                },
                "oa:body": {
                    "ods:type": 'TextualBody',
                    "oa:value": values
                }
            };

            /* Check if to post or patch */
            if (method === 'insert') {
                /* Post Annotation */
                InsertAnnotation(imageAnnotation, KeycloakService.GetToken()).then((annotation) => {
                    UpdateAnnotationsSource(annotation);

                    /* Update Annotorious Annotation */
                    UpdateAnnotoriousAnnotation(ReformatToAnnotoriousAnnotation(annotation), annotoriousAnnotation.id);
                }).catch(error => {
                    console.warn(error);
                });
            } else if (method === 'patch') {
                /* Patch Annotation */
                PatchAnnotation(imageAnnotation, annotoriousAnnotation.id, KeycloakService.GetToken()).then((annotation) => {
                    UpdateAnnotationsSource(annotation);

                    /* Update Annotorious Annotation */
                    UpdateAnnotoriousAnnotation(ReformatToAnnotoriousAnnotation(annotation));
                }).catch(error => {
                    console.warn(error);
                });
            }
        }
    }

    /* Function for removing an Annotation */
    const RemoveAnnotation = (annotation: Annotation) => {
        /* Ask for user confirmation */
        if (window.confirm(`Do you really want delete the annotation with id: ${annotation['ods:id']}?`)) {
            /* Deselect annotation */
            annotorious.cancelSelected();

            /* Remove annotation */
            DeleteAnnotation(annotation['ods:id'], KeycloakService.GetToken()).then(() => {
                UpdateAnnotationsSource(annotation, true);
            }).catch(error => {
                console.warn(error);
            });
        }
    }

    /* Prepare ToolTip */
    const tooltip = <ImagePopup tooltipFieldRef={tooltipFieldRef}
        annotorious={annotorious}

        SubmitAnnotation={(values: string[], method: string) => SubmitAnnotation(values, method)}
        RemoveAnnotation={(annotation: Annotation) => RemoveAnnotation(annotation)}
    />

    return (
        <div className="w-100 h-100">
            <OpenSeadragonAnnotator
                adapter={W3CImageFormat('https://iiif.bodleian.ox.ac.uk/iiif/image/af315e66-6a85-445b-9e26-012f729fc49c')}
                drawingEnabled={annotoriousMode === 'draw'}
                drawingMode="click"
                tool="rectangle"
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