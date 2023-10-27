/* Import Types */
import { ReactElement } from "react";


/* Props Typing */
interface Props {
    phylum: string
};


const Phylum = (props: Props) => {
    const { phylum } = props;

    /* Base variables */
    let phylumElement: ReactElement;

    /* Format Phylum according to Nomenclatural Rules */
    phylumElement = <span> {phylum ?? ''} </span>

    return phylumElement;
}

export default Phylum;