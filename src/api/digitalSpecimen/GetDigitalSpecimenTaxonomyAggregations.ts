/* Import Dependencies */
import axios from 'axios';

/* Import Utilities */
import { GetTaxonomicLevels } from 'app/utilities/TaxonomicUtilities';

/* Import Types */
import { JSONResult, SearchFilters, Dict } from 'app/Types';

/* Import Exceptions */
import { DefaultException } from 'app/Exceptions';


/**
 * Function to fetch the Digital Specimen Aggregations from the API
 * @param searchFilters 
 * @returns 
 */
const GetDigitalSpecimenTaxonomyAggregations = async ({ searchFilters }: { searchFilters?: SearchFilters }) => {
    let taxonomyAggregations: Dict | undefined;

    /* Destructure search filters into string */
    const taxonomicLevels: string[] = GetTaxonomicLevels();
    let filters: string = '';

    if (searchFilters) {
        /* For each filter */
        Object.entries(searchFilters).filter(([key]) => taxonomicLevels.includes(key)).map(([key, values], index) => {
            /* Apply each value if value is relevant to taxonomy */
            if (taxonomicLevels.includes(key)) {
                values.forEach((value, valueIndex) => {
                    filters = filters.concat(`${(index > 0 || valueIndex > 0) ? '&' : '?'}${key}=${encodeURIComponent(value)}`);
                });
            };
        });
    };

    try {
        const result = await axios({
            method: 'get',
            url: `/digital-specimen/v1/taxonomy/aggregation${filters}`,
            responseType: 'json'
        });

        /* Set aggregations */
        const data: JSONResult = result.data;

        taxonomyAggregations = data.data.attributes;
    } catch (error: any) {
        throw (DefaultException('Digital Specimen Taxonomy Aggregations', error.request.responseURL));
    };

    return taxonomyAggregations;
};

export default GetDigitalSpecimenTaxonomyAggregations;