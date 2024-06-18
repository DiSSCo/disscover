/* Import Dependencies */
import classNames from 'classnames';

/* Import Styles */
import styles from './button.module.scss';


/* Props Type */
interface Props {
    children?: string | JSX.Element,
    type: 'button' | 'submit',
    variant: 'primary' | 'secondary' | 'blank',
    className?: string,
    OnClick?: Function
};


/** Component that renders a custom button according to the appliation's style
    * @param children String to be placed in button
    * @param type The type of the button, e.g. 'button' or 'submit'
    * @param variant The variant of the button, impacts styling
    * @param className Additional class names to be added to the button
    * @param OnClick The event to be fired when clicking on the button
*/
const Button = (props: Props) => {
    const { children, type, variant, className, OnClick } = props;

    /* ClassNames */
    const buttonClass = classNames({
        [`${className}`]: className,
        'fw-bold': variant !== 'blank',
        'fs-4': !className?.includes('fs'),
        'py-2': !className?.includes('py'),
        'px-4': !className?.includes('py')
    });

    return (
        <button type={type}
            className={`${styles.button} ${styles[variant]} ${buttonClass} b-none br-round`}
            onClick={() => OnClick?.()}
        >
            {children}
        </button>
    );
};

export default Button;