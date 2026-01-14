/* Import Dependencies */
import KeycloakService from "app/Keycloak";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* Import Hooks */
import { useTrigger } from "app/Hooks";

/* Import Components */
import { Passport, UserRecordTables } from "./components/ProfileComponents";

/**
 * Component that renders the profle page
 * @returns JSX Component
 */
const Profile = () => {
    /* Hooks */
    const navigate = useNavigate();
    const trigger = useTrigger();

    /* OnLoad, redirect to home if user is not logged in yet */
    trigger.SetTrigger(() => {
        if (!KeycloakService.IsLoggedIn()) {
            navigate('/');
        }
    }, []);

    return (
        <div className="h-90 d-flex flex-column">
            <Container fluid className="flex-grow-1 overflow-hidden py-5">
                <Row className="h-100">
                    <Col lg={{ span: 3, offset: 1 }}>
                        <Card className="h-100">
                            {/* Passport */}
                            <Row>
                                <Col>
                                    <Passport />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col lg={{ span: 7 }}
                        className="ps-5 mt-5"
                    >
                        <UserRecordTables />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;