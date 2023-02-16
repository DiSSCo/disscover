/* Import Dependencies */
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { FieldArray, Field } from 'formik';

/* Import Types */
import { Annotation, Dict } from 'global/Types';

/* Import Sources */
import AnnotationFilterLayer from 'sources/annotationFilterLayer.json';
import DigitalMediaFilterLayer from 'sources/digitalMediaFilterLayer.json';


/* Props Typing */
interface Props {
    name: string,
    property: string,
    targetType: string
};


const ValueField = (props: Props) => {
    const { name, property, targetType } = props;

    /* Base variables */
    const annotationFilterLayer: Dict = AnnotationFilterLayer;
    const digitalMediaFilterLayer: Dict = DigitalMediaFilterLayer;
    let filteredAnnotation;

    if (targetType === 'digital_specimen') {
        filteredAnnotation = annotationFilterLayer[property];
    } else if (targetType === 'digital_media') {
        filteredAnnotation = digitalMediaFilterLayer[property];
    }

    // const [startDate, setStartDate] = useState(new Date(modalProperty['currentValue']));

    if ('options' in filteredAnnotation) {
        return (
            <>
                <datalist id={`dataList`}>

                </datalist>

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
    } /*else if (!isNaN(startDate)) {
        return (
            <ReactDatePicker selected={startDate}
                onChange={(date) => setStartDate(date)}
                onSelect={(value) => props.UpdateFormData(value)}
                showTimeSelect
                dateFormat={"yyyy-MM-dd h:mm"}

            />
        );
    }*/ else {
        return (
            <Field type="text" name={name} />

            // <input className="annotate_annotationTypeField w-100"
            //     name="value"
            //     defaultValue={formData && formData['value']}
            //     onChange={(value) => props.UpdateFormData(value)}
            // />
        );
    }
}

export default ValueField;