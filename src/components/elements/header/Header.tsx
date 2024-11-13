/* Import Components */
import classNames from 'classnames';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Import Utilities */
import KeycloakService from 'app/Keycloak';

/* Import Hooks */
import { useAppDispatch } from 'app/Hooks';

/* Import Store */
import { setTourTopic } from 'redux-store/GlobalSlice';

/* Import Components */
import Navigation from './Navigation';
import UserMenu from './UserMenu';
import { Button } from 'components/elements/customUI/CustomUI';



/* Props Type */
type Props = {
    span?: number,
    offset?: number,
    tourTopics?: string[]
};


/**
 * Component that renders the application's header
 * @param span The width in Bootstrap span (grid based on 12 columns)
 * @param offset the offset width in Bootstrap span (grid based on 12 columns)
 * @param tourTopics Tour topics that can activated for the rendered page
 * @returns JSX Component
 */
const Header = (props: Props) => {
    const { span, offset, tourTopics } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const [tourTopicMenuToggle, setTourTopicMenuToggle] = useState<boolean>(false);

    /* Class Names */
    const headerClass = classNames({
        'p-0': !span
    });

    const tourTopicMenuClass = classNames({
        'd-none': !tourTopicMenuToggle
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
                            className="position-relative tc-primary d-flex align-items-center"
                        >
                            <Button type="button"
                                variant="blank"
                                className="fw-lightBold"
                                OnClick={() => {
                                    if (tourTopics?.length === 1) {
                                        dispatch(setTourTopic('home'))
                                    } else if (tourTopics && tourTopics.length > 1) {
                                        setTourTopicMenuToggle(!tourTopicMenuToggle)
                                    }
                                }}
                            >
                                Take a tour
                            </Button>

                            <div className={`${tourTopicMenuClass} position-absolute bottom-0`}>
                                {tourTopics?.map(tourTopic => (
                                    <Row key={tourTopic}>
                                        <Col>
                                            <p className="fs-4">
                                                {tourTopic}
                                            </p>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
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