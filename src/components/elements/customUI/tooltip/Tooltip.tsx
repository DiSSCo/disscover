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
    active?: boolean,
    children: React.ReactElement,
};


/**
 * Component that renders a custom tooltip that helps giving hints of information to users
 * @param text The text that will appear in the tooltip
 * @param placement The relative position of the tooltip to the bounding component, options are: top, right, bottom or left
 * @param active Boolean indicating if the the tooltip should be active and show upon hover
 * @returns JSX Component
 */
const Tooltip = (props: Props) => {
    const { text, placement, active, children } = props;

    const tooltip = (
        <Popover className={`${styles.tooltip} tc-white text-center px-2 py-1`}>
            {text}
        </Popover>
    );

    if ((typeof (active) === 'undefined' || active)) {
        return (
            <OverlayTrigger placement={placement}
                overlay={tooltip}
            >
                {children}
            </OverlayTrigger>
        );
    } else {
        return children;
    }
};

export default Tooltip;