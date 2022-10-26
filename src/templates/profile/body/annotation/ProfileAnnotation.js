import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


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
        <Col md={{ span: 12 }}
            className="profile_annotation"
        >
            <Link to={`/ds/${annotation['target']['id'].replace('https://hdl.handle.net/', '')}`}>
                <Row>
                    <Col md={{ span: 3 }}>
                        {annotationTypeMapping[annotation['motivation']]}
                    </Col>
                    <Col md={{ span: 6 }}>
                        {annotation['target']['id']}
                    </Col>
                    <Col md={{ span: 3 }}>
                        {date}
                    </Col>
                </Row>
            </Link>
        </Col>
    )
}

export default ProfileAnnotation;