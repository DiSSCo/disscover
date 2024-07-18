/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, SearchFilters, Dict } from 'app/Types';

/* Import Exceptions */
import { DefaultException } from 'app/Exceptions';


/**
 * Function to fetch the Digital Specimen Aggregations from the API
 * @param searchFilters 
 * @returns 
 */
const GetDigitalSpecimenAggregations = async ({ searchFilters }: { searchFilters?: SearchFilters }) => {
    let aggregations: Dict | undefined;

    /* Destructure search filters into string */
    let filters: string = '';

    if (searchFilters) {
        /* For each filter */
        Object.entries(searchFilters).map(([key, values], index) => {
            /* Apply each value */
            values.forEach((value, valueIndex) => {
                filters = filters.concat(`${(index > 0 || valueIndex > 0) ? '&' : '?'}${key}=${value}`);
            });
        });
    };

    try {
        const result = await axios({
            method: 'get',
            url: `/digital-specimen/aggregation${filters}`,
            responseType: 'json'
        });

        /* Set aggregations */
        const data: JSONResult = result.data;

        aggregations = data.data.attributes;
    } catch (error: any) {
        throw (DefaultException('Digital Specimen Aggregations', error.request.responseURL));
    };

    return aggregations;
};

export default GetDigitalSpecimenAggregations;