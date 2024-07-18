/* Import Components */
import { Popover, OverlayTrigger } from "react-bootstrap";

/* Import Types */
import { Placement } from "react-bootstrap/esm/types";

/* Import Styles */
import styles from './tooltip.module.scss';


/* Props Typing */
interface Props {
    text: string,
    placement: Placement,
    children: React.ReactElement,
};


/**
 * Component that renders a custom tooltip that helps giving hints of information to users
 * @param text The text that will appear in the tooltip
 * @param placement The relative position of the tooltip to the bounding component, options are: top, right, bottom or left
 * @returns JSX Component
 */
const Tooltip = (props: Props) => {
    const { text, placement, children } = props;

    const tooltip = (
        <Popover className={`${styles.tooltip} tc-white text-center px-2 py-1`}>
            {text}
        </Popover>
    );

    return (
        <OverlayTrigger placement={placement}
            overlay={tooltip}
        >
            {children}
        </OverlayTrigger>
    );
};

export default Tooltip;