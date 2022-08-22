import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Profile = () => {
    /* Static name needs to be replaced with real time username */

    return (
        <Link to='/profile'>
            <Row className="mt-2">
                <Col md={{ span: 12 }} className="col-sm-auto header_profile">
                    <Row className="mt-2">
                        <Col className="col-sm-auto header_profilePicName textOverflow">
                            Tom
                        </Col>
                        <Col md={{ span: 4 }} className="position-relative">
                            <img
                                src="https://crafatar.com/avatars/af781660900a493687708eee23874086?size=64&overlay"
                                className="img-fluid header_profilePic"
                                alt="User avatar"
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Link>
    )
}

export default Profile;