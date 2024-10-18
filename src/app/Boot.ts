/* Import Dependencies */
import { useState } from "react";

/* Import Hooks */
import { useAppDispatch, useFetch } from "./Hooks";

/* Import Store */
import { setBootState } from "redux-store/BootSlice";

/* Import Types */
import { Dict } from "./Types";

/* Import API */
import GetDigitalSpecimenAggregations from "api/digitalSpecimen/GetDigitalSpecimenAggregations";
import GetPhylopicBuild from "api/phylopic/GetPhylopicBuild";


/**
 * Function that runs the application's necessary processes before it can be booted
 * @returns True or false depening on if is has booted
 */
const Boot = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const fetch = useFetch();

    /* Base variables */
    const [booted, setBooted] = useState<boolean>(false);

    /* Fetch digital specimen aggregations */
    fetch.FetchMultiple({
        callMethods: [
            {
                alias: 'digitalSpecimenAggregations',
                params: {},
                Method: GetDigitalSpecimenAggregations
            },
            {
                alias: 'phylopicBuild',
                Method: GetPhylopicBuild
            }
        ],
        Handler: (results: Dict) => {
            console.log(results.digitalSpecimenAggregations);

            /* Set boot state */
            dispatch(setBootState({
                aggregations: results.digitalSpecimenAggregations ?? {},
                phylopicBuild: results.phylopicBuild
            }));

            /* End loading */
            setBooted(true);
        }
    });

    return booted;
};

export default Boot;