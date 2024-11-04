/* Import Dependencies */
import axios from 'axios';


/**
 * Function to look up and fetch a Phylopic icon from the Phylopic API
 * @param phylopicBuild The required build version of the Phylopic API
 * @param taxonomyIdentification A string representing the taxonomic identification query to search by in Phylopic
 * @returns String containing the icon url if found
 */
const GetPhylopicIcon = async (phylopicBuild: number, taxonomyIdentification?: string) => {
    /* Base variables */
    let taxonomyIconUrl: string | undefined;

    if (taxonomyIdentification) {
        try {
            const phylopicSearchResponse = await axios({
                method: "get",
                baseURL: 'https://api.phylopic.org',
                url: '/nodes',
                responseType: 'json',
                params: {
                    build: phylopicBuild || '385',
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
            taxonomyIconUrl = '';
        };
    };

    return taxonomyIconUrl;
};

export default GetPhylopicIcon;