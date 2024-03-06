/* Import Dependencies */
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';


/* Props Typing */
interface Props {
    filter: Dict,
    searchFilter: string,
    selectedItem: [number | boolean | undefined]
};


const BooleanFilter = (props: Props) => {
    const { filter, searchFilter, selectedItem } = props;

    /* Hooks */
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(selectedItem)

    /* OnChange of boolean filter: update Search Params */
    useEffect(() => {
        console.log(selectedItem);

        let item: string | number | boolean | undefined = selectedItem[0];

        if (item !== undefined) {
            if (typeof (item) === 'number') {
                item = !!(selectedItem);
            }

            if (typeof (item) === 'boolean') {
                item = item.toString();
            }

            if (typeof (item) === 'string' && item !== searchParams.get(searchFilter)) {
                console.log(item);

                setSearchParams({[searchFilter]: item});
            }
        }
    }, [selectedItem]);

    return (
        <Row className="mt-2 px-2">
            <Col>
                <Row>
                    <Col>
                        <p className="fs-4 fw-bold"> {filter.displayName} </p>
                    </Col>
                </Row>

                <Row className="mt-1">
                    <Col>
                        <div>
                            <label className="position-relative w-100">
                                <Row className="align-items-center">
                                    <Col className="col-md-auto">
                                        <Field type="radio"
                                            name={`filters.${searchFilter}[0]`}
                                            value="true"
                                        />
                                        <span className="ps-1"> True </span>
                                        {/* <DatePicker selected={selectedValue}
                                            onChange={(date) => SetFieldValue(date)}
                                            className="fs-4 rounded-full border-0 w-100 px-2 py-1"
                                            placeholderText='Select a date'
                                        /> */}
                                    </Col>
                                    <Col className="ps-0">
                                        <Field type="radio"
                                            name={`filters.${searchFilter}[0]`}
                                            value="false"
                                        />
                                        <span className="ps-1"> False </span>
                                        {/* <FontAwesomeIcon icon={faCalendar}
                                            className="c-primary me-2"
                                        /> */}
                                    </Col>
                                </Row>
                            </label>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default BooleanFilter;