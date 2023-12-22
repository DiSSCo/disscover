/* Import Dependencies */
import axios from 'axios';


const GetPhylopicIcon = async (phylopicBuild: string, taxonomyIdentification?: string) => {
    let taxonomyIconUrl: string = '';

    let endpoint: string = '/nodes';

    if (taxonomyIdentification) {
        try {
            const phylopicSearchResponse = await axios({
                method: "get",
                baseURL: 'https://api.phylopic.org',
                url: endpoint,
                responseType: 'json',
                params: {
                    build: phylopicBuild,
                    filter_name: taxonomyIdentification.toLowerCase(),
                    page: 0,
                    embed_items: true,
                    embed_primaryImage: true
                },
                headers: {
                    Accept: 'application/vnd.phylopic.v2+json'
                }
            });

            /* Get result data from JSON */
            taxonomyIconUrl = phylopicSearchResponse.data._embedded.items[0]._embedded.primaryImage._links.sourceFile.href;
        } catch (_error) {
            return;
        }
    }

    return taxonomyIconUrl;
}

export default GetPhylopicIcon;