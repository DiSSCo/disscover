/* Import Dependencies */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getSidePanelToggle, setSidePanelToggle, getAnnotateTarget,
    setAnnotateTarget, getEditAnnotation, setEditAnnotation
} from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Annotation, Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/annotate/annotate.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faClosedCaptioning } from '@fortawesome/free-regular-svg-icons';

/* Import Sources */
import harmonisedAttributesSource from 'sources/hamonisedAttributes.json';

/* Import Components */
import AnnotationsOverview from './AnnotationsOverview';
import AnnotationForm from './AnnotationForm';
import Tooltip from 'components/general/tooltip/Tooltip';


/* Props Typing */
interface Props {
    ShowWithAllAnnotations: Function,
    UpdateAnnotationsSource?: Function
};


const SidePanel = (props: Props) => {
    const { ShowWithAllAnnotations, UpdateAnnotationsSource } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const toggle = useAppSelector(getSidePanelToggle);
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const editAnnotation = useAppSelector(getEditAnnotation);
    const harmonisedAttributes: Dict = harmonisedAttributesSource;
    const [annotationFormToggle, setAnnotationFormToggle] = useState(false);

    /* Set Side Panel title */
    let sidePanelTitle: string;

    if (!isEmpty(editAnnotation)) {
        sidePanelTitle = 'Edit annotation';
    } else if (annotationFormToggle) {
        sidePanelTitle = 'Add annotation';
    } else if (annotateTarget.property) {
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
        const annotationIndex = copyAnnotations.findIndex((annotationRecord) => annotationRecord.id === annotation.id);

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
        setAnnotationFormToggle(false);
    }

    /* Function for when clicking on the Back Button */
    const BackAction = () => {
        if (annotationFormToggle || !isEmpty(editAnnotation)) {
            setAnnotationFormToggle(false);
            dispatch(setEditAnnotation({} as Annotation));
        } else if (annotateTarget.property) {
            ShowWithAllAnnotations();
        } else {
            dispatch(setSidePanelToggle(false));
            setAnnotationFormToggle(false);
        }
    }

    /* ClassName for Side Panel */
    const classSidePanel = classNames({
        [`${styles.sidePanel}`]: true,
        [`${styles.active}`]: toggle
    });

    return (
        <div className={`${classSidePanel} h-100 w-100 d-flex flex-column p-4`}
            role="sidePanel"
        >
            {/* Top section */}
            <Row className="pt-2">
                <Col>
                    {/* Title and license indication */}
                    <Row className="align-items-center">
                        <Col className="col-md-auto">
                            <FontAwesomeIcon icon={faChevronLeft}
                                className={`${styles.sidePanelTopIcon} c-pointer c-primary`}
                                onClick={() => BackAction()}
                            />
                        </Col>
                        <Col>
                            <h4 className="mb-0">
                                {sidePanelTitle}
                            </h4>
                        </Col>
                        <Col className="col-md-auto">
                            <Tooltip text="All annotations are publicly available and subject to the CC-0 license" placement="left">
                                <span>
                                    <FontAwesomeIcon icon={faClosedCaptioning}
                                        className={`${styles.sidePanelTopIcon} c-pointer c-accent`}
                                    />
                                </span>
                            </Tooltip>
                        </Col>
                    </Row>
                    {/* Annotation current value, if property is chosen */}
                    {(annotateTarget.property || (editAnnotation?.target?.indvProp)) &&
                        <Row className="mt-5">
                            <Col className="col-md-auto pe-0">
                                <div className={`${styles.sidePanelTopStripe} h-100`} />
                            </Col>
                            <Col>
                                <p>
                                    <span className="fw-bold">
                                        {`${harmonisedAttributes[annotateTarget.property ? annotateTarget.property : editAnnotation.target.indvProp].displayName}: `}
                                    </span>
                                    <span className="fst-italic">
                                        {`${annotateTarget.target.data[annotateTarget.property ? annotateTarget.property : editAnnotation.target.indvProp]}`}
                                    </span>
                                </p>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
            {/* Side Panel Content */}
            {!annotationFormToggle && isEmpty(editAnnotation) ?
                <Row className="flex-grow-1 overflow-scroll">
                    <Col className="h-100">
                        <AnnotationsOverview ToggleAnnotationForm={() => setAnnotationFormToggle(!annotationFormToggle)}
                            UpdateAnnotationView={(annotation: Annotation, remove: boolean) => UpdateAnnotationView(annotation, remove)}
                        />
                    </Col>
                </Row>
                : <Row className="flex-grow-1 overflow-scroll">
                    <Col className="h-100">
                        <AnnotationForm HideAnnotationForm={() => setAnnotationFormToggle(false)}
                            UpdateAnnotationView={(annotation: Annotation) => UpdateAnnotationView(annotation)}
                        />
                    </Col>
                </Row>
            }
        </div >
    );
}

export default SidePanel;