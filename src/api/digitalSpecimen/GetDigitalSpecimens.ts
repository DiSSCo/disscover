/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { SearchFilters, JSONResultArray, Dict } from 'app/Types';

/* Import Exceptions */
import { NoSearchResults } from 'app/Exceptions';


/**
 * Function for fetching specimens by criteria delivered as search filters
 * @param pageSize The size as in the number of records returned per page
 * @param pageNumber The number of the requested page
 * @param searchFilters The search filters to pass along as criteria for results
 * @returns Object containing the found digital specimens, associated links and metadata
 */
const GetDigitalSpecimens = async ({ pageSize, pageNumber, searchFilters }:
    { searchFilters?: SearchFilters, pageSize: number, pageNumber?: number }
) => {
    const returnData: {
        digitalSpecimens: DigitalSpecimen[],
        links?: Dict,
        metadata?: Dict
    } = {
        digitalSpecimens: []
    };

    /* Destructure search filters into string */
    let filters: string = '';

    if (searchFilters) {
        /* For each filter */
        Object.entries(searchFilters).forEach(([key, values], index) => {
            /* Apply each value */
            values.forEach((value, valueIndex) => {
                filters = filters.concat(`${(index > 0 || valueIndex > 0) ? '&' : '?'}${key}=${encodeURIComponent(value)}`);
            });
        });
    };

    try {
        const result = await axios({
            method: 'get',
            url: `digital-specimen/v1/search${filters}`,
            params: {
                pageSize,
                pageNumber: pageNumber ?? 1
            },
            responseType: 'json'
        });

        const data: JSONResultArray = result.data; // Set return data

        data.data.forEach((dataRow) => {
            returnData.digitalSpecimens.push(dataRow.attributes as DigitalSpecimen);
        });

        returnData.links = data.links;

        if (data.meta) {
            returnData.metadata = data.meta;
        };

    } catch (error: any) {
        throw (NoSearchResults('Digital Specimen', error.request.responseURL));
    };

    return returnData;
};

export default GetDigitalSpecimens;