/* Import Dependencies */
import { Capitalize } from "app/Utilities";

/* Import Types */
import { ReactElement } from "react";
import { DigitalSpecimen } from "app/Types";


/* Props Typing */
interface Props {
    specimen: DigitalSpecimen
};


const Genus = (props: Props) => {
    const { specimen } = props;

    /* Base variables */
    let genusElement: ReactElement;

    /* Format Scientific Name according to Nomenclatural Rules */
    genusElement = <span className="fst-italic"> {Capitalize(/*specimen.data['dwc:genus']*/ '')} </span>

    return genusElement;
}

export default Genus;