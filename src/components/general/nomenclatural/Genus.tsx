/* Import Dependencies */
import { Capitalize } from "app/Utilities";

/* Import Types */
import { ReactElement } from "react";


/* Props Typing */
interface Props {
    genus: string
};


const Genus = (props: Props) => {
    const { genus } = props;

    /* Base variables */
    let genusElement: ReactElement;

    /* Format Genus according to Nomenclatural Rules */
    genusElement = <span> {genus ? <span className="fst-italic"> {Capitalize(genus)} </span> : 'undefined'} </span>

    return genusElement;
}

export default Genus;