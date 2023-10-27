/* Import Types */
import { ReactElement } from "react";


/* Props Typing */
interface Props {
    order: string
};


const Order = (props: Props) => {
    const { order } = props;

    /* Base variables */
    let orderElement: ReactElement;

    /* Format Order according to Nomenclatural Rules */
    orderElement = <span> {order ?? ''} </span>

    return orderElement;
}

export default Order;