/* Import Dependencies */
import { useState } from "react";

/* Import Hooks */
import { useAppDispatch, useFetch } from "./Hooks";

/* Import Store */
import { setBootState } from "redux-store/BootSlice";

/* Import API */
import GetDigitalSpecimenAggregations from "api/digitalSpecimen/GetDigitalSpecimenAggregations";


const Boot = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const fetch = useFetch();

    /* Base variables */
    const [booted, setBooted] = useState<boolean>(false);

    /* Fetch digital specimen aggregations */
    fetch.Fetch({
        Method: GetDigitalSpecimenAggregations,
        params: {},
        Handler: (digitalSpecimenAggregations: any) => {
            /* Set boot state */
            dispatch(setBootState({
                aggregations: digitalSpecimenAggregations ?? {}
            }));

            /* End loading */
            setBooted(true);
        }
    });

    return booted;
};

export default Boot;