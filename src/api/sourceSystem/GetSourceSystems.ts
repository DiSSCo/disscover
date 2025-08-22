/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { SourceSystem } from "app/types/SourceSystem";
import { JSONResultArray } from "app/Types";


/**
 * Function for fetching all source systems from the orchestration API
 * @returns Array containing all found source system records
 */
const GetSourceSystems = async () => {
    const sourceSystems = <SourceSystem[]>[];

    const endPoint = "/source-system/v1";

    try {
        const result = await axios({
            method: "get",
            baseURL: `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api`.replace('dev', 'dev-orchestration').replace('sandbox', 'acc.orchestration'),
            url: endPoint,
            params: {
                pageSize: 50
            },
            responseType: 'json'
        });

        const data: JSONResultArray = result.data;

        /* Push each source system record to the source systems array */
        data.data.forEach((dataFragment) => {
            sourceSystems.push(dataFragment.attributes as SourceSystem);
        });
    } catch (error) {
        console.warn(error);
    }

    return sourceSystems;
}

export default GetSourceSystems;