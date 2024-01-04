/* Import Dependencies */
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from './documents.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import Footer from 'components/general/footer/Footer';


const Terms = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container className={styles.documentContent}>
                <Row className="h-100 overflow-scroll">
                    <Col md={{ span: 8, offset: 2 }}>
                        {/* Title */}
                        <Row className="mt-5">
                            <Col className="mt-4">
                                <h1 className="fs-2 c-primary">Terms</h1>
                            </Col>
                        </Row>

                        {/* Document Content */}
                        <Row>
                            <Col>
                                {/* Sections */}
                                <Row className="mt-4">
                                    <Col>
                                        <h4 className="fs-3">DiSSCo Acceptable Use Policy and Conditions of Use</h4>
                                        <p className="fs-4">
                                            This Acceptable Use Policy and Conditions of Use (“AUP”) defines the rules and conditions that govern your
                                            access to and use (including transmission, processing, and storage of data) of the resources and services (“Services”)
                                            as granted by the Distributed System of Scientific Collections (DiSSCo) and the Authorised Group(s) to which you belong,
                                            for the purpose of discovering and getting physical or virtual access to the European natural scientific collections for
                                            research or educational purposes, and for managing, preserving or annotating the data derived from the collections and its
                                            specimens to serve research.
                                        </p> <br />

                                        <ul className="fs-4">
                                            <li>
                                                You shall only use the Services in a manner consistent with the purposes and limitations described above; you shall show
                                                consideration towards other users including by not causing harm to the Services; you have an obligation to collaborate in the
                                                resolution of issues arising from your use of the Services.
                                            </li>
                                            <li> You shall only use the Services for lawful purposes and not breach, attempt to breach, nor circumvent administrative or security controls. </li>
                                            <li> You shall respect intellectual property and confidentiality agreements. </li>
                                            <li> You shall protect your access credentials (e.g. passwords, private keys or multi-factor tokens); no intentional sharing is permitted. </li>
                                            <li> You shall keep your registered information correct and up to date. </li>
                                            <li>
                                                You shall promptly report known or suspected security breaches, credential compromise, or misuse to the security contact stated below; and
                                                report any compromised credentials to the relevant issuing authorities.
                                            </li>
                                            <li> Your personal data will be processed in accordance with the privacy statements referenced below. </li>
                                            <li>
                                                Reliance on the Services shall only be to the extent specified by any applicable service level agreements listed below.
                                                Use without such agreements is at your own risk.
                                            </li>
                                            <li>
                                                Your use of the Services may be restricted or suspended, for administrative, operational, or security reasons, without prior notice
                                                and without compensation.
                                            </li>
                                            <li>
                                                If you violate these rules, you may be liable for the consequences, which may include your account being suspended and a report being made
                                                to your home organisation or to law enforcement.
                                            </li>
                                        </ul> <br />

                                        <ul className="fs-4">
                                            <li> 
                                                The administrative contact for this AUP is: DiSSCo Coordination & Support Office P.O. BOX 9517 2300 RA, Leiden The Netherlands. 
                                                Email: <span className="c-accent"> <a href="mailto: info@dissco.eu" rel="noreferer"> info@dissco.eu </a> </span>
                                            </li>
                                            <li> The security contact for this AUP is: <span className="c-accent"> <a href="mailto: info@dissco.eu" rel="noreferer"> info@dissco.eu </a> </span> </li>
                                            <li> The privacy statements (e.g. Privacy Notices) are located <span className="c-accent"> <Link to="/privacy"> here </Link> </span> </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Terms;