/* Import Dependencies */
import axios from 'axios';
import KeycloakService from 'app/Keycloak';

/* Import Exceptions */
import { PostException } from 'app/Exceptions';

/* Import Types */
import { JSONResultArray, Dict } from 'app/Types';


/**
 * Function for posting a scheduling job for scheduling MASs for the digital specimen
 * @param handle The identifier of the digital specimen to schedule MASs for
 * @param masList A list of MASs to be scheduled
 * @returns Array of scheduled MASs
 */
const ScheduleDigitalSpecimenMAS = async ({ handle, masList }: { handle: string, masList: { masId: string }[] }) => {
    let digitalSpecimenMAS: Dict = {};

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
                url: `digital-specimen/${handle.replace(import.meta.env.VITE_DOI_URL, '')}/mas`,
                responseType: 'json',
                data: masRecord,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            /* Set Specimen MAS */
            const data: JSONResultArray = result.data;

            digitalSpecimenMAS = data.data[0].attributes;
        } catch (error: any) {
            throw PostException('Machine Annotation Services', error.request.responseURL);
        };
    };

    return digitalSpecimenMAS;
};

export default ScheduleDigitalSpecimenMAS;