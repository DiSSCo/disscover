/* Import Dependencies */
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';

/* Import Types */
import { AnnotationFormProperty } from "app/Types";


/* Props Type */
type Props = {
    fieldProperty: AnnotationFormProperty,
    fieldName: string,
    fieldValue?: string,
    SetFieldValue?: Function
};


/**
 * Component that renders a string field for terms with the type of string or number in the annotation wizard form
 * @param fieldProperty The annotation form field property that corresponds to the targetted term
 * @param fieldName The name of the annotation form field
 * @param fieldValue If present, the value of the annotation form field
 * @param SetFieldValue Function to set the value of a field in the annotation wizard form
 * @returns JSX Component
 */
const DateField = (props: Props) => {
    const { fieldProperty, fieldName, fieldValue, SetFieldValue } = props;

    return (
        <div>
            <p className="fs-4">
                {fieldProperty.name}
            </p>
            <DatePicker value={fieldValue && format(fieldValue, 'MMMM dd - yyyy')}
                wrapperClassName="w-100 mt-1"
                className="w-100 br-corner b-grey py-1 px-2"
                onChange={dateValue => dateValue && SetFieldValue?.(`annotationValues.${fieldName}`, format(dateValue, 'yyyy-MM-dd'))}
            />
        </div>
    );
};

export default DateField;