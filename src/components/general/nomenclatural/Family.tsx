/* Import Dependencies */
import { Capitalize } from "app/Utilities";

/* Import Types */
import { ReactElement } from "react";


/* Props Typing */
interface Props {
    family: string
};


const Family = (props: Props) => {
    const { family } = props;

    /* Base variables */
    let familyElement: ReactElement;

    /* Format Family according to Nomenclatural Rules */
    familyElement = <span> {family ? Capitalize(family) : 'undefined'} </span>

    return familyElement;
}

export default Family;