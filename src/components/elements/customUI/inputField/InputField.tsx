/* Import Dependencies */
import { Field } from "formik";

/* Import Styles */
import styles from './inputField.module.scss';


/* Props Type */
interface Props {
    children?: JSX.Element,
    name: string,
    placeholder?: string,
    className?: string
};


/** Component that renders a simple input field for entering input,
 * must be nested inside a Formik form
    * @param children Possible icon to display in the input bar
    * @param name The name of the input form field
    * @param placeholder A possible placeholder for the input form field
    * @param className Additional class names to be added to the input field
*/
const InputField = (props: Props) => {
    const { children, name, placeholder, className } = props;

    return (
        <div className="h-100 w-100 position-relative d-flex flex-column justify-content-center">
            <Field name={name}
                placeholder={placeholder}
                className={`${styles.inputField} ${className} w-100 fs-4 py-2 px-3 br-round`}
            />

            {children &&
                <button type="submit"
                    className="bgc-none b-none fs-4 position-absolute end-0 me-2"
                >
                    {children}
                </button>
            }
        </div>
    );
};

export default InputField;