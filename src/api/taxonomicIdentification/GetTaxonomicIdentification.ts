/* Import Dependencies */
import { DefaultException } from 'app/Exceptions';
import axios from 'axios';

const GetTaxonomicIdentification = async ({rank, value}: {rank?: string, value: string}) => {
    let taxonomicResults;
    let url;

    if (rank) {
        url = `https://api.checklistbank.org/dataset/3/nameusage/search?q=${value}&rank=${rank}&type=prefix&limit=500`;
    } else {
        url = `https://api.checklistbank.org/dataset/3/nameusage/search?q=${value}&type=prefix&limit=500`;
    }

    try {
        const result = await axios({
            method: 'get',
            url: url,
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