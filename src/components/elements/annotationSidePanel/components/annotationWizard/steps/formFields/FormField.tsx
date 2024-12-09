/* Import Types */
import { AnnotationFormProperty } from "app/Types";


/* Props Type */
type Props = {
    fieldProperty: AnnotationFormProperty,
    fieldName: string,
    fieldValue?: string
};


/**
 * Component that renders a suited template for the targeted annotation form field property
 * @returns JSX Component
 */
const FormField = (props: Props) => {
    const { fieldProperty, fieldName, fieldValue } = props;

    return (
        <>
            { }
        </>
    );
};

export default FormField;