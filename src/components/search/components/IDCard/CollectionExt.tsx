/* Import Dependencies */
import { CheckProperty } from 'global/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Specimen } from 'global/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    specimen: Specimen
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
                    {CheckProperty(specimen.data['ods:collectingNumber'])}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> Collector: </span>
                    {CheckProperty(specimen.data['ods:collector'])}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> Date collected: </span>
                    {CheckProperty(specimen.data['ods:dateCollected'])}
                </p>
            </Col>
        </Row>
    );
}

export default CollectionExt;