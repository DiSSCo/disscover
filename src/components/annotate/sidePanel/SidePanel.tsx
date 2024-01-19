/* Import Dependencies */
import { useEffect } from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getSidePanelToggle, setSidePanelToggle, getAnnotationFormToggle, setAnnotationFormToggle,
    getAnnotateTarget, setAnnotateTarget, getEditAnnotation, setEditAnnotation
} from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Annotation } from 'app/types/Annotation';

/* Import Styles */
import styles from 'components/annotate/annotate.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faClosedCaptioning } from '@fortawesome/free-regular-svg-icons';

/* Import Components */
import AnnotationsOverview from './AnnotationsOverview';
import AnnotationForm from './AnnotationForm';
import Tooltip from 'components/general/tooltip/Tooltip';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function,
    UpdateAnnotationsSource?: Function,
    RefreshAnnotations?: Function
};


const SidePanel = (props: Props) => {
    const { ShowWithAnnotations, UpdateAnnotationsSource, RefreshAnnotations } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const toggle = useAppSelector(getSidePanelToggle);
    const annotationFormToggle = useAppSelector(getAnnotationFormToggle);
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const editAnnotation = useAppSelector(getEditAnnotation);

    /* Set Side Panel title */
    let sidePanelTitle: string;

    if (!isEmpty(editAnnotation)) {
        sidePanelTitle = 'Edit annotation';
    } else if (annotationFormToggle) {
        sidePanelTitle = 'Add annotation';
    } else if (annotateTarget.targetProperty.name) {
        sidePanelTitle = 'Annotations';
    } else {
        sidePanelTitle = 'All annotations';
    }

    /* OnLoad: Make sure toggle is reset */
    useEffect(() => {
        dispatch(setSidePanelToggle(false));
    }, []);

    /* OnToggle of Side Panel: Reset edit annotation */
    useEffect(() => {
        dispatch(setEditAnnotation({} as Annotation));
    }, [toggle]);

    /* Function for updating the Annotation view after posting, patching or deleting */
    const UpdateAnnotationView = (annotation: Annotation, remove: boolean = false) => {
        /* Update Annotations array of target */
        const copyAnnotateTarget = { ...annotateTarget };
        const copyAnnotations = [...copyAnnotateTarget.annotations];
        const annotationIndex = copyAnnotations.findIndex((annotationRecord) => annotationRecord['ods:id'] === annotation['ods:id']);

        /* If annotation was deleted, remove from array; patched, update array instance; else push to array */
        if (remove) {
            copyAnnotations.splice(annotationIndex, 1);
        } else if (annotationIndex !== -1) {
            copyAnnotations[annotationIndex] = annotation;
        } else {
            copyAnnotations.push(annotation);
        }

        copyAnnotateTarget.annotations = copyAnnotations;

        dispatch(setAnnotateTarget(copyAnnotateTarget));

        /* If provided, update source annotations */
        if (UpdateAnnotationsSource) {
            UpdateAnnotationsSource(annotation, remove);
        }

        /* If enabled, disable edit annotation */
        if (!isEmpty(editAnnotation)) {
            dispatch(setEditAnnotation({} as Annotation));
        }

        /* Return to Annotations overview */
        dispatch(setAnnotationFormToggle(false));
    }

    /* Function for when clicking on the Back Button */
    const BackAction = () => {
        if (annotationFormToggle || !isEmpty(editAnnotation)) {
            dispatch(setAnnotationFormToggle(false));
            dispatch(setEditAnnotation({} as Annotation));

            if (annotateTarget.targetProperty.name && annotateTarget.targetProperty.type !== 'superClass') {
                ShowWithAnnotations(annotateTarget.targetProperty.name, annotateTarget.targetProperty.type);
            } else {
                ShowWithAnnotations();
            }
        } else if (annotateTarget.targetProperty.name || annotateTarget.targetProperty.type === 'superClass') {
            ShowWithAnnotations();
        } else {
            dispatch(setSidePanelToggle(false));
            dispatch(setAnnotationFormToggle(false));
        }
    }

    /* Function to determine the target type being annotated */
    const DetermineTargetValues = () => {
        let targetName: string = '';
        let targetType: string = 'super class';

        if (!isEmpty(editAnnotation)) {
            if (editAnnotation['oa:target']['oa:selector']?.['ods:field']) {
                targetName = editAnnotation['oa:target']['oa:selector']['ods:field'] as string;
                targetType = 'field';
            } else if (editAnnotation['oa:target']['oa:selector']?.['oa:class']) {
                targetName = editAnnotation['oa:target']['oa:selector']['oa:class'] as string;
                targetType = 'class';
            }
        } else {
            targetName = annotateTarget.targetProperty.name;
            targetType = annotateTarget.targetProperty.type;
        }

        targetName = targetName.replace('$.', '');

        return { targetName, targetType };
    }

    const { targetName, targetType } = DetermineTargetValues();

    /* ClassName for Side Panel */
    const classSidePanel = classNames({
        [`${styles.sidePanel}`]: true,
        [`${styles.active}`]: toggle
    });

    return (
        <div className={`${classSidePanel} sidePanel h-100 w-100 d-flex flex-column p-4`}
            role="toolbar"
        >
            {/* Top section */}
            <Row className="pt-2 mb-2">
                <Col className="sidePanelTop">
                    {/* Title and license indication */}
                    <Row className="align-items-center">
                        <Col className="sidePanelCloseIcon col-md-auto">
                            <FontAwesomeIcon icon={faChevronLeft}
                                className="fs-2 c-pointer c-primary"
                                onClick={() => BackAction()}
                            />
                        </Col>
                        <Col>
                            <h4 className="mb-0">
                                {sidePanelTitle}
                            </h4>
                        </Col>
                        {RefreshAnnotations &&
                            <Col className="refreshAnnotationsButton col-md-auto">
                                <button type="button"
                                    className="primaryButton py-1 px-2"
                                    onClick={() => RefreshAnnotations(annotateTarget.targetProperty.name)}
                                >
                                    Refresh
                                </button>
                            </Col>
                        }
                        <Col className="col-md-auto">
                            <Tooltip text="All annotations are publicly available and subject to the CC-0 license" placement="left">
                                <span>
                                    <FontAwesomeIcon icon={faClosedCaptioning}
                                        className="fs-2 c-pointer c-accent"
                                    />
                                </span>
                            </Tooltip>
                        </Col>
                    </Row>
                    {/* Annotation current value, if target property is chosen */}
                    {(annotateTarget.targetProperty.name || annotateTarget.targetProperty.type === 'superClass' || !isEmpty(editAnnotation)) &&
                        <Row className="mt-5">
                            <Col className="col-md-auto pe-0">
                                <div className={`${styles.sidePanelTopStripe} h-100`} />
                            </Col>
                            <Col className="overflow-hidden">
                                <Row>
                                    <Col>
                                        {`Instance of ${targetType}`}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="fw-bold textOverflow">
                                            {targetName}
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>

            {/* Side Panel Content */}
            <Row className="flex-grow-1 overflow-scroll">
                <Col className="sidePanelBody h-100">
                    {!annotationFormToggle && isEmpty(editAnnotation) ?
                        <AnnotationsOverview UpdateAnnotationView={(annotation: Annotation, remove: boolean) => UpdateAnnotationView(annotation, remove)} />
                        : <AnnotationForm UpdateAnnotationView={(annotation: Annotation) => UpdateAnnotationView(annotation)} />
                    }
                </Col>
            </Row>
        </div >
    );
}

export default SidePanel;