import { Row, Col } from 'react-bootstrap';

/* Import Components */
import ValueField from '../ValueField';
import ActionsBlock from '../ActionsBlock';


const QualityFlaggingForm = (props) => {
    const modalProperty = props.modalProperty;
    const formData = props.formData['quality_flagging'];

    const HandleSubmit = event => {
        event.preventDefault();

        props.SubmitForm('quality_flagging');
    }

    return (
        <Row className="mt-3">
            <Col>
                <Row>
                    <Col md={{ span: 9 }}>
                        <div className="annotate_annotationTypeContext px-2 py-2 bg-primary-light">
                            This annotation type is used when flagging a quality issue.
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
                                value={modalProperty['property']}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Flag: </p>

                            <ValueField formData={formData}
                                modalProperty={modalProperty}

                                UpdateFormData={(value) => props.UpdateFormData('quality_flagging', 'value', value)}
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
                                onChange={(remarks) => props.UpdateFormData('quality_flagging', 'description', remarks)}
                            />
                        </Col>
                    </Row>

                    <ActionsBlock formData={formData}
                        RemoveAnnotation={() => props.RemoveAnnotation('quality_flagging')}
                    />
                </form>
            </Col>
        </Row>
    );
}

export default QualityFlaggingForm;