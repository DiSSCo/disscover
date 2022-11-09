/* Import Components */
import MessageTemplate from '../MessageTemplate';


const AddingMessage = (props) => {
    const modalAnnotation = props.modalAnnotation;
    const propertyKey = props.propertyKey;
    const editType = props.editType;
    const annotationType = props.annotationType;

    /* Setting display values */
    let displayValues = {
        id: modalAnnotation['id'],
        description: modalAnnotation['body']['description']
    };

    if (Array.isArray(modalAnnotation['body']['value'])) {
        displayValues['value'] = modalAnnotation['body']['value'].join(', ')
    } else {
        displayValues['value'] = modalAnnotation['body']['value'];
    }

    return <MessageTemplate modalAnnotation={modalAnnotation}
        displayValues={displayValues}
        propertyKey={propertyKey}
        annotationType={annotationType}
        annotationMessageType={['adding', 'Addition']}
        editType={editType}

        ToggleEditMode={() => props.ToggleEditMode('adding')}
        ScrollToAnnotation={(ref) => props.ScrollToAnnotation(ref)}
    />
}

export default AddingMessage;