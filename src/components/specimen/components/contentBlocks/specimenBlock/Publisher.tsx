/* Import Dependencies */
import { Card, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import OrganisationLogoImage from 'components/general/mediaTypes/OrganisationLogoImage';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
};


const Organisation = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    return (
        <Card className="h-100">
            <Card.Body className="h-100">
                <Row className="h-100">
                    <Col className="col-md-auto h-100 d-flex flex-column">
                        <Row>
                            <Col>
                                <Card.Title className="c-accent">
                                    <FontAwesomeIcon icon={faLandmark} />
                                </Card.Title>
                            </Col>
                        </Row>
                        <Row className="flex-grow-1">
                            <Col className="d-flex justify-content-center">
                                <div className="w-0 b-accent" />
                            </Col>
                        </Row>
                    </Col>
                    <Col className="h-100 d-flex flex-column ps-0 overflow-hidden">
                        {/* Block icon and title */}
                        <Card.Title className="c-accent">
                            <span> Publisher </span>
                        </Card.Title>

                        {/* Properties */}
                        <Row className="mt-2 flex-grow-1 fs-4">
                            <Col className="d-flex flex-column justify-content-between">
                                {/* Organisation information */}
                                <Row>
                                    <Col>
                                        {/* Organisation Name */}
                                        <Row className="c-pointer"
                                            onClick={() => ShowWithAnnotations('dwc:institutionName')}
                                        >
                                            <Col className="col-md-auto pe-0 fw-lightBold">
                                                Name:
                                            </Col>
                                            <Col>
                                                <p> {specimen.digitalSpecimen['dwc:institutionName'] ?? ''} </p>
                                            </Col>
                                        </Row>
                                        {/*  */}
                                        <Row className="c-pointer mt-2"
                                            onClick={() => ShowWithAnnotations('dwc:datasetName')}
                                        >
                                            <Col className="col-md-auto pe-0 fw-lightBold d-">
                                                Collection:
                                            </Col>
                                            <Col className="d-flex align-items-center">
                                                <p> {specimen.digitalSpecimen['dwc:datasetName'] ?? ''} </p>
                                            </Col>
                                        </Row>
                                        {/* Rights Holder */}
                                        <Row className="c-pointer mt-2"
                                            onClick={() => ShowWithAnnotations('dcterms:rightsHolder')}
                                        >
                                            <Col className="col-md-auto pe-0 fw-lightBold">
                                                Rights holder:
                                            </Col>
                                            <Col className="textOverfloww">
                                                {specimen.digitalSpecimen['dcterms:rightsHolder'] ?? ''}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                {/* Organisation logo */}
                                <Row className="flex-grow-1">
                                    <Col md={{span: 6, offset: 6}} className="h-auto d-flex flex-column-reverse">
                                        <OrganisationLogoImage organisationId={specimen.digitalSpecimen['dwc:institutionId']?.replace('https://ror.org/', '')} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default Organisation;