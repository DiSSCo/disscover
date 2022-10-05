import { Row, Col } from 'react-bootstrap';


const QualityFlaggingForm = (props) => {
    const modalProperty = props.modalProperty;
    const formData = props.formData['quality_flagging'];
    const annotationExists = props.annotationExists;

    const HandleSubmit = event => {
        event.preventDefault();

        props.SubmitForm('quality_flagging');
    }

    return (
        <Row className="mt-3">
            <Col>
                <Row>
                    <Col md={{ span: 9 }}>
                        <div className="annotate_annotationTypeContext px-2 py-2">
                            This annotation type is used when flagging a quality issue.
                        </div>
                    </Col>
                </Row>

                <form className="mt-4" onSubmit={HandleSubmit}>
                    <Row>
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Chosen attribute: </p>
                            <input className="annotate_annotationTypeField"
                                disabled
                                name="attributeValue"
                                value={modalProperty['property']}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Flag: </p>
                            <input className="annotate_annotationTypeField"
                                name="value"
                                defaultValue={formData && formData['value']}
                                onChange={(value) => props.UpdateFormData('quality_flagging', 'value', value)}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Remarks: </p>
                            <textarea className="annotate_annotationTypeTextArea"
                                rows="4"
                                name="remarks"
                                defaultValue={formData && formData['description']}
                                onChange={(remarks) => props.UpdateFormData('quality_flagging', 'description', remarks)}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col className="col-md-auto">
                            <button type="submit"
                                className="annotate_annotationTypeSubmit"
                            >
                                Save annotation
                            </button>
                        </Col>
                        {annotationExists &&
                            <Col className="col-md-auto">
                                <button type="button"
                                    className="annotate_annotationTypeRemove"
                                    onClick={() => props.RemoveAnnotation('quality_flagging')}
                                >
                                    Remove Annotation
                                </button>
                            </Col>
                        }
                    </Row>
                </form>
            </Col>
        </Row>
    );
}

export default QualityFlaggingForm;