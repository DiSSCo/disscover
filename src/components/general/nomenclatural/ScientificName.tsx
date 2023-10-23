/* Import Types */
import { ReactElement } from "react";
import { DigitalSpecimen } from "app/Types";


/* Props Typing */
interface Props {
    specimenName: string
};


const ScientificName = (props: Props) => {
    const { specimenName } = props;

    /* Base variables */
    let scientificNameElement: ReactElement;

    /* Format Scientific Name according to Nomenclatural Rules */
    scientificNameElement = <span className="fst-italic"> {specimenName} </span>

    return scientificNameElement;
}

export default ScientificName;