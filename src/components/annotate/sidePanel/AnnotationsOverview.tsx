/* Import Dependencies */
import { useEffect, useState } from 'react';
import KeycloakService from 'keycloak/Keycloak';
import { isEmpty } from 'lodash';
import { Capitalize } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getAnnotateTarget, setAnnotationFormToggle } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Dict } from 'app/Types';
import { Annotation as AnnotationType } from 'app/types/Annotation';

/* Import Sources */
import annotationMotivationsSource from 'sources/annotationMotivations.json';

/* Import Styles */
import styles from 'components/annotate/annotate.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import Annotation from './Annotation';
import ActionsDropdown from 'components/general/actionsDropdown/ActionsDropdown';
import Tooltip from 'components/general/tooltip/Tooltip';

import { getSpecimenAnnotations } from 'redux/specimen/SpecimenSlice';


/* Props Typing */
interface Props {
    UpdateAnnotationView: Function
};


const AnnotationsOverview = (props: Props) => {
    const { UpdateAnnotationView } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const annotationMotivations: Dict = annotationMotivationsSource;
    const [annotations, setAnnotations] = useState<AnnotationType[]>([]);
    const [motivationFilter, setMotivationFilter] = useState<{ value: string, label: string }>({ value: 'all', label: 'All annotations' });
    const [sortValue, setSortValue] = useState<{ value: string, label: string }>({ value: 'latest', label: 'Date - latest' });

    let motivationActions = [
        { value: 'all', label: 'All annotations' }
    ];

    const sortActions = [
        { value: 'date - latest', label: 'Date - latest' },
        { value: 'date - oldest', label: 'Date - oldest' }
    ];

    /* Function for filtering and sorting the annotations based on user input */
    useEffect(() => {
        let copyAnnotations = [...annotateTarget.annotations];

        /* Check for motivation filter */
        if (motivationFilter.value !== 'all') {
            copyAnnotations = copyAnnotations.filter((annotation) => annotation['oa:motivation'] === motivationFilter.value);
        }

        /* Sort annotations */
        switch (sortValue.value) {
            case 'date - oldest':
                copyAnnotations.sort((a, b) => {
                    return Number(new Date(a['dcterms:created'])) - Number(new Date(b['dcterms:created']));
                });

                break;
            case 'Score':
                break;
            default:
                copyAnnotations.sort((a, b) => {
                    return Number(new Date(b['dcterms:created'])) - Number(new Date(a['dcterms:created']));
                });

                break;
        }

        setAnnotations(copyAnnotations);
    }, [annotateTarget.annotations, motivationFilter, sortValue]);

    /* For each annotation type, push to motivation actions */
    Object.keys(annotationMotivations).forEach((motivation) => {
        const annotationMotivation = annotationMotivations[motivation];

        motivationActions.push({
            value: motivation,
            label: annotationMotivation.displayName
        });
    });

    return (
        <Row className="h-100">
            <Col className="h-100">
                <div className="h-100 d-flex flex-column">
                    {/* Filters and sorting */}
                    <Row className="sidePanelFilters mt-4">
                        <Col>
                            <p className="fw-lightBold pb-2"> Annotation type
                                <Tooltip text="Reason for creating an annotation" placement="top">
                                    <span className="ms-2">
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                    </span>
                                </Tooltip>
                            </p>

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
                            {!isEmpty(annotateTarget.annotations) && !isEmpty(annotations) ?
                                <>
                                    {annotations.map((annotation) => {
                                        return (
                                            <Row key={annotation['ods:id']}>
                                                <Col>
                                                    <Annotation annotation={annotation}
                                                        UpdateAnnotationView={(annotation: AnnotationType, remove: boolean) =>
                                                            UpdateAnnotationView(annotation, remove)}
                                                    />
                                                </Col>
                                            </Row>
                                        );
                                    })}
                                </>
                                : <p> No annotations yet </p>
                            }
                        </Col>
                    </Row>
                    {/* If logged in, show add Annotation button */}
                    <Row className={`${styles.annotationForm} pb-2 pt-3 justify-content-end`}>
                        <Col className="col-md-auto">
                            {KeycloakService.IsLoggedIn() ?
                                <button type="button"
                                    className="addAnnotationButton accentButton px-3 py-1 float-right"
                                    onClick={() => dispatch(setAnnotationFormToggle(true))}
                                >
                                    Add annotation
                                </button>
                                : <p className="fst-italic"> Login to make annotations </p>
                            }
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default AnnotationsOverview;