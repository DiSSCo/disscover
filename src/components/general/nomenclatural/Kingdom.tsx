/* Import Types */
import { ReactElement } from "react";


/* Props Typing */
interface Props {
    kingdom: string
};


const Kingdom = (props: Props) => {
    const { kingdom } = props;

    /* Base variables */
    let kingdomElement: ReactElement;

    /* Format Kingdom according to Nomenclatural Rules */
    kingdomElement = <span> {kingdom ?? ''} </span>

    return kingdomElement;
}

export default Kingdom;