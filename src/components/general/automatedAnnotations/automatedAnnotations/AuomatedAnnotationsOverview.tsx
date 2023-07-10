/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';


const AutomatedAnnotationsOverview = () => {
    return (
        <Row>
            <Col>
                {/* Overview headers */}
                <Row>
                    <Col md={{span: 6}}>
                        <p className={styles.automatedAnnotationsHeader}> Service name </p>
                    </Col>
                    <Col md={{span: 4}}>
                        <p className={styles.automatedAnnotationsHeader}> Issued </p>
                    </Col>
                    <Col md={{span: 2}}>
                        <p className={styles.automatedAnnotationsHeader}> State </p>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default AutomatedAnnotationsOverview;