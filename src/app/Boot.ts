/* Import Dependencies */
import KeycloakService from "./Keycloak";

/* Import Types */
import { Dict } from "./Types";

/* Import API */
import GetDigitalSpecimenAggregations from "api/digitalSpecimen/GetDigitalSpecimenAggregations";


/* Callback type */
type Callback = (bootState: {
    aggregations: Dict,
}) => Function | void;


/**
 * Function that runs the application's necessary processes before it can be booted
 * @returns True or false depening on if it has booted
 */
const Boot = (callback: Callback) => {
    /* Initiate keycloak which will render the root after finishing setting up */
    KeycloakService.InitKeyCloak(() => {
        const promises = [GetDigitalSpecimenAggregations({})];

        Promise.all(promises).then((results: Dict) => {
            callback({
                aggregations: results[0],
            });
        });
    });
};

export default Boot;