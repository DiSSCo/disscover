/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { Dict, JSONResultArray } from 'app/Types';

/* Import Exceptions */
import { NoSearchResults } from 'app/Exceptions';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

const GetAllVirtualCollectionItems = async({ pageSize, pageNumber, virtualCollectionID }:
    { pageSize: number, pageNumber?: number, virtualCollectionID: string }
) => {
    const returnData: {
        digitalSpecimens: DigitalSpecimen[],
        links?: Dict,
        metadata?: Dict
    } = {
        digitalSpecimens: []
    };
    try {
        const result = await axios({
            method: 'get',
            url: `digital-specimen/v1/search?virtualCollectionID=https://hdl.handle.net/${virtualCollectionID}`,
            params: {
                pageSize,
                pageNumber: pageNumber ?? 1
            },
            responseType: 'json'
        });

        /* Set return data */
        const data: JSONResultArray = result.data;

        if (data.data.length) {
            for (const dataRow of data.data) {
                returnData.digitalSpecimens.push(dataRow.attributes as DigitalSpecimen);
            }
        } else {
            throw (NoSearchResults('Virtual Collection Items', result.request.responseURL));
        };

        if (data.meta) {
            returnData.metadata = data.meta;
        };

        returnData.links = data.links;
        console.log(returnData);
    } catch (error: any) {
        throw (error);
    };

    return returnData;
}

export default GetAllVirtualCollectionItems;