/* Import Components */
import { Tooltip as BootstrapTooltip, OverlayTrigger } from "react-bootstrap";

/* Import Types */
import { Placement } from "react-bootstrap/esm/types";


/* Props Typing */
interface Props {
    text: string,
    children: React.ReactElement,
    placement: Placement
};


const Tooltip = (props: Props) => {
    const { text, children, placement } = props;

    const tooltip = (
        <BootstrapTooltip>
            {text}
        </BootstrapTooltip>
    );

    return (
        <OverlayTrigger placement={placement} overlay={tooltip}>
            {children}
        </OverlayTrigger>
    );
}

export default Tooltip;