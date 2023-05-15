/* Import Dependencies */
import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';

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
                <Col md={{span: 10, offset: 1 }} className="h-100 px-0">
                    <Row className="h-100 align-items-center">
                        <Col className="col-md-auto pt-0 pe-0">
                            <p className={`${styles.footerText}`}>
                                <a href="https://dissco.eu" className={styles.footerLink} target="_blank" rel="noreferrer">
                                    Distributed System of Scientific Collections
                                </a>
                            </p>
                        </Col>
                        <Col>
                            <p className={styles.footerText}>
                                © DiSSCo {currentYear}
                            </p>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <p className={styles.footerText}>
                                <Link to="/privacy-policy">
                                    Privacy Policy
                                </Link>
                            </p>
                        </Col>
                        <Col className="col-md-auto">
                            <a href="https://github.com/DiSSCo/unified-curation-and-annotation-service/issues" target="_blank" rel="noreferrer">
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