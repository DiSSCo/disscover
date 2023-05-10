/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/home/home.module.scss';


const IntroText = () => {
    return (
        <Row>
            <Col>
                {/* Intro Text Title */}
                <Row>
                    <Col>
                        <h1 className={`${styles.introTitle} fw-bold`}>
                            Annotate specimens <br />
                            and contribute to science
                        </h1>
                    </Col>
                </Row>
                {/* Intro Text */}
                <Row className="mt-4">
                    <Col>
                        <p className={styles.introText}>
                            Help us with improving the completeness and quality of information about specimens.
                            We aim to provide all information known about specimens held in Europe to science and to
                            make that information available as early and fast as possible.
                        </p>
                        <p className={`${styles.introText} mt-3`}>
                            For this we need your help to correct errors, add or link new information and improve
                            the quality of our data.
                        </p>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default IntroText;