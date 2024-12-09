/* Import Dependencies */
import { toLower } from "lodash";

/* Import Types */
import { AnnotationFormProperty } from "app/Types";

/* Import Components */
import { DateField, SelectField, StringNumberField } from './FormFieldComponents';


/* Props Type */
type Props = {
    fieldProperty: AnnotationFormProperty,
    fieldName: string,
    fieldValue?: string,
    SetFieldValue?: Function
};


/**
 * Component that renders a suited template for the targeted annotation form field property
 * @param fieldProperty The annotation form field property that corresponds to the targetted term
 * @param fieldName The name of the annotation form field
 * @param fieldValue If present, the value of the annotation form field
 * @param SetFieldValue Function to set the value of a field in the annotation wizard form
 * @returns JSX Component
 */
const FormField = (props: Props) => {
    const { fieldProperty, fieldName, fieldValue, SetFieldValue } = props;

    if (fieldProperty.enum) {
        return <SelectField fieldProperty={fieldProperty}
            fieldName={fieldName}
            fieldValue={fieldValue}
        />;
    } else if (toLower(fieldProperty.key).includes('date')) {
        return <DateField fieldProperty={fieldProperty}
            fieldName={fieldName}
            fieldValue={fieldValue}
            SetFieldValue={SetFieldValue}
        />
    } else {
        return <StringNumberField fieldProperty={fieldProperty}
            fieldName={fieldName}
            fieldValue={fieldValue}
        />;
    }
};

export default FormField;