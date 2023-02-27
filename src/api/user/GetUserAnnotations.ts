/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { Annotation } from 'global/Types';

/* Import API */
import GetSpecimen from 'api/specimen/GetSpecimen';


const GetUserAnnotations = async (token?: string) => {
    if (token) {
        let userAnnotations = <Annotation[]>[];

        const endPoint = 'annotations/creator';

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            userAnnotations = result.data;

            /* Temporary solution to include Specimen data */
            for (const index in userAnnotations) {
                const annotation = userAnnotations[index];

                GetSpecimen(annotation.target.id.replace("https://hdl.handle.net/", "")).then((specimen) => {
                    userAnnotations[index].specimen = specimen;
                });
            }
        } catch (error) {
            console.warn(error);
        }

        return userAnnotations;
    }
}

export default GetUserAnnotations;