/* Import Types */
import { ReactElement } from "react";


/* Props Typing */
interface Props {
    specimenName: string
};


const ScientificName = (props: Props) => {
    const { specimenName } = props;

    /* Base variables */
    let scientificNameElement: ReactElement;

    /* Format Scientific Name according to Nomenclatural Rules */
    scientificNameElement = <span> {specimenName} </span>

    return scientificNameElement;
}

export default ScientificName;