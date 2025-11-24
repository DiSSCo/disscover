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
    SubmitForm: Function,
    filters?: string[],
    noAggregations?: boolean
};


/**
 * Component that renders a block filter that can be used in the search filters menu
 * @param name The name of the search filter form field
 * @param namePrefix A possible prefix under which the form field' name is stored in the form state
 * @param fieldValues The selected field values in the form
 * @param aggregations The aggregations as received from the API
 * @param text The text to display as the block filter's title
 * @param SubmitForm Function to submit the form
 * @returns JSX Component
 */
const BlockFilter = (props: Props) => {
    const { name, namePrefix, fieldValues, aggregations, text, SubmitForm, filters, noAggregations } = props;

    /* Base variables */
    const blockFilterItems: string[] = [];

    /* Construct from boot aggregations */
    if (aggregations && !noAggregations) {
        Object.keys(aggregations).forEach(key => blockFilterItems.push(key))
    }

    if (noAggregations && filters) {
        filters.forEach(key => blockFilterItems.push(key));
    }

    /* Construct from selected values by replacing the aggregation ones */
    fieldValues.forEach(fieldValue => {
        const index: number = blockFilterItems.findIndex(blockFilterItem => blockFilterItem === fieldValue);

        if (index >= 0) {
            blockFilterItems.splice(index, 1, fieldValue);
        }
    });

    /**
     * Function that fires when selecting a block
     * @param blockFilerItem A string that represents the selected block filter item
     * @param Push Function to push an item to the field array items
     * @param Remove Function to remove an item from the field array items
     */
    const SelectBlock = (blockFilterItem: string, Push: Function, Remove: Function) => {
        /* Check if index is present in field values, if not push to array, otherwise remove */
        const index: number = fieldValues.findIndex(fieldValue => fieldValue === blockFilterItem);

        if (index >= 0) {
            Remove(index);
        } else {
            Push(blockFilterItem);
        }

        SubmitForm();
    };

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
                                        onClick={() => SelectBlock(blockFilterItem, push, remove)}
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