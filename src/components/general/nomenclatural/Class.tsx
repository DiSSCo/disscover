/* Import Types */
import { ReactElement } from "react";


/* Props Typing */
interface Props {
    classProp: string
};


const Class = (props: Props) => {
    const { classProp } = props;

    /* Base variables */
    let classElement: ReactElement;

    /* Format Class according to Nomenclatural Rules */
    classElement = <span> {classProp ?? 'undefined'} </span>

    return classElement;
}

export default Class;