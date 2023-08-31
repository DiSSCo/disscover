/* Import Dependencies */
import DatePicker from 'react-datepicker';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    filter: Dict,
    selectedValue: Date,
    SetFieldValue: Function
};


const DateFilter = (props: Props) => {
    const { filter, selectedValue, SetFieldValue } = props;

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
                        <div className="b-primary rounded-full">
                            <label className="position-relative w-100">
                                <Row className="align-items-center">
                                    <Col>
                                        <DatePicker selected={selectedValue}
                                            onChange={(date) => SetFieldValue(date)}
                                            className="fs-4 rounded-full border-0 w-100 px-2 py-1"
                                            placeholderText='Select a date'
                                        />
                                    </Col>
                                    <Col className="col-md-auto ps-0">
                                        <FontAwesomeIcon icon={faCalendar}
                                            className="c-primary me-2"
                                        />
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

export default DateFilter;