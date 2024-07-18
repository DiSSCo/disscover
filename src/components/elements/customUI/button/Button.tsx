/* Import Dependencies */
import classNames from 'classnames';

/* Import Styles */
import styles from './button.module.scss';


/* Props Type */
interface Props {
    children?: string | JSX.Element,
    type: 'button' | 'submit',
    variant: 'primary' | 'secondary' | 'grey' | 'blank',
    disabled?: boolean,
    className?: string,
    OnClick?: Function
};


/** Component that renders a custom button according to the appliation's style
    * @param children Children elements to be placed in button
    * @param type The type of the button, e.g. 'button' or 'submit'
    * @param variant The variant of the button, impacts styling
    * @param disabled A boolean that indicates if the button should be disabled
    * @param className Additional class names to be added to the button
    * @param OnClick The event to be fired when clicking on the button
*/
const Button = (props: Props) => {
    const { children, type, variant, disabled, className, OnClick } = props;

    /* Class Names */
    const buttonClass = classNames({
        [`${className}`]: className,
        'fw-bold': variant !== 'blank',
        'fs-4': !className?.includes('fs'),
        'py-2': !className?.includes('py'),
        'px-4': !className?.includes('px')
    });

    return (
        <button type={type}
            disabled={disabled}
            className={`${styles.button} ${styles[variant]} ${buttonClass} b-none br-round`}
            onClick={() => OnClick?.()}
        >
            {children}
        </button>
    );
};

export default Button;