/* Import Dependencies */
import { CheckProperty } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    specimen: DigitalSpecimen
};


const LocationExt = (props: Props) => {
    const { specimen } = props;

    return (
        <Row className="mt-4">
            <Col>
                <h5 className="c-accent">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span className="ms-1"> Location </span>
                </h5>

                <p className="fs-4">
                    <span className="fw-bold"> Continent: </span>
                    {/* Needs to be checked */}
                    {/* {CheckProperty(specimen['dwc:continent'])} */}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> Country: </span>
                    {/* Needs to be checked */}
                    {/* {CheckProperty(specimen['dwc:country'])} */}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> Locality: </span>
                    {/* Needs to be checked */}
                    {/* {CheckProperty(specimen['dwc:locality'])} */}
                </p>
            </Col>
        </Row>
    );
}

export default LocationExt;