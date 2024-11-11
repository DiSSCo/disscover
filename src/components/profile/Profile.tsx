/* Import Dependencies */
import KeycloakService from "app/Keycloak";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* Import Hooks */
import { useTrigger } from "app/Hooks";

/* Import Components */
import { Header, Footer } from "components/elements/Elements";
import { Button } from "components/elements/customUI/CustomUI";


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
        <div className="h-100 d-flex flex-column">
            {/* Render header*/}
            <Header span={10}
                offset={1}
            />

            <Container fluid className="flex-grow-1 overflow-hidden">
                <Row className="h-100">
                    <Col lg={{ span: 10, offset: 1 }}>
                        My ORCID: {KeycloakService.GetParsedToken()?.orcid ?? 'is not here'}

                        {!KeycloakService.GetParsedToken()?.orcid &&
                            <Button type="button"
                                variant="blank"
                                className="tc-white fw-bold bgc-orcid"
                                OnClick={() => KeycloakService.Login({ idpHint: 'orcid', prompt: 'login' })}
                            >
                                <span>
                                    Link to ORCID
                                </span>
                            </Button>
                        }
                    </Col>
                </Row>
            </Container>

            {/* Render header*/}
            <Footer span={10}
                offset={1}
            />
        </div>
    );
};

export default Profile;