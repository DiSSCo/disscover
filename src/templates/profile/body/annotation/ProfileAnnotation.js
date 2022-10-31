import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ProfileAnnotation = (props) => {
    const annotation = props.annotation;

    console.log(annotation);

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
        <Col md={{ span: 6 }}
            className="profile_annotation px-4 my-3"
        >
            <Row>
                <Col className="profile_annotationMotivation col-md-auto c-primary">
                    {annotationTypeMapping[annotation['motivation']]}
                </Col>
                <Col className="profile_annotationUpper br-tl br-tr">
                    {date}
                </Col>
            </Row>
            <Row>
                <Col className="profile_annotationBody">
                    <Row className="py-2">
                        <Col>
                            <p className="profile_annotationBodySubTitle m-0 c-primary-dark ">
                                Target
                            </p>

                            {annotation['target']['id']}
                        </Col>
                    </Row>
                    <Row className="pt-1 pb-3">
                        <Col>
                            <p className="profile_annotationBodySubTitle m-0 c-primary-dark ">
                                Value 
                            </p>

                            {annotation['body']['value']}
                        </Col>
                    </Row>
                </Col>
            </Row >
            {/* <Link to={`/ds/${annotation['target']['id'].replace('https://hdl.handle.net/', '')}`}>
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
            </Link> */}
        </Col >
    )
}

export default ProfileAnnotation;