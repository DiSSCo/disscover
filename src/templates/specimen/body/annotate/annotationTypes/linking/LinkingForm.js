import { Row, Col } from 'react-bootstrap';

/* Import Components */
import ValueField from '../ValueField';
import ActionsBlock from '../ActionsBlock';


const LinkingForm = (props) => {
    const modalProperty = props.modalProperty;
    const formData = props.formData['linking'];

    const HandleSubmit = event => {
        event.preventDefault();

        props.SubmitForm('linking');
    }

    return (
        <Row className="mt-3">
            <Col>
                <Row>
                    <Col md={{ span: 9 }}>
                        <div className="annotate_annotationTypeContext px-2 py-2 bg-primary-light">
                            This annotation type is used when a false relationship or link is
                            detected and needs to be replaced with a valid one.
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
                            <p className="annotate_annotationTypeFieldTitle"> New link: </p>

                            <ValueField formData={formData}
                                    modalProperty={modalProperty}

                                    UpdateFormData={(value) => props.UpdateFormData('linking', 'value', value)}
                                />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <p className="annotate_annotationTypeFieldTitle"> Based on: </p>
                            <input className="annotate_annotationTypeField w-100"
                                name="based_on"
                                defaultValue={formData && formData['based_on']}
                                autoComplete="false"
                                onChange={(basedOn) => props.UpdateFormData('linking', 'based_on', basedOn)}
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
                                onChange={(remarks) => props.UpdateFormData('linking', 'description', remarks)}
                            />
                        </Col>
                    </Row>

                    <ActionsBlock formData={formData}
                        RemoveAnnotation={() => props.RemoveAnnotation('linking')}
                    />
                </form>
            </Col>
        </Row>
    );
}

export default LinkingForm;