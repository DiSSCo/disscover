/* Import Dependencies */
import { CheckProperty } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    specimen: DigitalSpecimen
};


const TaxonomyExt = (props: Props) => {
    const { specimen} = props;

    return (
        <Row className="mt-4">
            <Col>
                <h5 className="c-accent">
                    <FontAwesomeIcon icon={faDiamond} />
                    <span className="ms-1"> Taxonomy </span>
                </h5>

                <p className="fs-4">
                    <span className="fw-bold"> Kingdom: </span>
                    {/* Needs to be checked */}
                    {/* {CheckProperty(specimen.data['dwc:kingdom'])} */}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> Phylum: </span>
                    {/* Needs to be checked */}
                    {/* {CheckProperty(specimen.data['dwc:phylum'])} */}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> Order: </span>
                    {/* Needs to be checked */}
                    {/* {CheckProperty(specimen.data['dwc:order'])} */}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> Family: </span>
                    {/* Needs to be checked */}
                    {/* {CheckProperty(specimen.data['dwc:family'])} */}
                </p>
                <p className="fs-4 mt-2">
                    <span className="fw-bold"> Genus: </span>
                    {/* Needs to be checked */}
                    {/* {CheckProperty(specimen.data['dwc:genus'])} */}
                </p>
            </Col>
        </Row>
    );
}

export default TaxonomyExt;