import { Row, Col } from 'react-bootstrap';

/* Import Components */
import ValueField from '../ValueField';


const CorrectingForm = (props) => {
    const modalProperty = props.modalProperty;
    const formData = props.formData['correcting'];
    const annotationExists = props.annotationExists;

    const HandleSubmit = event => {
        event.preventDefault();

        props.SubmitForm('correcting');
    }

    return (
        <Row className="mt-3">
            <Col>
                <Row>
                    <Col md={{ span: 9 }}>
                        <div className="annotate_annotationTypeContext px-2 py-2 bg-primary-light">
                            This annotation type is used when correcting an existing value
                            of an attribute that is deemed invalid.
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
                                value={modalProperty['displayName']}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Value: </p>

                            <ValueField formData={formData}
                                modalProperty={modalProperty}

                                UpdateFormData={(value) => props.UpdateFormData('correcting', 'value', value)}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Reference: </p>
                            <input className="annotate_annotationTypeField w-100"
                                name="reference"
                                defaultValue={formData && formData['reference']}
                                autoComplete="false"
                                onChange={(reference) => props.UpdateFormData('correcting', 'reference', reference)}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Remarks: </p>
                            <textarea className="annotate_annotationTypeTextArea w-100"
                                rows="4"
                                name="remarks"
                                defaultValue={formData && formData['description']}
                                onChange={(remarks) => props.UpdateFormData('correcting', 'description', remarks)}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col className="col-md-auto">
                            <button type="submit"
                                className="annotate_annotationTypeSubmit border-2-primary-dark"
                            >
                                Save annotation
                            </button>
                        </Col>
                        {annotationExists &&
                            <Col className="col-md-auto">
                                <button type="button"
                                    className="annotate_annotationTypeRemove"
                                    onClick={() => props.RemoveAnnotation('correcting')}
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

export default CorrectingForm;