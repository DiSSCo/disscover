const ValueField = (props) => {
    const formData = props.formData;
    const modalProperty = props.modalProperty;

    if (modalProperty['options']) {
        const dataList = <datalist>
            {modalProperty['options'].map((option, i) => {
                return (
                    <option key={i}
                        value={option}
                    />
                );
            })}
        </datalist>

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