/* Import Dependencies */


/* Import Types */
import { Dict } from "app/Types";

/* Import Components */
import MASCard from "./MASCard";


/* Props Type */
type Props = {
    masJobRecords: Dict[]
};


/**
 * Component that renders the MAS overview in the MAS menu
 * @returns JSX Component
 */
const MASOverview = (props: Props) => {
    const { masJobRecords } = props;

    

    return (
        <div>

        </div>
    );
};

export default MASOverview;