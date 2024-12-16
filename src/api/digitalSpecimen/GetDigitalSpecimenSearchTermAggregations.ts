/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult } from 'app/Types';

/* Import Exceptions */
import { NotFoundException } from 'app/Exceptions';


/**
 * Function to fetch the Digital Specimen Aggregations from the API
 * @param searchFilters 
 * @returns 
 */
const GetDigitalSpecimenSearchTermAggregations = async ({ searchFilterName, value }:
    { searchFilterName: string, value: string }
) => {
    let searchTermAggregations: {
        [searchFilterName: string]: {
            [aggregation: string]: number
        }
    } | undefined;

    try {
        const result = await axios({
            method: 'get',
            url: "/digital-specimen/v1/searchTermValue",
            params: {
                term: searchFilterName,
                value: encodeURIComponent(value)
            },
            responseType: 'json'
        });

        /* Set search term aggregations */
        const data: JSONResult = result.data;

        searchTermAggregations = data.data.attributes;
    } catch (error: any) {
        throw (NotFoundException(`Digital Specimen Aggregations with Search Filter: ${searchFilterName}, and value: ${value}`, error.request.responseURL));
    }

    return searchTermAggregations;
};

export default GetDigitalSpecimenSearchTermAggregations;