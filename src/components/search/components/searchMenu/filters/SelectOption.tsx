/* Import Dependencies */
import { Field } from 'formik';
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


const SelectOption = (props: Props) => {
    const { searchFilter, item, method, selected } = props;

    return (
        <Row key={item[0]} className={`${selected ? styles.filterSelectedList : ''} 
            ${styles.filterSelectOption} d-flex justify-content-center align-items-center`}
            onClick={() => method()}
        >
            <Col className="col-md-auto pe-0">
                <Field name={`filters.${searchFilter}.${item[0]}`}
                    type="checkbox"
                    checked={selected}
                    onChange={() => {
                        method();
                    }}
                />
            </Col>
            <Col>
                <p className={`${styles.filterListItem} py-1`}> {item[0]} </p>
            </Col>
            <Col md={{ span: 3 }}>
                <p className={styles.filterAggregation}> {item[1]} </p>
            </Col>
        </Row>
    );
}

export default SelectOption;