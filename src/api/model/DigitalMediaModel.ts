/* Import Types */
import { DigitalMedia as DigitalMediaType, JSONResult } from "global/Types"


/* User Model for API calls */
const DigitalMediaModel = (data: JSONResult['data']) => {
    const digitalMedia: DigitalMediaType = {
        id: data.id,
        created: data.attributes.created,
        data: data.attributes.data,
        digitalSpecimenId: data.attributes.digitalSpecimenId,
        ...(data.attributes.format && {format: data.attributes.format}),
        mediaUrl: data.attributes.mediaUrl,
        originalData: data.attributes.originalData,
        sourceSystemId: data.attributes.sourceSystemId,
        type: data.attributes.type,
        version: data.attributes.version
    }

    return digitalMedia;
}

export default DigitalMediaModel;