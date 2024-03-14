/* Import Dependencies */
import { Field } from 'formik';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    values: Dict,
    availableMASList: Dict[],
    SetFieldValue: Function,
    Remove: Function
};


const AutomatedAnnotationsListRecords = (props: Props) => {
    const { values, availableMASList, SetFieldValue, Remove } = props;

    return (
        <>
            {/* Show all chosen Machine annotation services */}
            {values.selectedMAS.map((MASid: string, index: number) => {
                const MAS = availableMASList.find(MASOption => MASOption.id === MASid) as Dict;

                return (
                    <div key={MASid}
                        className="b-primary rounded-c px-3 py-2"
                    >
                        <Row>
                            <Col>
                                <p className="fw-lightBold"> {MAS.attributes.mas.name} </p>
                            </Col>
                            <Col className="col-md-auto">
                                <button type="button" className="removeButton">
                                    <FontAwesomeIcon icon={faX} className="px-2"
                                        onClick={() => Remove(index)}
                                    />
                                </button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 8 }}>
                                <p className="fs-4">
                                    {MAS.attributes.mas.serviceDescription}
                                </p>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col className="col-md-auto pe-0">
                                <Field name={`allowBatchingFor[${MASid}]`}
                                    type="checkbox"
                                    className="checkbox"
                                />
                            </Col>
                            <Col>
                                <button type="button" className="button-no-style"
                                    onClick={() => {
                                        if (values.allowBatchingFor && !values.allowBatchingFor[MASid]) {
                                            SetFieldValue('allowBatchingFor', { ...values.allowBatchingFor, [MASid]: true });
                                        } else {
                                            SetFieldValue('allowBatchingFor', { ...values.allowBatchingFor, [MASid]: false });
                                        }
                                    }}
                                >
                                    <p>Allow batch annotations</p>
                                </button>
                            </Col>
                        </Row>
                    </div>
                );
            })}
        </>
    );
}

export default AutomatedAnnotationsListRecords;