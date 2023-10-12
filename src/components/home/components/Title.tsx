/* Import Dependencies */
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getScreenSize } from 'redux/general/GeneralSlice';


const Title = () => {
    /* Base variables */
    const screenSize = useAppSelector(getScreenSize);

    /* Class Name for Title */
    const classTitle = classNames({
        'fs-1 c-primary fw-bold': true,
        'h3': screenSize !== 'lg'
    });

    return (
        <Row>
            <Col>
                <h1 className={`${classTitle}`}>
                    Annotate specimens and <br /> contribute to science
                </h1>
            </Col>
        </Row>
    );
}

export default Title; 