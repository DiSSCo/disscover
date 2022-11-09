/* Import Components */
import MessageTemplate from "../MessageTemplate";


const QualityFlaggingMessage = (props) => {
    const modalAnnotation = props.modalAnnotation;
    const propertyKey = props.propertyKey;
    const editType = props.editType;
    const annotationType = props.annotationType;

    /* Setting display values */
    let displayValues = {
        id: modalAnnotation['id'],
        value: modalAnnotation['body']['value'],
        description: modalAnnotation['body']['description']
    };

    return <MessageTemplate modalAnnotation={modalAnnotation}
        displayValues={displayValues}
        propertyKey={propertyKey}
        annotationType={annotationType}
        annotationMessageType={['quality_flagging', 'Quality Flag']}
        editType={editType}

        ToggleEditMode={() => props.ToggleEditMode('quality_flagging')}
        ScrollToAnnotation={(ref) => props.ScrollToAnnotation(ref)}
    />
}

export default QualityFlaggingMessage;