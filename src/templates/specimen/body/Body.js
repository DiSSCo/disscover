import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Import components */
import SpecimenInfo from './specimenInfo/SpecimenInfo';
import SpecimenImages from './specimenMedia/SpecimenMedia';
import MidsMeter from './midsMeter/MidsMeter';

/* Import icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faComment } from '@fortawesome/free-solid-svg-icons'


const Body = (props) => {
    let specimen = {}



    specimen['auth'] = props.specimen['ods:authoritative'];
    specimen['unmapped'] = props.specimen['ods:unmapped'];

    console.log(specimen);

    return (
        <Container fluid>
            <Row className='specimen_content'>
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
                                    {specimen['unmapped']['has_image'] && <SpecimenImages specimenImages={specimen['unmapped']['url']} />}
                                </Col>
                            </Row>
                        </Col>
                        <Col md={{ span: 4 }}>
                            <Row>
                                <Col md={{ span: 6 }} className='specimen_annotateBlock'>
                                    <Link to={'/annotate/' + specimen['auth']['ods:physicalSpecimenId']} state={{ specimen: specimen, mode: 'annotate' }}>
                                        <Row>
                                            <Col md={{ span: 12 }} className="">
                                                Annotate
                                                <FontAwesomeIcon icon={faComment} className="ps-2" />
                                            </Col>
                                        </Row>
                                    </Link>
                                </Col>

                                <Col md={{ span: 6 }} className='specimen_annotateBlock curate'>
                                    <Link to={'/annotate/' + specimen['auth']['ods:physicalSpecimenId']} state={{ specimen: specimen, mode: 'curate' }}>
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