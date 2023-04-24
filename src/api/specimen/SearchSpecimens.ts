/* Import Dependencies */
import axios from 'axios';

/* Import Model */
import SpecimenModel from 'api/model/SpecimenModel';

/* Import Types */
import { Specimen, SearchFilter, JSONResultArray } from 'global/Types';


const SearchSpecimens = async (searchFilters: SearchFilter[], pageSize: number, pageNumber?: number) => {
    /* Destructure Search Filters into string */
    let filters: string = '';

    searchFilters.forEach((filter, index) => {
        const filterName = Object.keys(filter)[0];
        const filterValue = Object.values(filter)[0];

        if (index > 0) {
            filters = filters.concat(`&${filterName}=${filterValue}`);
        } else {
            filters = filters.concat(`${filterName}=${filterValue}`);
        }
    });

    /* Execute call */
    let searchResults = [] as Specimen[];

    if (filters) {
        const endPoint = `specimens/search?${filters}`;

        const params = {
            pageSize: pageSize,
            pageNumber: pageNumber ? pageNumber : 1
        };

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                params: params,
                responseType: 'json'
            });

            /* Set Specimens with Model */
            const data: JSONResultArray = result.data;

            data.data.forEach((dataRow) => {
                const specimen = SpecimenModel(dataRow);

                searchResults.push(specimen);
            });
        } catch (error) {
            console.warn(error);
        }
    }

    return searchResults;
}

export default SearchSpecimens;