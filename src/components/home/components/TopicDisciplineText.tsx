/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getScreenSize } from 'redux/general/GeneralSlice';

/* Import Styles */
import styles from 'components/home/home.module.scss';


const TopicDisciplineText = () => {
    const screenSize = useAppSelector(getScreenSize);
    let filtersPosition = 'left';

    if (screenSize !== 'lg') {
        filtersPosition = 'top';
    }

    return (
        <Row>
            <Col>
                <p className={`${styles.introText} fw-lightBold`}>
                    {`Select the categories on the ${filtersPosition} to refine your search`}
                </p>
                <p className={`${styles.introText} fw-lightBold`}>
                    or click on view to see all the specimens in the seleceted categories.
                </p>
            </Col>
        </Row>
    );
}

export default TopicDisciplineText;