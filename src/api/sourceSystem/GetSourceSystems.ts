/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { SourceSystem, JSONResult } from "app/Types";


/**
 * Function for fetching all source systems from the orchestration API
 * @returns Array containing all found source system records
 */
const GetSourceSystems = async () => {
    const sourceSystems = <SourceSystem[]>[];

    const endPoint = "/source-system"

    try {
        const result = await axios({
            method: "get",
            baseURL: 'https://orchestration.dissco.tech/api/v1',
            url: endPoint,
            params: {
                pageSize: 50
            },
            responseType: 'json'
        });

        const data: JSONResult = result.data;

        console.log(data);

        /* Push each source system record to the source systems array */
        // Object.values(data).forEach((sourceSystem) => {
        //     sourceSystems.push(sourceSystem);
        // });
    } catch (error) {
        console.warn(error);
    }

    return sourceSystems;
}

export default GetSourceSystems;