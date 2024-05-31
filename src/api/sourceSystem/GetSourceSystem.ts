/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { SourceSystem } from 'app/Types';


const GetSourceSystem = async (handle: string) => {
    if (handle) {
        let sourceSystem = {} as SourceSystem;

        let endPoint: string = `source-system/${handle}`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                baseURL: `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/v1`.replace('dev', 'dev-orchestration').replace('sandbox', 'orchestration'),
                responseType: 'json'
            });

            sourceSystem = result.data;
        } catch (error) {
            console.warn(error);
        }

        return sourceSystem;
    }
}

export default GetSourceSystem;