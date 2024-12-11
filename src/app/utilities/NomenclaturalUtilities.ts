/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { Identification } from "app/types/Identification";
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

/**
 * Function to get the HTML label of the first accepted identification within the digital specimen, if not present, provide generic specimen name
 * @param digitalSpecimen The provided digital specimen
 * @returns HTML label or specimen name string
 */
const GetSpecimenNameHTMLLabel = (digitalSpecimen: DigitalSpecimen): string => {
    const acceptedIdentification: Identification | undefined = digitalSpecimen['ods:hasIdentifications']?.find(identification => identification['ods:isVerifiedIdentification']);

    if (acceptedIdentification) {
        return acceptedIdentification['ods:hasTaxonIdentifications']?.[0]['ods:scientificNameHTMLLabel'] ?? digitalSpecimen['ods:specimenName'] ?? '';
    } else {
        return digitalSpecimen['ods:specimenName'] ?? '';
    }
};

/**
 * Function to get the scientific name identifier (that leads to COL) of the first accepted identification
 * @param digitalSpecimen The provided digital specimen
 */
const GetSpecimenNameIdentifier = (digitalSpecimen: DigitalSpecimen) => {
    const acceptedIdentification: Identification | undefined = digitalSpecimen['ods:hasIdentifications']?.find(identification => identification['ods:isVerifiedIdentification']);

    return acceptedIdentification?.['ods:hasTaxonIdentifications']?.[0]["dwc:acceptedNameUsageID"];
};

/**
 * Function to get the genus HTML label of the first accepted identification within the digital specimen, if not present, provide generic genus string
 * @param digitalSpecimen The provided digital specimen
 */
const GetSpecimenGenusLabel = (acceptedIdentification: Identification): string => {
    if (acceptedIdentification) {
        return acceptedIdentification['ods:hasTaxonIdentifications']?.[0]['ods:genusHTMLLabel'] ?? acceptedIdentification['ods:hasTaxonIdentifications']?.[0]["dwc:genus"] ?? '';
    } else {
        return '';
    }
};

export {
    DetermineScientificName,
    DetermineTopicDisciplineIcon,
    GetSpecimenNameHTMLLabel,
    GetSpecimenNameIdentifier,
    GetSpecimenGenusLabel
};