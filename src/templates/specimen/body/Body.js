import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Import components */
import SpecimenInfo from './specimenInfo/SpecimenInfo';
import SpecimenMedia from './specimenMedia/SpecimenMedia';
import MidsMeter from './midsMeter/MidsMeter';

/* Import icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faComment } from '@fortawesome/free-solid-svg-icons'


const Body = (props) => {
    const specimen = props.specimen;

    return (
        <Container fluid className="mt-5 specimen_content">
            <Row>
                <Col md={{ span: 10, offset: 1 }} className="h-100">
                    <Row>
                        <Col md={{ span: 8 }}>
                            <Row>
                                <Col md={{ span: 12 }}>
                                    <SpecimenInfo specimen={specimen} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 12 }}>
                                    {specimen['media'] && <SpecimenMedia specimenMedia={specimen['media']} />}
                                </Col>
                            </Row>
                        </Col>
                        <Col md={{ span: 4 }}>
                            <Row>
                                <Col md={{ span: 4, offset: 3 }} className='specimen_annotateBlock'>
                                    <Link to={'/annotate/' + specimen['Meta']['id']['value']} state={{ specimen: specimen, mode: 'annotate' }}>
                                        <Row>
                                            <Col md={{ span: 12 }}>
                                                Annotate
                                                <FontAwesomeIcon icon={faComment} className="ps-2" />
                                            </Col>
                                        </Row>
                                    </Link>
                                </Col>

                                <Col md={{ span: 4, offset: 1 }} className='specimen_annotateBlock curate'>
                                    <Link to={'/annotate/' + specimen['Meta']['id']['value']} state={{ specimen: specimen, mode: 'curate' }}>
                                        <Row>
                                            <Col md={{ span: 12 }}>
                                                Curate
                                                <FontAwesomeIcon icon={faPencil} className="ps-2" />
                                            </Col>
                                        </Row>
                                    </Link>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col md={{ span: 12 }}>
                                    <MidsMeter specimen={specimen} mode='annotate' />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Body;