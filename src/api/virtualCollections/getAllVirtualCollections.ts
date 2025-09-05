/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';

const getAllVirtualCollections = async() => {
    const endPoint = `virtual-collection/v1`;

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
        throw(NotFoundException('No virtual collections found', error.request.responseURL));
    };
}

export default getAllVirtualCollections;