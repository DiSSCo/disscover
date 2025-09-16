/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeycloakService from "app/Keycloak";
import classNames from "classnames";
import { format } from 'date-fns';
import { Row, Col, Card } from "react-bootstrap";

/* Import Types */
import { MasJobRecord } from "app/Types";

/* Import Icons */
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

/* Import Components */
import { Spinner } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    masJobRecord: MasJobRecord
};


/**
 * Component that renders a card for a MAS in the MAS overview
 * @param masJobRecord The MAS job record to be rendered in the card
 * @returns JSX Component
 */
const MASJobRecordCard = (props: Props) => {
    const { masJobRecord } = props;

    /* Base variables */
    const userTag: string = masJobRecord.orcid === KeycloakService.GetParsedToken()?.orcid ? KeycloakService.GetParsedToken()?.orcid : masJobRecord.orcid;

    /* Class Names */
    const userTagClass = classNames({
        'tc-accent': masJobRecord.orcid === KeycloakService.GetParsedToken()?.orcid
    });

    return (
        <div>
            <Card className="px-3 py-2">
                {/* Author and date */}
                <Row>
                    <Col>
                        <p className={`${userTagClass} fs-4 tc-primary fw-lightBold`}>
                            {`${userTag}${(masJobRecord.orcid === KeycloakService.GetParsedToken()?.orcid ? ' (you)' : '')}`}
                        </p>
                    </Col>
                    <Col lg="auto"
                        className="d-flex align-items-center"
                    >
                        <p className="fs-4 tc-primary fw-lightBold">
                            {['SCHEDULED', 'RUNNING'].includes(masJobRecord.state) ?
                                <Spinner />
                                : <>
                                    {masJobRecord.state === 'COMPLETED' ?
                                        <FontAwesomeIcon icon={faCheck}
                                            className="tc-secondary"
                                        /> : <FontAwesomeIcon icon={faX}
                                            className="tc-error"
                                        />
                                    }
                                </>
                            }
                        </p>
                    </Col>
                </Row>
                {/* ID */}
                <Row>
                    <Col>
                        <p className="tc-grey fs-5 fw-lightBold">
                            {masJobRecord.jobHandle}
                        </p>
                    </Col>
                </Row>
                {/* Target, scheduled and completed if completed */}
                <Row className="mt-2">
                    <Col>
                        <p className="fs-4">
                            <span className="fw-lightBold">
                                Target:
                            </span>
                            {` ${masJobRecord.targetId}`}
                        </p>
                        <p className="fs-4">
                            <span className="fw-lightBold">
                                Scheduled:
                            </span>
                            {` ${format(masJobRecord.timeStarted, 'MMMM dd - yyyy')}`}
                        </p>
                        {['COMPLETED'].includes(masJobRecord.state) &&
                            <p className="fs-4">
                                <span className="fw-lightBold">
                                    Completed:
                                </span>
                                {` ${format(masJobRecord.timeCompleted, 'MMMM dd - yyyy')}`}
                            </p>
                        }
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default MASJobRecordCard;