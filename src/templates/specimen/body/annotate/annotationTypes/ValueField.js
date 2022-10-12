import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';


const ValueField = (props) => {
    const formData = props.formData;
    const modalProperty = props.modalProperty;

    const [startDate, setStartDate] = useState(new Date(modalProperty['currentValue']));

    if (modalProperty['options']) {
        return (
            <>
                <datalist id={`dataList`}>
                    {modalProperty['options'].map((option, i) => {
                        return (
                            <option key={i}
                                value={option}
                            />
                        );
                    })}
                </datalist>

                <input className="annotate_annotationTypeField"
                    name="value"
                    defaultValue={formData && formData['value']}
                    onChange={(value) => props.UpdateFormData(value)}
                    list="dataList"
                />

            </>
        );
    } else if (!isNaN(startDate)) {
        return (
            <ReactDatePicker selected={startDate} 
                onChange={(date) => setStartDate(date)}
                onSelect={(value) => props.UpdateFormData(value)}
                showTimeSelect
                dateFormat={"yyyy-MM-dd h:mm"}

            />
        );
    } else {
        return (
            <input className="annotate_annotationTypeField"
                name="value"
                defaultValue={formData && formData['value']}
                onChange={(value) => props.UpdateFormData(value)}
            />
        );
    }
}

export default ValueField;