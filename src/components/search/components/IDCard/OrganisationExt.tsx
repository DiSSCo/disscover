/* Import Dependencies */
import { CheckProperty } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    specimen: DigitalSpecimen
};


const OrganisationExt = (props: Props) => {
    const { specimen } = props;

    return (
        <Row className="mt-4">
            <Col>
                <h5 className="c-accent">
                    <FontAwesomeIcon icon={faLandmark} />
                    <span className="ms-1"> Organisation </span>
                </h5>

                <p className="fs-4">
                    <span className="fw-bold"> Name: </span>
                    {CheckProperty(specimen['dwc:institutionName'])}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> ROR identifier: </span>
                    {specimen['dwc:institutionId']?.replace('https://ror.org/', '')}
                </p>
            </Col>
        </Row>
    );
}

export default OrganisationExt;