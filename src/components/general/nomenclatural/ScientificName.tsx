/* Import Types */
import { ReactElement } from "react";
import { Specimen } from "global/Types";


/* Props Typing */
interface Props {
    specimen: Specimen
};


const ScientificName = (props: Props) => {
    const { specimen } = props;

    /* Base variables */
    let scientificNameElement: ReactElement;

    /* Format Scientific Name according to Nomenclatural Rules */
    scientificNameElement = <span className="fst-italic"> {specimen.specimenName} </span>

    return scientificNameElement;
}

export default ScientificName;