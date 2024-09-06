/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import moment from 'moment';
import KeycloakService from 'app/Keycloak';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { ProvideReadableMotivation } from 'app/utilities/AnnotateUtilities';

/* Import Types */
import { Annotation } from 'app/types/Annotation';


/* Props Type */
type Props = {
    annotation: Annotation
};


/**
 * Component that renders an annotation card in the 
 * @returns JSX Component
 */
const AnnotationCard = (props: Props) => {
    const { annotation } = props;

    /* Base variables */
    let userTag: string = annotation['dcterms:creator']['foaf:name'] ?? annotation['dcterms:creator']['@id'];

    /* Class Names */
    const userTagClass = classNames({
        'tc-primary': annotation['dcterms:creator']['@id'] !== KeycloakService.GetSubject(),
        'tc-accent': annotation['dcterms:creator']['@id'] === KeycloakService.GetSubject()
    });

    return (
        <div>
            <Card className="px-3 py-2">
                {/* Author and date */}
                <Row>
                    <Col>
                        <p className={`${userTagClass} fs-4 fw-lightBold`}>
                            {
                                userTag + (annotation['dcterms:creator']['@id'] === KeycloakService.GetSubject() ? `${annotation['dcterms:creator']['foaf:name']} (you)` : '')
                            }
                        </p>
                    </Col>
                    <Col lg="auto">
                        <p className="fs-4 tc-primary fw-lightBold">
                            {moment(annotation['dcterms:created']).format('MMMM DD - YYYY')}
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
                {/* Annotation target */}
                <Row>
                    <Col>

                    </Col>
                </Row>
                {/* Motivation and annotation body */}
                <Row className="mt-2">
                    <Col>
                        <span className="fs-4 tc-primary fw-lightBold">
                            {`${ProvideReadableMotivation(annotation['oa:motivation'])}:`}
                        </span>
                        <span>
                            
                        </span>
                    </Col>
                </Row>
                {/* Comments, (dis)like, comment button and share button */}
                <Row>
                    <Col>
                            
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default AnnotationCard;