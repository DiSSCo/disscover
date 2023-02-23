/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from "redux/specimen/SpecimenSlice";

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';


const SpecimenOverview = () => {
    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    /* Check for Organization logo */
    const logo = (ror: string) => {
        try {
            return require(`../../../../webroot/img/organizationLogo/${ror}.png`);
        } catch (err) {
            return null;
        }
    };

    return (
        <Row className="h-100">
            <Col>
                <Row className="h-50">
                    {/* Location */}
                    <Col md={{ span: 7 }} className="pb-2">
                        <Card className="position-relative h-100">
                            <Card.Body>
                                <Card.Title>
                                    Location
                                </Card.Title>

                                <Row className="mt-3">
                                    <Col>
                                        Country: Netherlands
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        Locality: Gasteren
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        Others: Other fields
                                    </Col>
                                </Row>
                            </Card.Body>

                            {/* Map */}
                            <div className="position-absolute w-50 h-100 bg-primary-dark end-0 text-center">
                                <h2 className="text-white"> Map </h2>
                            </div>
                        </Card>
                    </Col>
                    <Col md={{ span: 5 }} className="pb-2">
                        <Card className="position-relative h-100">
                            <Card.Body>
                                <Card.Title>
                                    Organization
                                </Card.Title>

                                <Row className="mt-3">
                                    <Col>
                                        Name: Naturalis Biodiversity Center
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        Country: Netherlands
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        Others: Other fields
                                    </Col>
                                </Row>
                            </Card.Body>


                            {logo(specimen.organizationId.replace('https://ror.org/', '')) &&
                                <div className="position-absolute w-100 h-100 end-0 text-center d-flex justify-content-end">
                                    <img alt="Organization logo"
                                        src={logo(specimen.organizationId.replace('https://ror.org/', ''))}
                                        className={`${styles.organizationLogo} h-100`}
                                    />
                                </div>
                            }
                        </Card>
                    </Col>
                </Row>
                <Row className="h-50">
                    {/* Taxa */}
                    <Col md={{ span: 4 }} className="pt-2">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>
                                    Taxa
                                </Card.Title>

                                <Row className="mt-3">
                                    <Col>
                                        Clade: Dinosauria
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        Family: Iguanodontidae
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        Others: Other fields
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    {/* Other details */}
                    <Col md={{ span: 8 }} className="pt-2">
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>
                                    Other details...
                                </Card.Title>

                                <Row className="mt-3">
                                    <Col>
                                        Property: value
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        Property: value
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        Others: Other fields
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default SpecimenOverview;