/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { JSONResult, SearchFilter, Dict } from 'app/Types';


const GetSpecimenAggregations = async (searchFilters?: SearchFilter[]) => {
    let aggregations = {} as Dict;
    let endPoint: string = 'specimens/aggregation';

    /* If present, destructure Search Filters into string */
    let filters: string = '';

    if (searchFilters) {
        searchFilters.forEach((filter, index) => {
            const filterName = Object.keys(filter)[0];
            const filterValue = Object.values(filter)[0];

            if (index > 0) {
                filters = filters.concat(`&${filterName}=${filterValue}`);
            } else {
                filters = filters.concat(`${filterName}=${filterValue}`);
            }
        });

        endPoint = endPoint.concat(`?${filters}`);
    }

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        /* Set Aggregations */
        const data: JSONResult = result.data;

        aggregations = data.data.attributes;
    } catch (error) {
        console.warn(error);
    }

    return aggregations;
}

export default GetSpecimenAggregations;