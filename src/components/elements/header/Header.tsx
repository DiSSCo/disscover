/* Import Components */
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Import Utilities */
import KeycloakService from 'app/Keycloak';

/* Import Components */
import Navigation from './Navigation';
import UserMenu from './UserMenu';
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    span?: number,
    offset?: number
};


/**
 * Component that renders the application's header 
 * @returns JSX Component
 */
const Header = (props: Props) => {
    const { span, offset } = props;

    /* Class Names */
    const headerClass = classNames({
        'p-0': !span
    });

    return (
        <Container fluid>
            <Row className="py-3">
                <Col lg={{ span: span ?? 12, offset }}
                    className={headerClass}
                >
                    <Row>
                        {/* Title */}
                        <Col lg="auto">
                            <Link to="/">
                                <h2 className="fs-1 tc-primary fw-bold">DiSSCover</h2>
                            </Link>
                        </Col>
                        {/* Navigation */}
                        <Col>
                            <Navigation />
                        </Col>
                        {/* Take a tour button */}
                        <Col lg="auto"
                            className="tc-primary d-flex align-items-center"
                        >
                            <Button type="button"
                                variant="blank"
                                className="fw-lightBold"
                                OnClick={() => { }}
                            >
                                Take a tour
                            </Button>
                        </Col>
                        <Col lg="auto"
                            className="d-flex align-items-center"
                        >
                            {KeycloakService.IsLoggedIn() ?
                                <UserMenu />
                                : <Button type="button"
                                    variant="blank"
                                    className="fw-lightBold"
                                    OnClick={() => KeycloakService.Login()}
                                >
                                    Login / Sign-up
                                </Button>
                            }
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Container>
    );
};

export default Header;