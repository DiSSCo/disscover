/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { SourceSystem } from 'global/Types';


const GetSourceSystem = async (handle: string) => {
    if (handle) {
        let sourceSystem = {} as SourceSystem;

        let endPoint: string = `source-system/${handle}`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                baseURL: 'https://orchestration.dissco.tech',
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