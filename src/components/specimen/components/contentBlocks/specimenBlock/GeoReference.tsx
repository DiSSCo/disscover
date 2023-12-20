/* Import Dependencies */
import { Card, Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';

/* Import Store */
import { useAppSelector } from "app/hooks";
import { getSpecimen } from "redux/specimen/SpecimenSlice";

/* Import Types */
import { Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import GeologicalMap from 'components/general/geologicalMap/GeologicalMap';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
};


const GeoReference = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    let georeference: Dict = {};

    /* Check if georeference is present and not empty */
    if (specimen.digitalSpecimen.occurrences) {
        if (specimen.digitalSpecimen.occurrences[0].location && !isEmpty(specimen.digitalSpecimen.occurrences[0].location.georeference)) {
            georeference = specimen.digitalSpecimen.occurrences[0].location.georeference;
        }
    }

    return (
        <Card className="h-100">
            <Card.Body className="h-100 d-flex flex-column">
                {/* Block icon and title */}
                <Card.Title className="c-accent">
                    <Row onClick={() => ShowWithAnnotations('occurrences.location.georeference', 'class')}>
                        <Col className="col-md-auto pe-0">
                            <FontAwesomeIcon icon={faGlobe} />
                        </Col>
                        <Col>
                            Geo Reference
                        </Col>
                    </Row>
                </Card.Title>

                {/* Leaflet Map */}
                <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                    {georeference['dwc:decimalLatitude'] && georeference['dwc:decimalLongitude'] ?
                        <GeologicalMap georeference={georeference} />
                        : <p className="fst-italic"> Map can not be generated due to lack of coordinates </p>
                    }
                </div>
            </Card.Body>
        </Card>
    );
}

export default GeoReference;