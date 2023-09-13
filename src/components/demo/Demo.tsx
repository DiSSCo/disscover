/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from '../specimen/specimen.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import DOITooltipDemo from './DOITooltipDemo';
import Footer from 'components/general/footer/Footer';


const Demo = () => {
    return (
        <div className="d-flex flex-column min-vh-100 overflow-hidden">
            <Row>
                <Header />

                <Container fluid className={`${styles.content} pt-5`}>
                    <Row className="mt-5">
                        <Col md={{ span: 6, offset: 3 }} className="mt-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,

                            <DOITooltipDemo doi={'TEST/ZZZ-ZW5-RF7'}>
                                <span>
                                    TEST/ZZZ-ZW5-RF7
                                </span>
                            </DOITooltipDemo>

                            sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </Col>
                    </Row>
                </Container>

                <Footer />
            </Row>
        </div>
    );
}

export default Demo;