/* Import Dependencies */
import { Capitalize } from "global/Utilities";

/* Import Types */
import { ReactElement } from "react";
import { Specimen } from "global/Types";


/* Props Typing */
interface Props {
    specimen: Specimen
};


const Genus = (props: Props) => {
    const { specimen } = props;

    /* Base variables */
    let genusElement: ReactElement;

    /* Format Scientific Name according to Nomenclatural Rules */
    genusElement = <span className="fst-italic"> {Capitalize(specimen.data['dwc:genus'])} </span>

    return genusElement;
}

export default Genus;