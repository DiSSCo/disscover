/* Import Dependencies */
import classNames from 'classnames';
import { FieldArray } from 'formik';
import { Row, Col } from 'react-bootstrap';


/* Props Type */
type Props = {
    name: string,
    namePrefix?: string,
    fieldValues: string[],
    aggregations?: { [aggregation: string]: number },
    text?: string,
    SubmitForm: Function
};


/**
 * 
 * @param props 
 * @returns 
 */
const BlockFilter = (props: Props) => {
    const { name, namePrefix, fieldValues, aggregations, text, SubmitForm } = props;

    /* Base variables */
    const blockFilterItems: string[] = [];

    /* Construct from boot aggregations */
    if (aggregations) {
        Object.keys(aggregations).forEach(key => {
            blockFilterItems.push(key);
        })
    };

    /* Construct from selected values by replacing the aggregation ones */
    fieldValues.forEach(fieldValue => {
        const index: number = blockFilterItems.findIndex(blockFilterItem => blockFilterItem === fieldValue);

        if (index >= 0) {
            blockFilterItems.splice(index, 1, fieldValue);
        };
    });

    /**
     * Function to generate a class name for a single block filter item
     * @param value The value of the block filter item
     * @returns Class Name
     */
    const BlockFilterItemClass = (value: string) => {
        return classNames({
            'bgc-primary tc-white hover-primary-light': fieldValues.includes(value)
        });
    };

    return (
        <div>
            <Row className="px-2">
                <FieldArray name={`${namePrefix ? namePrefix + '.' : ''}${name}`}>
                    {({ push, remove }) => (
                        <>
                            {blockFilterItems.map(blockFilterItem => (
                                <Col key={blockFilterItem}
                                    className="px-1"
                                >
                                    <button type="button"
                                        className={`${BlockFilterItemClass(blockFilterItem)} button-no-style hover-primary tr-smooth b-primary br-corner w-100 fs-5 fw-bold text-center py-1`}
                                        onClick={() => {
                                            /* Check if index is present in field values, if not push to array, otherwise remove */
                                            const index: number = fieldValues.findIndex(fieldValue => fieldValue === blockFilterItem);

                                            if (index >= 0) {
                                                remove(index);
                                            } else {
                                                push(blockFilterItem);
                                            };

                                            SubmitForm();
                                        }}
                                    >
                                        {`${text ? text + ' ' : ''}${blockFilterItem}`}
                                    </button>
                                </Col>
                            ))}
                        </>
                    )}
                </FieldArray>
            </Row>
        </div>
    );
};

export default BlockFilter;