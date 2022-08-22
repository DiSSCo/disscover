import { Row, Col } from 'react-bootstrap';

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog } from '@fortawesome/free-solid-svg-icons';


const ProfileAnnotation = (props) => {
    const annotation = props.annotation;

    return (
        <Col md={{ span: 4 }}>
            <Col md={{ span: 12 }} 
                className="profile_annotation"
                style={{backgroundImage: 'url("https://api.gbif.org/v1/image/unsafe/fit-in/500x/http%3A%2F%2Fn2t.net%2Fark%3A%2F65665%2Fm356c5f382-f218-400f-8503-91d4dff71b1f")'}}
            >
                <Row>
                    <Col md={{ span: 7 }} className="profile_annotationInfo py-3 px-4">
                        <Row>
                            <Col md={{ span: 12 }}>
                                Specimen Name
                            </Col>
                            <Col md={{ span: 12 }}>
                                Annotations: 0
                            </Col>
                            <Col md={{ span: 12 }}>
                                Last modified: 00-00-0000
                            </Col>
                        </Row>
                    </Col>
                    <Col md={{ span: 5 }} className='position-relative'>
                        <div className="profile_annotationSpecimenType">
                            <FontAwesomeIcon icon={faFrog} />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Col>
    )
}

export default ProfileAnnotation;