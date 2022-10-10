import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Import Components */
import UserInfo from './userInfo/UserInfo';
import UserStatistics from './userStatistics/UserStatistics';
import CreatorAnnotations from './annotation/CreatorAnnotations';

/* Import API */
import GetCreatorAnnotations from 'api/annotate/GetCreatorAnnotations';


const Body = () => {
    const token = UserService.getToken();

    const [creatorAnnotations, setCreatorAnnotations] = useState();

    useEffect(() => {
        if (token) {
            GetCreatorAnnotations(token, Process);

            function Process(result) {
                setCreatorAnnotations(result);
            }
        }
    }, []);

    return (
        <Container fluid className="h-100">
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <Row className="mt-5">
                        <Col md={{ span: 6 }}>
                            <UserInfo />
                        </Col>
                    </Row>

                    <Row className="mt-5">
                        <Col className="mt-4">
                            <UserStatistics />
                        </Col>
                    </Row>

                    {creatorAnnotations &&
                        <Row className="mt-5">
                            <Col>
                                <CreatorAnnotations creatorAnnotations={creatorAnnotations} />
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Body;