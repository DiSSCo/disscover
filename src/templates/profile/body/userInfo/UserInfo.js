import { Row, Col } from 'react-bootstrap';


const UserInfo = () => {
    return (
        <Row>
            <Col md={{ span: 12 }} className="profile_profileBlock">
                <Row>
                    <Col className="col-md-auto">
                        <img src="https://crafatar.com/avatars/af781660900a493687708eee23874086?size=64&overlay" 
                            alt="profile_picture"
                            className="profile_profilePicture"
                        />
                    </Col>
                    <Col>
                        <Row className="h-50">
                            <Col className="profile_username">
                                Username
                            </Col>
                        </Row>
                        <Row className="h-50">
                            <Col className="profile_titleOrganization">
                                Title work / institution
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default UserInfo;