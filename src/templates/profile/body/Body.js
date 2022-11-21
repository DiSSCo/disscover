import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Import Components */
import UserInfo from './userInfo/UserInfo';
import UserStatistics from './userStatistics/UserStatistics';
import ProfileTabs from './profileTabs/ProfileTabs';
import CreatorAnnotations from './annotation/CreatorAnnotations';

/* Import API */
import GetCreatorAnnotations from 'api/annotate/GetCreatorAnnotations';


const Body = (props) => {
    const userProfile = props.userProfile;

    const params = useParams();

    const [creatorAnnotations, setCreatorAnnotations] = useState({});

    useEffect(() => {
        if (userProfile['id'] === params['id']) {
            
        } else {
            GetCreatorAnnotations(UserService.getToken(), Process);

            function Process(result) {
                setCreatorAnnotations(result);
            }
        }
    }, []);

    return (
        <Container fluid className="h-100">
            <Row className="mt-5">
                <Col md={{ span: 5, offset: 1 }}>
                    <Row>
                        <Col md={{ span: 9 }}>
                            <UserInfo userProfile={userProfile} />
                        </Col>
                    </Row>

                    <Row className="mt-5">
                        <Col md={{ span: 12 }}>
                            <UserStatistics />
                        </Col>
                    </Row>
                </Col>
                <Col md={{ span: 5 }}>
                    <ProfileTabs />

                    <Row>
                        <Col md={{ span: 12 }}>
                            <CreatorAnnotations creatorAnnotations={creatorAnnotations} />
                        </Col>
                    </Row>
                </Col>
            </Row>

            
        </Container>
    )
}

export default Body;