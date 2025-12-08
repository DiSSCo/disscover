/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';

const GetSpecificVirtualCollection = async({ identifier }: { identifier: string }) => {
    const endPoint = `virtual-collection/v1/${identifier}`;

    try {
        const result = await axios({
            method: 'get',
            url: endPoint,
            responseType: 'json'
        });

        /* Get result data from JSON */
        const data: JSONResult = result.data.data;
        return data;

    } catch (error: any) {
        throw(NotFoundException('This virtual collection is not found', error.request.responseURL));
    };
}

export default GetSpecificVirtualCollection;