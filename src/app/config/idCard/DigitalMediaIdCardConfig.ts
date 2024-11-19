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
            jsonPath: digitalSpecimenEntityRelationshipIndex ? `$['ods:hasEntityRelationships'][${digitalSpecimenEntityRelationshipIndex}]['dwc:relatedResourceID']` : "$['@id']"
        },
        {
            label: 'Title',
            jsonPath: "$['dcterms:title']"
        },
        {
            label: 'Description',
            jsonPath: "$['dcterms:description']"
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