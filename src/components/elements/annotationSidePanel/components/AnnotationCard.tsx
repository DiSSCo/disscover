/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { format } from 'date-fns';
import KeycloakService from 'app/Keycloak';
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { ProvideReadableMotivation } from 'app/utilities/AnnotateUtilities';
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Types */
import { Annotation } from 'app/types/Annotation';

/* Import Icons */
import { faChevronUp, faChevronDown, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import DeleteAnnotation from 'api/annotation/DeleteAnnotation';

/* Import Components */
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    annotation: Annotation,
    schemaTitle: string,
    EditAnnotation: Function
};


/**
 * Component that renders an annotation card in the
 * @param annotation The annotation to be displayed in the card
 * @param schemaTitle The title of the super class schema
 * @param EditAnnotation Function to start editing the annotation
 * @returns JSX Component
 */
const AnnotationCard = (props: Props) => {
    const { annotation, schemaTitle, EditAnnotation } = props;

    /* Base variables */
    const [showAllValues, setShowAllValues] = useState<boolean>(false);
    let userTag: string = annotation['dcterms:creator']['schema:name'] ?? annotation['dcterms:creator']['@id'] ?? '';

    /* Class Names */
    const userTagClass = classNames({
        'tc-accent': annotation['dcterms:creator']['@id'] === KeycloakService.GetParsedToken()?.orcid
    });

    return (
        <div>
            <Card className="px-3 py-2">
                {/* Author and date */}
                <Row>
                    <Col>
                        <p className={`${userTagClass} fs-4 tc-primary fw-lightBold`}>
                            {`${userTag}${(annotation['dcterms:creator']['@id'] === KeycloakService.GetParsedToken()?.orcid ? ' (you)' : '')}`}
                        </p>
                    </Col>
                    <Col lg="auto">
                        <p className="fs-4 tc-primary fw-lightBold">
                            {format(annotation['dcterms:modified'], 'MMMM dd - yyyy')}
                        </p>
                    </Col>
                </Row>
                {/* Annotation ID and verion */}
                <Row>
                    <Col>
                        <p className="fs-5 tc-grey">
                            {annotation['ods:ID'].replace(import.meta.env.VITE_HANDLE_URL, '')}
                        </p>
                    </Col>
                    <Col lg="auto">
                        <p className="fs-5 tc-grey">
                            {`Version ${annotation['ods:version']}`}
                        </p>
                    </Col>
                </Row>
                {/* Motivation, annotation target and show all values button if target is class and terms length is more than three */}
                <Row className="mt-2">
                    <Col>
                        <span className="fs-4 tc-primary fw-lightBold">
                            {`${ProvideReadableMotivation(annotation['oa:motivation'])} on: `}
                        </span>
                        <span className="fs-4">
                            {annotation['oa:hasTarget']['oa:hasSelector']?.['@type'] === 'ods:FieldSelector' &&
                                MakeJsonPathReadableString(annotation['oa:hasTarget']['oa:hasSelector']['ods:field'] !== '$' ?
                                    annotation['oa:hasTarget']['oa:hasSelector']['ods:field']
                                    : schemaTitle
                                )
                            }
                            {annotation['oa:hasTarget']['oa:hasSelector']?.['@type'] === 'ods:ClassSelector' &&
                                MakeJsonPathReadableString(annotation['oa:hasTarget']['oa:hasSelector']['ods:class'])
                            }
                            {annotation['oa:hasTarget']['oa:hasSelector']?.['@type'] === 'oa:FragmentSelector' && 'Image'}
                        </span>
                    </Col>
                    {(annotation['oa:hasTarget']['oa:hasSelector']?.['@type'] === 'ods:ClassSelector' && Object.keys(JSON.parse(annotation['oa:hasBody']['oa:value'][0])).length >= 3) &&
                        <Col lg="auto">
                            <Button type="button"
                                variant="blank"
                                className="px-0 py-0"
                                OnClick={() => setShowAllValues(!showAllValues)}
                            >
                                <p className="tc-primary">
                                    {`${showAllValues ? 'Collapse' : 'Show all'} values `}
                                    <FontAwesomeIcon icon={showAllValues ? faChevronUp : faChevronDown} />
                                </p>
                            </Button>
                        </Col>
                    }
                </Row>
                {/* Annotation content */}
                <Row className="mt-1">
                    <Col>
                        {/* Render annotation content based on target type */}
                        {annotation['oa:hasTarget']['oa:hasSelector']?.['@type'] === 'ods:FieldSelector' &&
                            <p>
                                {annotation['oa:hasBody']['oa:value']}
                            </p>
                        }
                        {annotation['oa:hasTarget']['oa:hasSelector']?.['@type'] === 'ods:ClassSelector' &&
                            <div>
                                {Object.entries(JSON.parse(annotation['oa:hasBody']['oa:value'][0])).map(([key, value], index) => {
                                    if (showAllValues || index < 3) {
                                        return (
                                            <p key={key}
                                                className="fs-4"
                                            >
                                                <span className="fw-lightBold">
                                                    {`${MakeJsonPathReadableString(key)}: `}
                                                </span>
                                                {`${value}`}
                                            </p>
                                        );
                                    }
                                })}
                            </div>
                        }
                    </Col>
                </Row>
                {/* Modify or delete (tombstone) the annotation actions, if the annotation was made by the logged in user */}
                {annotation['dcterms:creator']['@id'] === KeycloakService.GetParsedToken()?.orcid &&
                    <Row className="flex-row-reverse">
                        <Col lg="auto"
                            className="ps-0"
                        >
                            <Button type="button"
                                variant="blank"
                                className="px-0 py-0"
                                OnClick={() => {
                                    if (window.confirm(`Are you sure, you want to delete this annotation with ID: ${annotation['ods:ID']}?`)) {
                                        DeleteAnnotation({ annotationId: annotation['ods:ID'] })
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faTrashCan}
                                    className="tc-primary"
                                />
                            </Button>
                        </Col>
                        <Col lg="auto">
                            <Button type="button"
                                variant="blank"
                                className="px-0 py-0"
                                OnClick={() => EditAnnotation(annotation)}
                            >
                                <FontAwesomeIcon icon={faPencil}
                                    className="tc-primary"
                                />
                            </Button>
                        </Col>
                    </Row>
                }
            </Card>
        </div>
    );
};

export default AnnotationCard;