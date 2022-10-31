import { Row, Col } from 'react-bootstrap';


const ProfileTabs = () => {
    return (
        <Row>
            <Col className="profile_tabs">
                <Row>
                    <Col className="profile_tab active col-md-auto">
                        Annotations
                    </Col>
                    <Col className="profile_tab col-md-auto border-white border">
                        New Tab
                    </Col>
                    <Col className="profile_tab col-md-auto border-white border">
                        New Tab
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default ProfileTabs;