/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResultArray, Dict } from 'app/Types';


const GetUserMachineJobRecords = async (token: string | undefined, pageSize: number, pageNumber: number) => {
    let userMachineJobRecords: Dict[] = [];
    let links: Dict = {};

    if (token) {
        const endPoint: string = `/users/mjr`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json',
                params: {
                    pageSize: pageSize,
                    pageNumber: pageNumber ? pageNumber : 1
                },
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            /* Set User Machine Job Records */
            const data: JSONResultArray = result.data;
            
            userMachineJobRecords = data.data;
            links = data.links;
        } catch (error) {
            console.warn(error);
        }
    }

    return {
        machineJobRecords: userMachineJobRecords,
        links: links
    };
}

export default GetUserMachineJobRecords;