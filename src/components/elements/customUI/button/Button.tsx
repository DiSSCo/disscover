/* Import Dependencies */
import classNames from 'classnames';

/* Import Styles */
import styles from './button.module.scss';


/* Props Type */
interface Props {
    children?: string | JSX.Element,
    type: 'button' | 'submit',
    variant: 'primary' | 'secondary' | 'accent' | 'grey' | 'blank',
    disabled?: boolean,
    className?: string,
    OnClick?: Function,
    dataTestId?: string
};


/** Component that renders a custom button according to the appliation's style
    * @param children Children elements to be placed in button
    * @param type The type of the button, e.g. 'button' or 'submit'
    * @param variant The variant of the button, impacts styling
    * @param disabled A boolean that indicates if the button should be disabled
    * @param className Additional class names to be added to the button
    * @param OnClick The event to be fired when clicking on the button
    * @param dataTestId Unique id of this button to target it in integration tests
*/
const Button = (props: Props) => {
    const { children, type, variant, disabled, className, OnClick, dataTestId } = props;

    /* Class Names */
    const buttonClass = classNames({
        [`${className}`]: className,
        'fw-bold': variant !== 'blank',
        'fs-4': !className?.includes('fs'),
        'py-2': !className?.includes('py'),
        'px-4': !className?.includes('px'),
        'br-round': !className?.includes('br'),
        'b-none': !className?.includes('b-')
    });

    return (
        <button type={type}
            data-testid={dataTestId}
            disabled={disabled}
            className={`${styles.button} ${styles[variant]} ${buttonClass}`}
            onClick={() => OnClick?.()}
        >
            {children}
        </button>
    );
};

export default Button;