/* Import Dependencies */
import { CheckProperty } from 'global/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Specimen } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    specimen: Specimen
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
                    {CheckProperty(specimen.data['dwc:continent'])}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> Country: </span>
                    {CheckProperty(specimen.data['dwc:country'])}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> Locality: </span>
                    {CheckProperty(specimen.data['dwc:locality'])}
                </p>
            </Col>
        </Row>
    );
}

export default LocationExt;