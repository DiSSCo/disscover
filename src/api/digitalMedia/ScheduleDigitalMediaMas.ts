/* Import Dependencies */
import axios from 'axios';
import KeycloakService from 'app/Keycloak';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Import Exceptions */
import { PostException } from 'app/Exceptions';

/* Import Types */
import { JSONResultArray, Dict } from 'app/Types';


/**
 * Function for posting a scheduling job for scheduling MASs for the digital specimen
 * @param handle The identifier of the digital media item to schedule MASs for
 * @param masList A list of MASs to be scheduled
 * @returns Array of scheduled MASs
 */
const ScheduleDigitalMediaMas = async ({ handle, masList }: { handle: string, masList: { masId: string }[] }) => {
    let digitalMediaMas: Dict = {};

    if (handle) {
        const token = KeycloakService.GetToken();

        const masRecord: {
            data: {
                type: 'MasRequest',
                attributes: {
                    mass: {
                        masId: string
                    }[]
                }
            }
        } = {
            data: {
                type: 'MasRequest',
                attributes: {
                    mass: masList
                }
            }
        };

        try {
            const result = await axios({
                method: 'post',
                url: `digital-media/${handle.replace(RetrieveEnvVariable('DOI_URL'), '')}/mas`,
                responseType: 'json',
                data: masRecord,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            /* Set Specimen MAS */
            const data: JSONResultArray = result.data;

            digitalMediaMas = data.data[0].attributes;
        } catch (error: any) {
            throw PostException('Machine Annotation Services', error.request.responseURL);
        };
    };

    return digitalMediaMas;
};

export default ScheduleDigitalMediaMas;