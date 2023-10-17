/* Import Dependencies */
import { CheckProperty } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    specimen: DigitalSpecimen
};


const CollectionExt = (props: Props) => {
    const { specimen } = props;

    return (
        <Row className="mt-4">
            <Col>
                <h5 className="c-accent">
                    <FontAwesomeIcon icon={faBoxArchive} />
                    <span className="ms-1"> Collection </span>
                </h5>

                <p className="fs-4">
                    <span className="fw-bold"> Collecting number: </span>
                    {/* Needs to be checked */}
                    {/* {CheckProperty(specimen['ods:collectingNumber'])} */}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> Collector: </span>
                    {/* Needs to be checked */}
                    {/* {CheckProperty(specimen['ods:collector'])} */}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> Date collected: </span>
                    {/* Needs to be checked */}
                    {/* {CheckProperty(specimen['ods:dateCollected'])} */}
                </p>
            </Col>
        </Row>
    );
}

export default CollectionExt;