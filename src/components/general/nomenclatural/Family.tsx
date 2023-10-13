/* Import Dependencies */
import { Capitalize } from "global/Utilities";

/* Import Types */
import { ReactElement } from "react";
import { Specimen } from "global/Types";


/* Props Typing */
interface Props {
    specimen: Specimen
};


const Family = (props: Props) => {
    const { specimen } = props;

    /* Base variables */
    let familyElement: ReactElement;

    /* Format Scientific Name according to Nomenclatural Rules */
    familyElement = <span> {Capitalize(specimen.data['dwc:family'])} </span>

    return familyElement;
}

export default Family;