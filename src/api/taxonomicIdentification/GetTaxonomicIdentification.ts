/* Import Dependencies */
import { DefaultException } from 'app/Exceptions';
import axios from 'axios';

const GetTaxonomicIdentification = async ({rank, value}: {rank: string, value: string}) => {
    let taxonomicResults;

    try {
        const result = await axios({
            method: 'get',
            url: `https://api.checklistbank.org/dataset/COL2022/nameusage/search?q=${value}&rank=${rank}&type=prefix&limit=500`,
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