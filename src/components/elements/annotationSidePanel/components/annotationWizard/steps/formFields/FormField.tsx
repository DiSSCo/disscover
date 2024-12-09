/* Import Types */
import { AnnotationFormProperty } from "app/Types";

/* Import Components */
import { StringField } from './FormFieldComponents';


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

    switch (fieldProperty.type) {
        default: {
            return (
                <StringField fieldProperty={fieldProperty}
                    fieldName={fieldName}
                    fieldValue={fieldValue}
                />
            );
        }
    };
};

export default FormField;