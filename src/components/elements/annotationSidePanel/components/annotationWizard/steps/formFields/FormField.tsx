/* Import Dependencies */
import { toLower } from "lodash";

/* Import Types */
import { AnnotationFormProperty } from "app/Types";

/* Import Components */
import { BooleanField, DateField, SearchSelectField, SelectField, StringNumberField } from './FormFieldComponents';
import { InputTextArea } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    fieldProperty: AnnotationFormProperty,
    fieldName: string,
    fieldValue: string,
    motivation: string,
    SetFieldValue?: Function,
    isIdentificationAnnotation?: boolean
};


/**
 * Component that renders a suited template for the targeted annotation form field property
 * @param fieldProperty The annotation form field property that corresponds to the targetted term
 * @param fieldName The name of the annotation form field
 * @param fieldValue If present, the value of the annotation form field
 * @param motivation The selected motivation for making the annotation
 * @param SetFieldValue Function to set the value of a field in the annotation wizard form
 * @returns JSX Component
 */
const FormField = (props: Props) => {
    const { fieldProperty, fieldName, fieldValue, motivation, SetFieldValue, isIdentificationAnnotation } = props;

    if (['oa:commenting', 'oa:assessing'].includes(motivation)) {
        return <InputTextArea name={`annotationValues.${fieldName}`} />;
    } else if (fieldProperty.enum) {
        return <SelectField fieldProperty={fieldProperty}
            fieldName={fieldName}
            fieldValue={fieldValue}
        />;
    } else if (fieldProperty.type === 'boolean') {
        return <BooleanField fieldProperty={fieldProperty}
            fieldName={fieldName}
        />;
    } else if (toLower(fieldProperty.key).includes('date')) {
        return <DateField fieldProperty={fieldProperty}
            fieldName={fieldName}
            fieldValue={fieldValue}
            SetFieldValue={SetFieldValue}
        />
    } else if (isIdentificationAnnotation) {
        return <SearchSelectField fieldProperty={fieldProperty}
            name={fieldName}
            namePrefix="annotationValues"
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