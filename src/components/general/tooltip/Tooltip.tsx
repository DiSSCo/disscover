/* Import Components */
import { Popover, OverlayTrigger } from "react-bootstrap";

/* Import Types */
import { Placement } from "react-bootstrap/esm/types";

/* Import Styles */
import styles from './styles.module.scss';


/* Props Typing */
interface Props {
    text: string,
    placement: Placement,
    children: React.ReactElement,
};


const Tooltip = (props: Props) => {
    const { text, placement, children } = props;

    const tooltip = (
        <Popover className={styles.tooltip}>
            {text}
        </Popover>
    );

    return (
        <OverlayTrigger placement={placement} overlay={tooltip}>
            {children}
        </OverlayTrigger>
    );
}

export default Tooltip;