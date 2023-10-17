/* Import Types */
import { ReactElement } from "react";
import { DigitalSpecimen } from "app/Types";


/* Props Typing */
interface Props {
    specimen: DigitalSpecimen
};


const ScientificName = (props: Props) => {
    const { specimen } = props;

    /* Base variables */
    let scientificNameElement: ReactElement;

    /* Format Scientific Name according to Nomenclatural Rules */
    scientificNameElement = <span className="fst-italic"> {specimen['ods:specimenName']} </span>

    return scientificNameElement;
}

export default ScientificName;