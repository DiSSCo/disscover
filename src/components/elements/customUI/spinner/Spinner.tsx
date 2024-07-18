/* Import Dependencies */
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

/* Import Styles */
import styles from './spinner.module.scss';


/* Props Type */
type Props = {
    className?: string
};


/**
 * Component that renders a spinner to be used when loading elements
 * @param className Additonal class names that may be added
 * @returns JSX Component
 */
const Spinner = (props: Props) => {
    const { className } = props;

    return (
        <FontAwesomeIcon icon={faSpinner}
            className={`${styles.spinner} ${className}`}
        />
    );
};

export default Spinner;