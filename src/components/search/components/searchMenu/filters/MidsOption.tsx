/* Import Depdencies */
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/search/search.module.scss';


/* Props Typing */
interface Props {
    item: [string, number],
    method: Function,
    selected?: boolean
};


const MidsOption = (props: Props) => {
    const { item, method, selected } = props;

    /* ClassName for Mids Option */
    const classMidsOption = classNames({
        [`${styles.filterMidsOption} transition fs-4 c-pointer b-primary`]: true,
        [`${styles.active}`]: selected
    });

    return (
        <Col md={{ span: 3 }} className="pe-0 py-1">
            <div className={`${classMidsOption} py-1 px-1`}
                onClick={() => method()}
            >
                <Row>
                    <Col className="text-center">
                        <span>MIDS {item[0]}</span>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}

export default MidsOption;