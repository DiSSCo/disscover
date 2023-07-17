/* Import Dependencies */
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getScreenSize } from 'redux/general/GeneralSlice';

/* Import Styles */
import styles from 'components/home/home.module.scss';


const Title = () => {
    /* Base variables */
    const screenSize = useAppSelector(getScreenSize);

    /* Class Name for Title */
    const classTitle = classNames({
        [`${styles.introTitle}`]: true,
        'h3': screenSize !== 'lg'
    });

    return (
        <Row>
            <Col lg={{ span: 8 }}>
                <h1 className={`${classTitle} fw-bold`}>
                    Annotate specimens
                    and contribute to science
                </h1>
            </Col>
        </Row>
    );
}

export default Title; 