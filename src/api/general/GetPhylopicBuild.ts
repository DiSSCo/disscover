/* Import Dependencies */
import axios from 'axios';


const GetPhylopicBuild = async () => {
    let phylopicBuild: string = '';

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
        console.warn(error);
    }

    return phylopicBuild;
}

export default GetPhylopicBuild;