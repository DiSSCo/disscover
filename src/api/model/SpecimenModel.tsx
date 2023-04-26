/* Import Types */
import { Specimen as SpecimenType, JSONResult } from 'global/Types';


/* User Model for API calls */
const SpecimenModel = (data: JSONResult['data']) => {
    const specimen: SpecimenType = {
        id: data.id,
        created: data.attributes.created,
        data: data.attributes.data,
        dwcaId: data.attributes.dwcaId,
        midsLevel: data.attributes.midsLevel,
        organisationId: data.attributes.organisationId,
        originalData: data.attributes.originalData,
        physicalSpecimenCollection: data.attributes.physicalSpecimenCollection,
        physicalSpecimenId: data.attributes.physicalSpecimenId,
        physicalSpecimenIdType: data.attributes.physicalSpecimenIdType,
        sourceSystemId: data.attributes.sourceSystemId,
        specimenName: data.attributes.specimenName,
        version: data.attributes.version,
        type: data.attributes.type
    }

    return specimen;
}

export default SpecimenModel;