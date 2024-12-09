/* Import Dependencies */
import { Field } from "formik";

/* Import Types */
import { AnnotationFormProperty } from "app/Types";


/* Props Type */
type Props = {
    fieldProperty: AnnotationFormProperty,
    fieldName: string,
    fieldValue?: string
};


/**
 * Component that renders a select field for terms with the type of string and an enum in the annotation wizard form
 * @param fieldProperty The annotation form field property that corresponds to the targetted term
 * @param fieldName The name of the annotation form field
 * @param fieldValue If present, the value of the annotation form field
 * @returns JSX Component
 */
const SelectField = (props: Props) => {
    const { fieldProperty, fieldName, fieldValue } = props;

    return (
        <div>
            <p className="fs-4">
                {fieldProperty.name}
            </p>
            <Field name={`annotationValues.${fieldName}`}
                as="select"
                value={fieldValue ?? ''}
                className="w-100 b-grey br-corner mt-1 py-1 px-2"
            >
                <option value=""
                    disabled
                >
                    Select an option
                </option>
                {fieldProperty.enum?.map(option => (
                    <option key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </Field>
        </div>
    );
};

export default SelectField;