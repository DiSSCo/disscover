import { Row, Col } from 'react-bootstrap';


const UserInfo = () => {
    return (
        <Row>
            <Col md={{ span: 8 }} className="py-4 px-4 border-2-primary-dark rounded-c">
                <Row className="justify-content-center">
                    <Col className="col-md-auto px-4">
                        <img src="https://crafatar.com/avatars/af781660900a493687708eee23874086?size=64&overlay"
                            alt="profile_picture"
                            className="profile_profilePicture rounded-circle"
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Row className="h-50 justify-content-center">
                            <Col className="profile_username col-md-auto fw-bold">
                                John Doe
                            </Col>
                        </Row>
                        <Row className="h-50 justify-content-center">
                            <Col className="profile_titleOrganization col-md-auto text-truncate">
                                Naturalis Biodiversity Center
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col md={{span: 4}} className="ps-4">
                <Row className="h-100">
                    <Col className="profile_userQuote px-3 py-2 bg-primary-dark text-white">
                        Curator of the Petrology and Mineralogy collections at Naturalis Biodiversity Center.
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default UserInfo;