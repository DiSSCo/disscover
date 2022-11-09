import { Row, Col } from 'react-bootstrap';

/* Import Components */
import ActionsBlock from '../ActionsBlock';


const CommentingForm = (props) => {
    const modalProperty = props.modalProperty;
    const formData = props.formData['commenting'];

    const HandleSubmit = event => {
        event.preventDefault();

        props.SubmitForm('commenting');
    }

    return (
        <Row className="mt-3">
            <Col>
                <Row>
                    <Col md={{ span: 9 }}>
                        <div className="annotate_annotationTypeContext px-2 py-2 bg-primary-light">
                            This annotation type is used when commenting on specimen
                            attributes.
                        </div>
                    </Col>
                </Row>

                <form className="mt-4" onSubmit={HandleSubmit}>
                    <Row>
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Chosen attribute: </p>
                            <input className="annotate_annotationTypeField w-100"
                                disabled
                                name="attributeValue"
                                value={modalProperty['displayName']}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Comment: </p>
                            <textarea className="annotate_annotationTypeTextArea w-100"
                                rows="4"
                                name="value"
                                defaultValue={formData['value']}
                                onChange={(value) => props.UpdateFormData('commenting', 'value', value)}
                            />
                        </Col>
                    </Row>

                    <ActionsBlock formData={formData}
                        RemoveAnnotation={() => props.RemoveAnnotation('commenting')}
                    />
                </form>
            </Col>
        </Row>
    );
}

export default CommentingForm;