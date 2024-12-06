/* Import Dependencies */
import { Link } from "react-router-dom";


/**
 * Component that renders the dataset disclaimer for on the homepage
 * @returns JSX Component
 */
const DatasetDisclaimer = () => {
    return (
        <div>
            <p className="fs-5 fst-italic">
                Disclaimer: This version has only a limited set of data and minimum functionality.
                However the available digital specimen DOIs are ready to use in references,
                the MIDs level can be used and available annotation functions to improve or enrich the available data are operational. 
                <Link to="/about" className="tc-accent"> More information </Link>.
            </p>
        </div>
    );
};

export default DatasetDisclaimer;