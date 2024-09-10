/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Utilities */
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Icons */
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    jsonPath: string,
    instanceValue: Dict | string,
    selected: boolean,
    SetFieldValue?: Function
};


/**
 * Component that renders an existing, annotatable instance that is displayed in the annotation select instance step of the wizard
 * @param jsonPath The JSON path of the instance
 * @param instanceValue The value of the instance, either a dictionary being it a class or a string being it a term
 * @param selected A boolean that indicates if the instance is currently selected or not
 * @param SetFieldValue Function to set the value of a field in the form
 * @returns JSX Component
 */
const ExistingInstance = (props: Props) => {
    const { jsonPath, instanceValue, selected, SetFieldValue } = props;

    /* Base variables */
    const [showAllValues, setShowAllValues] = useState<boolean>(false);

    /* Class Names */
    const selectedDivClass = classNames({
        'b-primary br-selected': selected
    });

    return (
        <div>
            <Card className="bgc-primary mt-3 b-grey br-corner">
                <div className={`${selectedDivClass} bgc-white py-1 px-3 tr-fast`}>
                    {/* Instance title and target type */}
                    <Row>
                        <Col>
                            <p className="tc-primary fw-lightBold">
                                {MakeJsonPathReadableString(jsonPath)}
                            </p>
                        </Col>
                        <Col lg="auto">
                            <p className="tc-primary fw-lightBold">
                                {typeof (instanceValue) === 'object' ? 'Class' : 'Term'}
                            </p>
                        </Col>
                    </Row>
                    {/* Instance value, dictionary if it is a class or string if it is a term */}
                    <Row>
                        <Col>
                            {typeof (instanceValue) === 'object' ? <div>
                                <Row>
                                    <Col>
                                        <p className="fs-4"><span className="fw-lightBold">Values:</span></p>
                                    </Col>
                                    {Object.keys(instanceValue).length >= 3 &&
                                        <Col lg="auto">
                                            <Button type="button"
                                                variant="blank"
                                                className="px-0 py-0"
                                                OnClick={() => setShowAllValues(!showAllValues)}
                                            >
                                                {!showAllValues ? <div>
                                                    <p>
                                                        {`Show all values `}
                                                        <FontAwesomeIcon icon={faChevronDown} />
                                                    </p>
                                                </div>
                                                    : <div>
                                                        {`Hide values `}
                                                        <FontAwesomeIcon icon={faChevronUp} />
                                                    </div>
                                                }
                                            </Button>
                                        </Col>
                                    }
                                </Row>
                                <Row>
                                    <Col>
                                        {Object.entries(instanceValue).map(([key, value], index) => {
                                            if (showAllValues || index < 3) {
                                                return (
                                                    <p className="fs-4">
                                                        <span className="fw-lightBold">{`${MakeJsonPathReadableString(key)}: `}</span>{`${value}`}
                                                    </p>
                                                );
                                            }
                                        })}
                                    </Col>
                                </Row>
                            </div>
                                : <div>
                                    <p className="fs-4"><span className="fw-lightBold">Value:</span> {instanceValue}</p>
                                </div>
                            }
                        </Col>
                    </Row>
                    {/* Select instance button */}
                    <Row className="mt-2 mb-2">
                        <Col>
                            <Button type="button"
                                variant="primary"
                                className="fs-5 py-1 px-3"
                                disabled={selected}
                                OnClick={() => SetFieldValue?.('jsonPath', jsonPath)}
                            >
                                {!selected ? 'Select this instance' : 'Currently selected'}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
    );
};

export default ExistingInstance;