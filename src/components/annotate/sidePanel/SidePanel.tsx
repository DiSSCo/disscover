/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getSidePanelToggle, setSidePanelToggle,
    getAnnotateTarget
} from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Dict } from 'global/Types';

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


const SidePanel = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const toggle = useAppSelector(getSidePanelToggle);
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const harmonisedAttributes: Dict = harmonisedAttributesSource;
    const [annotationFormToggle, setAnnotationFormToggle] = useState(false);

    /* ClassName for Side Panel */
    const classSidePanel = classNames({
        [`${styles.sidePanel}`]: true,
        [`${styles.active}`]: toggle
    });

    return (
        <div className={`${classSidePanel} h-100 w-100 d-flex flex-column p-4`}>
            {/* Top section */}
            <Row className="pt-2">
                <Col>
                    {/* Title and license indication */}
                    <Row className="align-items-center">
                        <Col className="col-md-auto">
                            <FontAwesomeIcon icon={faChevronLeft}
                                className={`${styles.sidePanelTopIcon} c-pointer c-primary`}
                                onClick={() => {
                                    dispatch(setSidePanelToggle(false));
                                    setAnnotationFormToggle(false);
                                }}
                            />
                        </Col>
                        <Col>
                            <h4 className="mb-0">
                                {annotateTarget.property ?
                                    <span> Annotations </span>
                                    : <span> All annotations </span>
                                }
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
                    {annotateTarget.property &&
                        <Row className="mt-5">
                            <Col className="col-md-auto pe-0">
                                <div className={`${styles.sidePanelTopStripe} h-100`} />
                            </Col>
                            <Col>
                                <p>
                                    <span className="fw-bold">
                                        {`${harmonisedAttributes[annotateTarget.property].displayName}: `}
                                    </span>
                                    <span className="fst-italic">
                                        {`${annotateTarget.target.data[annotateTarget.property]}`}
                                    </span>
                                </p>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
            {/* Side Panel Content */}
            {!annotationFormToggle ?
                <Row className="flex-grow-1 overflow-scroll">
                    <Col className="h-100">
                        <AnnotationsOverview ToggleAnnotationForm={() => setAnnotationFormToggle(!annotationFormToggle)} />
                    </Col>
                </Row>
                : <Row className="flex-grow-1 overflow-scroll">
                    <Col className="h-100">
                        <AnnotationForm ToggleAnnotationForm={() => setAnnotationFormToggle(!annotationFormToggle)}/>
                    </Col>
                </Row>
            }
        </div >
    );
}

export default SidePanel;