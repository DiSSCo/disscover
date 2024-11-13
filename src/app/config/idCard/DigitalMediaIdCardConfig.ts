/* Import Types */
import { DigitalMedia } from "app/types/DigitalMedia";


/**
 * Config function for creating the ID card on the digital media page
 */
const DigitalMediaIdCardConfig = ({ digitalMedia }: { digitalMedia: DigitalMedia }): {
    label: string,
    jsonPath: string,
    link?: string
}[] => {
    const digitalSpecimenEntityRelationshipIndex: number | undefined = digitalMedia["ods:hasEntityRelationships"]?.findIndex(
        entityRelationship => entityRelationship['dwc:relationshipOfResource'] === 'hasDigitalSpecimen'
    );

    return [
        {
            label: 'Digital Specimen Identifier',
            jsonPath: digitalSpecimenEntityRelationshipIndex ? `$['ods:hasEntityRelationship'][${digitalSpecimenEntityRelationshipIndex}]['dwc:relatedResourceID']` : "$['@id']"
        },
        {
            label: 'Media URL',
            jsonPath: "$['ac:accessURI']",
            link: "$['ac:accessURI']"
        },
        {
            label: 'Format',
            jsonPath: "$['dcterms:format']"
        },
        {
            label: 'Type',
            jsonPath: "$['dcterms:type']"
        },
        {
            label: 'Source System',
            jsonPath: "$['ods:sourceSystemName']",
            link: "$['ods:sourceSystemID']"
        },
        {
            label: 'Organisation',
            jsonPath: "$['ods:organisationName']",
            link: "$['ods:organisationID']"
        },
        {
            label: 'Creator',
            jsonPath: "$['hasAgents']"
        },
        {
            label: 'Rights',
            jsonPath: "$['dcterms:rights']"
        }
    ];
};

export default DigitalMediaIdCardConfig;