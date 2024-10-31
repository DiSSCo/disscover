/* Import Dependencies */
import axios from 'axios';


/**
 * Function to look up and fetch the Phylopic build
 * @returns Number representing the Phylopic build
 */
const GetPhylopicBuild = async () => {
    /* Base variables */
    let phylopicBuild: number | undefined;

    try {
        const response = await axios({
            method: "get",
            baseURL: 'https://api.phylopic.org',
            url: '/',
            responseType: 'json',
            headers: {
                Accept: 'application/vnd.phylopic.v2+json'
            }
        });

        /* Get result data from JSON */
        phylopicBuild = response.data.build;
    } catch (error) {
        console.error(error);
    }
    return phylopicBuild;
};

export default GetPhylopicBuild;