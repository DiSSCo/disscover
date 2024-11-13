/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeycloakService from "app/Keycloak";
import { Row, Col } from "react-bootstrap";

/* Import Styling */
import styles from 'components/profile/profile.module.scss';

/* Import Icons */
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

/* Import Webroot */
import ORCIDIcon from 'webroot/logos/ORCIDLogo.png'

/* Import Components */
import { Button } from "components/elements/customUI/CustomUI";


/**
 * Component that renders the user passport on the profile page
 */
const Passport = () => {
    return (
        <div>
            {/* Head */}
            <Row className={`${styles.profileCardHead}`}>
                <Col>
                    <div className="d-flex justify-content-center position-relative h-100 bgc-primary">
                        <div className={`${styles.profileCardPicture} d-flex justify-content-center align-items-center position-absolute top-0 bgc-secondary br-round`}>
                            <p className="tc-white fw-lightBold">
                                {KeycloakService.GetParsedToken()?.given_name[0]}
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
            {/* User given and family name; and subject identifier of Keycloak */}
            <Row className="mt-5">
                <Col>
                    <p className="fw-lightBold text-center">
                        {`${KeycloakService.GetParsedToken()?.given_name} ${KeycloakService.GetParsedToken()?.family_name}`}
                    </p>
                    <p className="fs-5 tc-grey text-center">
                        {KeycloakService.GetSubject()}
                    </p>
                </Col>
            </Row>
            {/* User details */}
            <Row className="mt-5">
                <Col className="px-5">
                    {/* E-mail address */}
                    <Row>
                        <Col lg={{ span: 1 }}
                            className=" d-flex justify-content-center align-items-center"
                        >
                            <FontAwesomeIcon icon={faEnvelope}
                                className="tc-accent"
                            />
                        </Col>
                        <Col className="ps-0 d-flex align-items-center">
                            <p className={"fs-4"}>
                                {KeycloakService.GetParsedToken()?.email ?? 'Not provided'}
                            </p>
                        </Col>
                    </Row>
                    {/* ORCID */}
                    {KeycloakService.GetParsedToken()?.orcid ?
                        <Row className="mt-1">
                            <Col lg={{ span: 1 }}
                                className=" d-flex align-items-center"
                            >
                                <img src={ORCIDIcon}
                                    alt="ORCID Logo"
                                    className="w-100"
                                />
                            </Col>
                            <Col className="ps-0 d-flex align-items-center">
                                <a href={KeycloakService.GetParsedToken()?.orcid}
                                    target="_blank"
                                    rel="noreferer"
                                    className="fs-4 tc-secondary"
                                >
                                    {KeycloakService.GetParsedToken()?.orcid.replace('https://orcid.org/', '')}
                                </a>
                            </Col>
                        </Row>
                        : <Row className="mt-4">
                            <Col>
                                <Button type="button"
                                    variant="blank"
                                    className="bgc-orcid"
                                    OnClick={() => KeycloakService.Login({ idpHint: 'orcid', prompt: 'login' })}
                                >
                                    <p className="tc-white">
                                        Link your ORCID
                                    </p>
                                </Button>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
        </div>
    );
};

export default Passport;