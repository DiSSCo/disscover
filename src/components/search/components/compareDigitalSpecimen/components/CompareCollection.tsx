/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';

/* Import Icons */
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    collectionName: string,
    fields: {
        [field: string]: string[][]
    }
};


/**
 * Component that renders a collection group of fields as part of a compare digital specimen
 * @param collectionName The name of the collection
 * @param fields The fields associated with the collection
 * @returns JSX Component
 */
const CompareCollection = (props: Props) => {
    const { collectionName, fields } = props;

    /* Base variables */
    const [toggle, setToggle] = useState<boolean>(true);

    /* Class Names */
    const collectionFieldsClass = classNames({
        'd-none': !toggle
    });

    const chevronClass = classNames({
        'icon-rotate': !toggle
    });

    return (
        <Row>
            <Col>
                <div className="bb-grey">
                    {/* Collection name */}
                    <Button type="button"
                        variant="blank"
                        className="position-sticky-left py-0 px-0"
                        OnClick={() => setToggle(!toggle)}
                    >
                        <p className="tc-accent fw-lightBold">
                            <FontAwesomeIcon icon={faChevronUp}
                                className={`${chevronClass} mc-pointer`}
                            />
                            {' ' + MakeReadableString(collectionName)}
                        </p>
                    </Button>

                    {/* Collection fields */}
                    <div className={`${collectionFieldsClass} mt-1`}>
                        {Object.entries(fields).map(([fieldName, values]) => (
                            <div key={fieldName}>
                                <Row className="flex-nowrap">
                                    {/* Field name */}
                                    <Col lg={{ span: 2 }}
                                        className="position-sticky-left bgc-default py-1 bb-grey br-grey"
                                    >
                                        <p className="fw-lightBold fs-4">
                                            {MakeReadableString(fieldName)}
                                        </p>
                                    </Col>
                                    {values.map((valueArray, index) => (
                                        <Col key={`${fieldName}_${index}`}
                                            lg={{ span: 3 }}
                                            className={`${index === 0 ? 'ms-2' : ''} py-1 bl-grey bb-grey`}
                                        >
                                            {valueArray.length ? valueArray.map(value => (
                                                <p key={value}
                                                    className="fs-4"
                                                >
                                                    {value}
                                                </p>
                                            )) : <p>
                                                ...
                                            </p>}
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))}
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default CompareCollection;