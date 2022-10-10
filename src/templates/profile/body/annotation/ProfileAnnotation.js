import { Row, Col } from 'react-bootstrap';

/* Fontawesome icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog } from '@fortawesome/free-solid-svg-icons';


const ProfileAnnotation = (props) => {
    const annotation = props.annotation;

    const annotationTypeMapping = {
        commenting: 'Comment',
        adding: 'Addition',
        correcting: 'Correction',
        quality_flagging: 'Quality Flag',
        linking: 'Relationship/Link'
    }

    const isoDate = new Date(Date.parse(annotation['created']));
    const date = `${(isoDate.getMonth() + 1)}-${isoDate.getDate()}-${isoDate.getFullYear()}`;

    return (
        <Col md={{ span: 4 }} className="mt-3">
            <Col md={{ span: 12 }}
                className="profile_annotation"
            >
                <Row>
                    <Col md={{ span: 11 }} className="profile_annotationInfo px-4">
                        <Row>
                            <Col className="col-md-auto py-1 profile_annotationType">
                                {annotationTypeMapping[annotation['motivation']]}
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <span className="fw-bold"> Specimen Name </span> ({annotation['target']['id']})
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                            <span className="fw-bold"> Created: </span> {date}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={{ span: 1 }} className='position-relative'>
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