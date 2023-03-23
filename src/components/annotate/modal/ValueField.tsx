/* Import Dependencies */
import { Field } from 'formik';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Sources */
// import AnnotationFilterLayer from 'sources/annotationFilterLayer.json';
import HarmonisedAttributes from 'sources/hamonisedAttributes.json';
import DigitalMediaFilterLayer from 'sources/digitalMediaFilterLayer.json';


/* Props Typing */
interface Props {
    name: string,
    value: string | Date,
    property: string,
    targetType: string
};


const ValueField = (props: Props) => {
    const { name, property, targetType } = props;

    /* Base variables */
    const harmonisedAttributes: Dict = HarmonisedAttributes;
    const digitalMediaFilterLayer: Dict = DigitalMediaFilterLayer;
    let filteredAnnotation;

    if (targetType === 'digital_specimen') {
        filteredAnnotation = harmonisedAttributes[property];
    } else if (targetType === 'digital_media') {
        filteredAnnotation = digitalMediaFilterLayer[property];
    }

    /* Function for tracking start date if property is time related */
    
    /* Future Development: implement date field
        import ReactDatePicker from 'react-datepicker';

        const [startDate, setStartDate] = useState(new Date(modalProperty['currentValue']));
    
        return (
            <ReactDatePicker selected={startDate}
                onChange={(date) => setStartDate(date)}
                onSelect={(value) => props.UpdateFormData(value)}
                showTimeSelect
                dateFormat={"yyyy-MM-dd h:mm"}

            />
        );
    */

    if ('options' in filteredAnnotation) {
        return (
            <>
                <Field as="select" name={name}>
                    {filteredAnnotation.options.map((option: string) => {
                        return (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </Field>
            </>
        );
    } else {
        return (
            <Field type="text" name={name} className="w-100" />
        );
    }
}

export default ValueField;