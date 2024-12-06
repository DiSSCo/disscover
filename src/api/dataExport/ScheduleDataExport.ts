/* Import Dependencies */
import axios from 'axios';
import KeycloakService from 'app/Keycloak';

/* Import Exceptions */
import { PostException } from 'app/Exceptions';


/**
 * Function for posting a scheduling job for a data export based upon the provided key and value
 * @param targetType Type of the digital object targeted for data export
 * @param exportType The type of the export job
 * @param dataExportKey The key of the property to execute the data export for
 * @param dataExportValue The value which should be used together with the key to create the data export
 * @returns Boolean indicating if the download request was succesfull
 */
const ScheduleDataExport = async ({ targetType, exportType, dataExportKey, dataExportValue }:
    { targetType: string, exportType?: string, dataExportKey?: string, dataExportValue?: string }
) => {
    let success: boolean = false;

    if (targetType && exportType && dataExportKey && dataExportValue) {
        const token = KeycloakService.GetToken();

        const exportJob: {
            data: {
                type: 'export-job',
                attributes: {
                    searchParams: {
                        inputField: string,
                        inputValue: string
                    }[],
                    targetType: string,
                    exportType: string
                }
            }
        } = {
            data: {
                type: 'export-job',
                attributes: {
                    searchParams: [
                        {
                            inputField: dataExportKey,
                            inputValue: dataExportValue
                        }
                    ],
                    targetType,
                    exportType
                }
            }
        };

        try {
            await axios({
                method: 'post',
                url: `data-export/schedule`,
                responseType: 'json',
                data: exportJob,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            success = true;
        } catch (error: any) {
            throw PostException('Machine Annotation Services', error.request.responseURL);
        };
    };

    return success;
};

export default ScheduleDataExport;