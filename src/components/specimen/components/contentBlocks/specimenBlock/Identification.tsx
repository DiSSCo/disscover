/* Import Dependencies */
import { Card, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import TaxonomicTree from 'components/general/nomenclatural/TaxonomicTree';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
}


const Taxonomy = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    let taxonIdentification: Dict = {};

    /* Extract the accepted identification */
    if (specimen.digitalSpecimen['dwc:identification']) {
        const acceptedIdentification = specimen.digitalSpecimen['dwc:identification'].find((identification) =>
            identification['dwc:identificationVerificationStatus']
        );

        if (acceptedIdentification?.taxonIdentifications) {
            taxonIdentification = acceptedIdentification.taxonIdentifications[0];
        }
    }

    return (
        <Card className="h-100">
            <Card.Body className="h-100 d-flex flex-column">
                <Card.Title className="c-accent">
                    <Row>
                        <Col className="col-md-auto pe-0">
                            <FontAwesomeIcon icon={faDiamond} />
                        </Col>
                        <Col>
                            Accepted Identification
                        </Col>
                    </Row>
                </Card.Title>

                <Row className="flex-grow-1 pt-2 px-2 overflow-hidden">
                    <Col>
                        <TaxonomicTree taxonIdentification={taxonIdentification}
                            ShowWithAnnotations={(propertyName: string) => ShowWithAnnotations(propertyName)}
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Taxonomy;