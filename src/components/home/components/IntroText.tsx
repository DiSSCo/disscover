/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Components */
import Title from './Title';
import TopicDisciplineText from './TopicDisciplineText';


const IntroText = () => {
    return (
        <Row>
            <Col>
                {/* Intro Text Title */}
                <span className="d-none d-lg-block">
                    <Title />
                </span>
                {/* Intro Text */}
                <Row className="mt-4">
                    <Col>
                        <p className="fs-3 c-primary">
                            Help us with improving the completeness and quality of information about specimens.
                            We aim to provide all information known about specimens held in Europe to science and to
                            make that information available as early and fast as possible.
                        </p>
                        <p className="fs-3 c-primary">
                            For this we need your help to correct errors, add or link new information and improve
                            the quality of our data.
                        </p>
                    </Col>
                </Row>
                {/* Search Explanation */}
                <span className="d-none d-lg-block mt-lg-5">
                    <TopicDisciplineText />
                </span>
            </Col>
        </Row>
    );
}

export default IntroText;