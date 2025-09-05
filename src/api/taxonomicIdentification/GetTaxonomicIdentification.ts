/* Import Dependencies */
import { DefaultException } from 'app/Exceptions';
import axios from 'axios';

/* Import types */
import { TaxonomicIdentificationItem } from 'app/Types';

const GetTaxonomicIdentification = async ({rank, value}: {rank?: string, value: string}): Promise<TaxonomicIdentificationItem[]> => {
    let taxonomicResults: TaxonomicIdentificationItem[] = [];
    let endpoint: string;

    if (rank) {
        endpoint = `https://api.checklistbank.org/dataset/3/nameusage/search?q=${value}&rank=${rank}&type=prefix&limit=500`;
    } else {
        endpoint = `https://api.checklistbank.org/dataset/3/nameusage/search?q=${value}&content=SCIENTIFIC_NAME&type=prefix&limit=500`;
    }

    try {
        const result = await axios({
            method: 'get',
            url: endpoint,
            responseType: 'json'
        });

        const data = result.data.result;

        taxonomicResults = data;
    } catch (error: any) {
        throw (DefaultException('Digital Specimen Taxonomy Identification', error.request.responseURL));
    };

    return taxonomicResults;
}

export default GetTaxonomicIdentification;