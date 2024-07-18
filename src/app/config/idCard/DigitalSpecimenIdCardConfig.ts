/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";


/**
 * Config function for creating the ID card on the digital specimen page
 */
const DigitalSpecimenIdCardConfig = ({ digitalSpecimen }: { digitalSpecimen: DigitalSpecimen }): {
    label: string,
    jsonPath: string,
    link?: string
}[] => {
    const idCardFields: {
        label: string,
        jsonPath: string,
        link?: string
    }[] = [
            {
                label: 'Specimen name',
                jsonPath: "$['ods:specimenName']"
            },
            {
                label: `Physical specimen ID (${digitalSpecimen["ods:physicalSpecimenIDType"]})`,
                jsonPath: "$['ods:normalisedPhysicalSpecimenID']",
                link: "$['ods:normalisedPhysicalSpecimenID']"
            },
            {
                label: 'Specimen provider',
                jsonPath: "$['ods:institutionName']",
                link: "$['dwc:institutionID']"
            },
            {
                label: 'In collection',
                jsonPath: "$['dwc:collectionCode']"
            },
            {
                label: 'Topic discipline',
                jsonPath: "$['ods:topicDiscipline']"
            },
            {
                label: 'Basis of record',
                jsonPath: "$['dwc:basisOfRecord']"
            },
            {
                label: 'Living or preserved',
                jsonPath: "$['ods:livingOrPreserved']"
            },
            {
                label: 'Licence',
                jsonPath: "$['dcterms:license']"
            },
            {
                label: 'Source system',
                jsonPath: "$['ods:sourceSystemID']"
            }
        ];

    return idCardFields;
};

export default DigitalSpecimenIdCardConfig;