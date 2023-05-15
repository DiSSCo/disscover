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
        <Row key={item[0]}
            onClick={() => method()}
        >
            <Col>
                <div className={`${selected && styles.active} 
                    ${styles.filterSelectOption} px-1 py-1`}
                >
                    <Row className="align-items-center px-1">
                        <Col className="col-md-auto pe-0">
                            <Field name={`filters.${searchFilter}.${item[0]}`}
                                type="checkbox"
                                checked={selected}
                                onClick={() => {
                                    method();
                                }}
                            />
                        </Col>
                        <Col>
                            <p className={`${styles.filterListItem}`}> {item[0]} </p>
                        </Col>
                        <Col md={{ span: 3 }} className="d-flex justify-content-end">
                            <p className={styles.filterAggregation}> {item[1]} </p>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default SelectOption;