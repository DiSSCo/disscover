/* Import Components */
import MessageTemplate from "../MessageTemplate";


const CorrectingMessage = (props) => {
    const modalAnnotation = props.modalAnnotation;
    const propertyKey = props.propertyKey;
    const editType = props.editType;
    const annotationType = props.annotationType;

    /* Setting display values */
    let displayValues = {
        id: modalAnnotation['id'],
        value: modalAnnotation['body']['value'],
        description: modalAnnotation['body']['description'],
        reference: modalAnnotation['body']['reference']
    };

    return <MessageTemplate modalAnnotation={modalAnnotation}
        displayValues={displayValues}
        propertyKey={propertyKey}
        annotationType={annotationType}
        annotationMessageType={['correcting', 'Correction']}
        editType={editType}

        ToggleEditMode={() => props.ToggleEditMode('correcting')}
        ScrollToAnnotation={(ref) => props.ScrollToAnnotation(ref)}
    />
}

export default CorrectingMessage;