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
        [`${styles.filterMidsOption}`]: true,
        [`${styles.active}`]: selected
    });

    return (
        <Col md={{ span: 3 }} className="pe-0 py-1">
            <div className={`${classMidsOption} py-1 px-1`}
                onClick={() => method()}
            >
                <Row>
                    <Col className="col-md-auto pe-0">
                        <Field name={`filters.${searchFilter}.${item[0]}`}
                            type="checkbox"
                            checked={selected}
                            onChange={() => {
                                method();
                            }}
                        />
                    </Col>
                    <Col className="px-2">
                        <span>MIDS {item[0]}</span>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}

export default MidsOption;