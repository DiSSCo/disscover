/* Import Dependencies */
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { Container, Row, Col } from "react-bootstrap";

/* Import Styles */
import styles from './footer.module.scss';


const Footer = () => {
    /* Hooks */
    const location = useLocation();

    /* Get current year */
    const currentYear = new Date().getFullYear();

    /* ClassName for Footer */
    const classFooter = classNames({
        [`${styles.footer}`]: true,
        [`${styles.home}`]: (location.pathname === '/')
    });

    return (
        <Container fluid className={classFooter}>
            <Row className="h-100">
                <Col md={{ span: 10, offset: 1 }} className={`${styles.footerCol} h-100`}>
                    <Row className="h-100 align-items-center">
                        <Col className="col-md-auto pt-0">
                            <p className={`${styles.footerText}`}>
                                <a href="https://dissco.eu" className={styles.footerLink} target="_blank">
                                    Distributed System of Scientific Collections
                                </a>
                            </p>
                            <p className={styles.footerText}>
                                © DiSSCo {currentYear}
                            </p>
                        </Col>
                        <Col className="col-md-auto">
                            <p className={styles.footerText}>
                                Privacy Policy
                            </p>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <a href="https://github.com/DiSSCo/unified-curation-and-annotation-service/issues" target="_blank">
                                <p className={`${styles.footerText} ${styles.footerLink}`}> Send us Feedback on GitHub </p>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;