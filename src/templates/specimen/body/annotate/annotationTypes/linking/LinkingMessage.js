/* Import Components */
import MessageTemplate from "../MessageTemplate";


const LinkingMessage = (props) => {
    const modalAnnotation = props.modalAnnotation;
    const propertyKey = props.propertyKey;
    const editType = props.editType;
    const annotationType = props.annotationType;

    /* Setting display values */
    let displayValues = {
        id: modalAnnotation['id'],
        value: modalAnnotation['body']['value'],
        description: modalAnnotation['body']['description'],
        basedOn: modalAnnotation['body']['based_on']
    };

    return <MessageTemplate modalAnnotation={modalAnnotation}
        displayValues={displayValues}
        propertyKey={propertyKey}
        annotationType={annotationType}
        annotationMessageType={['linking', 'Relationship/Link']}
        editType={editType}

        ToggleEditMode={() => props.ToggleEditMode('linking')}
        ScrollToAnnotation={(ref) => props.ScrollToAnnotation(ref)}
    />
}

export default LinkingMessage;