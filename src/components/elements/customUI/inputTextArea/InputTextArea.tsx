/* Import Dependencies */
import { Field } from "formik";


/* Props Type */
type Props = {
    name: string
};


/**
 * Component that renders an automatically sized text area with Formik form field
 * @param name The name of the form field
 * @returns JSX Component
 */
const InputTextArea = (props: Props) => {
    const { name } = props;

    return (
        <div>
            <Field name={name}
                as="textarea"
                className="w-100"
                rows="6"
            />
        </div>
    );
};

export default InputTextArea;