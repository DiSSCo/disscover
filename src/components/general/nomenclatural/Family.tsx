/* Import Dependencies */
import { Capitalize } from "app/Utilities";

/* Import Types */
import { ReactElement } from "react";
import { DigitalSpecimen } from "app/Types";


/* Props Typing */
interface Props {
    specimen: DigitalSpecimen
};


const Family = (props: Props) => {
    const { specimen } = props;

    /* Base variables */
    let familyElement: ReactElement;

    /* Format Scientific Name according to Nomenclatural Rules */
    familyElement = <span> {Capitalize(/*specimen['dwc:family']*/ '')} </span>

    return familyElement;
}

export default Family;