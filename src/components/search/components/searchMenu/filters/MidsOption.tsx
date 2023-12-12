/* Import Depdencies */
import { Field } from 'formik';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/search/search.module.scss';


/* Props Typing */
interface Props {
    searchFilter: string,
    item: [string, number],
    method: Function,
    selected?: boolean
};


const MidsOption = (props: Props) => {
    const { searchFilter, item, method, selected } = props;

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
                    <Col sm={{ span: 12 }} md={{ span: 12 }} className="col-lg-auto pe-0 d-flex justify-content-center">
                        <Field name={`filters.${searchFilter}.${item[0]}`}
                            type="checkbox"
                            checked={selected}
                            onChange={() => {
                                method();
                            }}
                        />
                    </Col>
                    <Col className="d-flex justify-content-center px-2">
                        <span>MIDS {item[0]}</span>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}

export default MidsOption;