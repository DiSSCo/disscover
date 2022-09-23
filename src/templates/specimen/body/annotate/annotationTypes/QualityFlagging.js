import { useState } from "react";
import { Row, Col } from 'react-bootstrap';


const QualityFlagging = (props) => {
    const modalProperty = props.modalProperty;
    const [formData, setFormData] = useState();

    function SubmitForm() {
        const form = formData.target.form;

        const annotation = {
            property: form[0].value,
            value: form[2].value,
            motivation: form[3].value
        }

        props.SaveAnnotation(annotation);
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

                <form className="mt-4" onChange={(form) => setFormData(form)}>
                    <Row>
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Chosen attribute: </p>
                            <input type="hidden"
                                name="attribute"
                                value={modalProperty['property']}
                            />
                            <input className="annotate_annotationTypeField"
                                disabled
                                name="attributeValue"
                                value={modalProperty['displayName']} />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Flag: </p>
                            <input className="annotate_annotationTypeField"
                                name="value"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Motivation: </p>
                            <textarea className="annotate_annotationTypeTextArea"
                                rows="4"
                                name="motivation"
                            />
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <button type="button"
                                value="Save annotation"
                                className="annotate_annotationTypeSubmit"
                                onClick={() => SubmitForm()}>
                                Save annotation
                            </button>
                        </Col>
                    </Row>
                </form>
            </Col>
        </Row>
    );
}

export default QualityFlagging;