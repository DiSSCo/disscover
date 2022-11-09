/* Import Components */
import MessageTemplate from '../MessageTemplate';


const CommentingMessage = (props) => {
    const modalAnnotation = props.modalAnnotation;
    const propertyKey = props.propertyKey;
    const editType = props.editType;
    const annotationType = props.annotationType;

    /* Setting display values */
    let displayValues = {
        id: modalAnnotation['id'],
        value: modalAnnotation['body']['value']
    };

    return <MessageTemplate modalAnnotation={modalAnnotation}
        displayValues={displayValues}
        propertyKey={propertyKey}
        annotationType={annotationType}
        annotationMessageType={['commenting', 'Comment']}
        editType={editType}

        ToggleEditMode={() => props.ToggleEditMode('commenting')}
        ScrollToAnnotation={(ref) => props.ScrollToAnnotation(ref)}
    />
}

export default CommentingMessage;