/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { Dict } from "app/Types"


/* Utilities associated with the nomenclatural rules */

/**
 * Function to find and determine the 'best' scientific name present in a digital specimen
 * @param digitalSpecimen The digital specimen to determine the scientific name from
 * @returns The 'best' scientific name string to be found in the digital specimen
 */
const DetermineScientificName = (digitalSpecimen: DigitalSpecimen) => {
    let scientificName: string = '';

    if (digitalSpecimen["ods:hasIdentifications"]?.find((identification) => identification["ods:isVerifiedIdentification"])) {
        scientificName = digitalSpecimen["ods:hasIdentifications"]?.find((identification) =>
            identification["ods:isVerifiedIdentification"])?.["ods:hasTaxonIdentifications"]?.[0]['dwc:scientificName'] ??
            digitalSpecimen["ods:hasIdentifications"]?.[0]?.["ods:hasTaxonIdentifications"]?.[0]['dwc:scientificName'] ?? '';
    } else {
        scientificName = digitalSpecimen["ods:hasIdentifications"]?.[0]?.["ods:hasTaxonIdentifications"]?.[0]['dwc:scientificName'] ?? '';
    };

    return scientificName;
};

/**
 * Function to find and determine the icon belonging to the provided topic discipline
 * @param topicDiscipline The topic discipline to find an icon for
 */
const DetermineTopicDisciplineIcon = async (topicDiscipline?: string) => {
    let icon: Dict | string | undefined;

    if (topicDiscipline) {
        try {
            icon = await import(`../../webroot/topicDisciplineIcons/${topicDiscipline.toLowerCase()}.png`);
        } catch {
            icon = '';
        };
    };

    return icon;
};

export {
    DetermineScientificName,
    DetermineTopicDisciplineIcon
};