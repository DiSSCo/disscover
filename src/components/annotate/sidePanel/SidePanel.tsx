/* Import Dependencies */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { Capitalize } from 'global/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getSidePanelToggle, setSidePanelToggle,
    getAnnotateTarget
} from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Annotation as AnnotationType, Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/annotate/annotate.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faClosedCaptioning } from '@fortawesome/free-regular-svg-icons';

/* Import Sources */
import harmonisedAttributesSource from 'sources/hamonisedAttributes.json';
import annotationMotivationsSource from 'sources/annotationMotivations.json';

/* Import Components */
import Annotation from './Annotation';
import Tooltip from 'components/general/tooltip/Tooltip';
import ActionsDropdown from 'components/general/actionsDropdown/ActionsDropdown';


const SidePanel = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const toggle = useAppSelector(getSidePanelToggle);
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const [annotations, setAnnotations] = useState<{ [motivation: string]: AnnotationType[] }>({});
    const harmonisedAttributes: Dict = harmonisedAttributesSource;
    const annotationMotivations: Dict = annotationMotivationsSource;

    const [motivationFilter, setMotivationFilter] = useState<{ value: string, label: string }>({ value: 'all', label: 'All annotations' });
    let motivationActions = [
        { value: 'all', label: 'All annotations' }
    ];

    const [sortValue, setSortValue] = useState<{ value: string, label: string }>({ value: 'sort', label: 'Select a property' });
    const sortActions = [
        { value: 'none', label: 'Select a property' },
        { value: 'date', label: 'Date' }
    ];

    /* For each annotation type, push to motivation actions */
    Object.keys(annotationMotivations).forEach((motivation) => {
        const annotationMotivation = annotationMotivations[motivation];

        motivationActions.push({
            value: motivation,
            label: annotationMotivation.displayName
        });
    });

    /* Function for filtering and sorting the annotations based on user input */
    useEffect(() => {
        let orderedAnnotations: { [motivation: string]: AnnotationType[] } = {};

        /* Order target annotations by motivation, depends on motivation filter */
        annotateTarget.annotations.forEach((annotation) => {
            if (motivationFilter.value === 'all' || motivationFilter.value === annotation.motivation) {
                if (orderedAnnotations[annotation.motivation]) {
                    orderedAnnotations[annotation.motivation].push(annotation);
                } else {
                    orderedAnnotations[annotation.motivation] = [annotation];
                }
            }
        });

        setAnnotations(orderedAnnotations);
    }, [annotateTarget.annotations, motivationFilter, sortValue]);

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
                                onClick={() => dispatch(setSidePanelToggle(false))}
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
            {/* Filters and sorting */}
            <Row className="mt-4">
                <Col>
                    <p className="fw-lightBold pb-2"> Motivation type </p>

                    <ActionsDropdown value={motivationFilter}
                        actions={motivationActions}
                        Actions={(motivation: string) => {
                            if (motivation === 'all') {
                                setMotivationFilter({ value: motivation, label: 'All annotations' })
                            } else {
                                setMotivationFilter({ value: motivation, label: annotationMotivations[motivation].displayName })
                            }
                        }}
                        color="#333333"
                        backgroundColor='white'
                    />
                </Col>
                <Col>
                    <p className="fw-lightBold pb-2"> Sort by </p>

                    <ActionsDropdown value={sortValue}
                        actions={sortActions}
                        Actions={(property: string) => {
                            if (property === 'none') {
                                setSortValue({ value: 'none', label: 'Select a property' })
                            } else {
                                setSortValue({ value: property, label: Capitalize(property) })
                            }
                        }}
                        color="#333333"
                        backgroundColor='white'
                    />
                </Col>
            </Row>
            {/* Annotations section */}
            <Row className="flex-grow-1 pt-4 overflow-scroll">
                <Col>
                    {!isEmpty(annotateTarget.annotations) ?
                        <>
                            {Object.keys(annotations).map((motivation) => {
                                return (
                                    <Row key={motivation}>
                                        <Col>
                                            {/* Motivation indication */}
                                            <Row>
                                                <Col className="col-md-auto">
                                                    <div className={`${styles.sidePanelMotivation} px-3`}>
                                                        {annotationMotivations[motivation].displayName}
                                                    </div>
                                                </Col>
                                            </Row>
                                            {/* Motivation annotations */}
                                            <Row className="mt-2">
                                                <Col>
                                                    {annotations[motivation].map((annotation) => {
                                                        return (
                                                            <Annotation key={annotation.id} annotation={annotation} />
                                                        );
                                                    })}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </>
                        : <p> No annotations yet </p>
                    }
                </Col>
            </Row>
            {/* Form section */}
            <Row className={`${styles.annotationForm} pb-2 pt-3`}>
                <Col>
                    <p className={`${styles.annotationFormTitle} fw-lightBold`}> Add annotation </p>
                </Col>
            </Row>
        </div>
    );
}

export default SidePanel;