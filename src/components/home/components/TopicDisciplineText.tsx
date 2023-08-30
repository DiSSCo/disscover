/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getScreenSize } from 'redux/general/GeneralSlice';


const TopicDisciplineText = () => {
    const screenSize = useAppSelector(getScreenSize);
    let filtersPosition = 'left';

    if (screenSize !== 'lg') {
        filtersPosition = 'top';
    }

    return (
        <Row>
            <Col>
                <p className="fs-3 c-primary fw-lightBold">
                    {`Select the categories on the ${filtersPosition} to refine your search`}
                </p>
                <p className="fs-3 c-primary fw-lightBold">
                    or click on view to see all the specimens in the seleceted categories.
                </p>
            </Col>
        </Row>
    );
}

export default TopicDisciplineText;