/* Import Dependencies */
import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSidePanelToggle } from 'redux/annotate/AnnotateSlice';

/* Import Styles */
import styles from './footer.module.scss';


const Footer = () => {
    /* Hooks */
    const location = useLocation();

    /* Base variables */
    const sidePanelToggle = useAppSelector(getSidePanelToggle);

    /* Get current year */
    const currentYear = new Date().getFullYear();

    /* ClassNames for Footer */
    const classFooter = classNames({
        [`${styles.footer}`]: true,
        [`${styles.home}`]: (location.pathname === '/')
    });

    const classFooterContent = classNames({
        'col-md-10 offset-md-1': !sidePanelToggle,
        'col-md-12 px-5': sidePanelToggle
    });

    return (
        <Container fluid className={classFooter}>
            <Row className="h-100">
                <Col className={`${classFooterContent} h-100 px-0 transition`}>
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