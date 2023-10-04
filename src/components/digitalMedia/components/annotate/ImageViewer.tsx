/* Import Dependencies */
import { useEffect, useState, useRef } from 'react';
import KeycloakService from 'keycloak/Keycloak';
import { Formik, Form, Field } from 'formik';
import { isEmpty } from 'lodash';
import {
    // AnnotoriousContext,
    AnnotoriousOpenSeadragonAnnotator,
    ImageAnnotation,
    OpenSeadragonAnnotator,
    OpenSeadragonPopup,
    OpenSeadragonViewer,
    PointerSelectAction,
    useAnnotator
} from '@annotorious/react';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from "app/hooks";
import { getAnnotoriousMode, setAnnotoriousMode } from "redux/general/GeneralSlice";
import { getDigitalMedia, getDigitalMediaAnnotations } from "redux/digitalMedia/DigitalMediaSlice";

/* Import Types */
import { Annotation, ImageAnnotationTemplate, Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/general/mediaTypes/mediaTypes.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import InsertAnnotation from 'api/annotate/InsertAnnotation';
import PatchAnnotation from 'api/annotate/PatchAnnotation';
import DeleteAnnotation from 'api/annotate/DeleteAnnotation';


/* Props Typing */
interface Props {
    mediaUrl: string,
    UpdateAnnotationsSource: Function
};


const ImageViewer = (props: Props) => {
    const { mediaUrl, UpdateAnnotationsSource } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const anno = useAnnotator<AnnotoriousOpenSeadragonAnnotator>();
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
        if (anno && image) {
            const annotoriousAnnotations = anno.getAnnotations();

            if (digitalMediaAnnotations.length || (digitalMediaAnnotations.length !== annotoriousAnnotations)) {
                RefreshAnnotations();
            }

            /* Event for when selecting or deselecting an Annotation */
            anno.on('selectionChanged', (w3cAnnotations: ImageAnnotation[]) => {
                const selected: boolean = anno.state.selection.isSelected(w3cAnnotations[0]);

                if (selected) {
                    /* Set selected annotation */
                    setSelectedAnnotation(w3cAnnotations[0]);
                } else {
                    /* If annotation is new and not yet saved: remove from view */
                    if (!selectedAnnotation) {
                        RefreshAnnotations();
                    }

                    /* Reset selected and edit annotation */
                    setSelectedAnnotation(null);
                    setEditAnnotation(null);
                }
            });

            /* Event for when creating an Annotation */
            anno.on('createAnnotation', (w3cAnnotation: ImageAnnotation) => {
                /* Return to cursor tool */
                dispatch(setAnnotoriousMode('cursor'));

                /* Set selected annotation */
                setEditAnnotation(w3cAnnotation);

                /* Focus on input field */
                setTimeout(() => {
                    tooltipFieldRef.current?.focus();
                }, 300);
            });
        }
    }, [anno, image]);

    /* Function for refreshing annotations on Annotorious layer */
    const RefreshAnnotations = () => {
        /* If there are visual annotations present, calculate positions and redraw */
        if (!isEmpty(digitalMediaAnnotations.visual)) {
            const visualImageAnnotations = CalculateAnnotationPositions();

            anno.setAnnotations(visualImageAnnotations);
        } else {
            anno.setAnnotations([]);
        }
    }

    /* Function for depicting method when selecting an Annotation */
    const SelectAction = (annotation: ImageAnnotation) => {
        let selectAction: string;

        /* If user is logged in and annotation belongs to user: enable Annotorious edit mode */
        // if (KeycloakService.IsLoggedIn() && annotation.) {

        // }

        return KeycloakService.IsLoggedIn() ? PointerSelectAction.EDIT : PointerSelectAction.HIGHLIGHT;
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
                    // UpdateAnnotationsSource(annotation, false);

                    // RefreshAnnotations();

                    console.log(annotation);
                }).catch(error => {
                    console.warn(error);
                });
            } else if (method === 'patch') {
                /* Patch Annotation */
                console.log(editAnnotation.id);

                // PatchAnnotation(imageAnnotation, editAnnotation.id, KeycloakService.GetToken()).then((annotation) => {
                //     // UpdateAnnotationsSource(annotation);

                //     // RefreshAnnotations();
                // }).catch(error => {
                //     console.warn(error);
                // });
            }
        }
    }

    /* Function for validating Annotation value input */
    const ValidateAnnotation = (values: Dict) => {
        const errors: Dict = {};

        if (!values.annotationValue) {
            errors.annotationValue = "Empty annotations are not accepted"
        }

        return errors;
    }

    /* Function for removing an Annotation */
    const RemoveAnnotation = () => {
        /* Ask for user confirmation */
        if (window.confirm(`Do you really want delete the annotation with id: ${selectedAnnotation.id}?`)) {
            /* Remove annotation */
            // DeleteAnnotation(selectedAnnotation.id, KeycloakService.GetToken()).then(() => {
            //     // UpdateAnnotationsSource(annotation, true);
            // }).catch(error => {
            //     console.warn(error);
            // });
        }
    }

    /* ClassNames */
    const classEditBlock = classNames({
        'd-none': !editAnnotation
    });

    const classInfoBlock = classNames({
        'd-none': editAnnotation
    });

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
                        <div className={styles.annotoriousPopUp}>
                            <Row>
                                <Col className="bgc-white px-3 py-2">
                                    {/* Annotation values */}
                                    <Row className={`${styles.annotoriousPopUpSection} pb-2`}>
                                        <Col>
                                            <div className={classEditBlock}>
                                                <Formik
                                                    initialValues={{
                                                        annotationValue: (editAnnotation && editAnnotation.body.length) ?
                                                            editAnnotation.body[0].value[0] : '',
                                                    }}
                                                    enableReinitialize={true}
                                                    validate={ValidateAnnotation}
                                                    onSubmit={async (form) => {
                                                        await new Promise((resolve) => setTimeout(resolve, 500));

                                                        console.log(selectedAnnotation);

                                                        /* Submit new Annotation */
                                                        if (!selectedAnnotation.body.length) {
                                                            /* Patch Annotation */
                                                            SubmitAnnotation([form.annotationValue], 'insert');
                                                        } else {
                                                            /* Insert Annotation */
                                                            SubmitAnnotation([form.annotationValue], 'patch')
                                                        }
                                                    }}
                                                >
                                                    {({ errors }) => (
                                                        <Form>
                                                            <Row>
                                                                <Col>
                                                                    <Field name="annotationValue"
                                                                        type="text"
                                                                        innerRef={tooltipFieldRef}
                                                                        className="w-100 formField fs-4 py-1"
                                                                    />

                                                                    {errors.annotationValue &&
                                                                        <p className="fs-5 c-denied mt-2">
                                                                            {errors.annotationValue as string}
                                                                        </p>
                                                                    }
                                                                </Col>
                                                                <Col className="col-md-auto ps-0">
                                                                    <button type="submit"
                                                                        className="secondaryButton fs-4 px-3"
                                                                    >
                                                                        Save
                                                                    </button>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </div>

                                            <div className={classInfoBlock}>
                                                <Row>
                                                    <Col>
                                                        <p className="fs-4">
                                                            {(selectedAnnotation && selectedAnnotation.body.length) ?
                                                                selectedAnnotation.body[0].value[0] : ''
                                                            }
                                                        </p>
                                                    </Col>
                                                    <Col className="col-md-auto">
                                                        <FontAwesomeIcon icon={faPencil}
                                                            className="c-pointer"
                                                            onClick={() => setEditAnnotation(selectedAnnotation)}
                                                        />
                                                    </Col>
                                                    <Col className="col-md-auto ps-0">
                                                        <FontAwesomeIcon icon={faTrashCan}
                                                            className="c-pointer"
                                                            onClick={() => RemoveAnnotation()}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                    {/* Close button */}
                                    <Row className="mt-3">
                                        <Col className="d-flex justify-content-end">
                                            <button type="button"
                                                className="primaryButton fs-4 px-3"
                                                onClick={() => {
                                                    if (selectedAnnotation) {
                                                        /* Close when annotation was selected */
                                                        setSelectedAnnotation(null);
                                                    } else {
                                                        /* Remove when annotation was left empty */
                                                        RefreshAnnotations();
                                                    }

                                                    anno.state.selection.clear();
                                                }}
                                            >
                                                {selectedAnnotation ?
                                                    <span> Close </span>
                                                    : <span> Cancel </span>
                                                }
                                            </button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    )}
                />
            </OpenSeadragonAnnotator>
        </div>
    );
}

export default ImageViewer;