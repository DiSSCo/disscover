/* Import Types */
import { DigitalSpecimen } from "app/Types"


/* Utilities associated with the nomenclatural rules */

/**
 * Function to find and determine the 'best' scientific name present in a digital specimen
 * @param digitalSpecimen The digital specimen to determine the scientific name from
 * @returns The 'best' scientific name string to be found in the digital specimen
 */
const DetermineScientificName = (digitalSpecimen: DigitalSpecimen) => {
    let scientificName: string = '';

    if (digitalSpecimen.digitalSpecimen['dwc:identification']?.find((identification) => identification['dwc:identificationVerificationStatus'])) {
        scientificName = digitalSpecimen.digitalSpecimen['dwc:identification']?.find((identification) => identification['dwc:identificationVerificationStatus'])?.taxonIdentifications?.[0]['dwc:scientificName'] ??
        digitalSpecimen.digitalSpecimen['dwc:identification']?.[0]?.taxonIdentifications?.[0]['dwc:scientificName'] ?? '';
    } else {
        scientificName = digitalSpecimen.digitalSpecimen['dwc:identification']?.[0]?.taxonIdentifications?.[0]['dwc:scientificName'] ?? '';
    };

    return scientificName;
};

export {
    DetermineScientificName
};