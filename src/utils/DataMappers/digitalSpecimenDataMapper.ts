/* Import schemas */
import DIGITAL_SPECIMEN_SCHEMA_MAP from "./schemas/digitalSpecimenSchema";

/* Import types */
import { DigitalSpecimenUIModel, UIProperty } from "types/dataMapperTypes";

/**
 * Function to get the accepted identification or the first one it can find
 * @param ds The digital specimen object
 * @returns Either the accepted identification, the first identification it can find or null in the edge case that there is none
 */
const getAcceptedIdentification = (ds: any) => {
    const identifications = ds["ods:hasIdentifications"];
    
    /* Find verified identification or fallback to first identification */
    const primary = identifications?.find((item: any) => item["ods:isVerifiedIdentification"]) 
        ?? identifications?.[0];

    /* Return the taxon identification or null if for some reason there is no identification*/
    return primary?.["ods:hasTaxonIdentifications"]?.[0] ?? null;
}

/**
 * Function to retrieve the primary event once
 * @param ds The digital specimen object
 * @returns Either the primary event if there is one or null
 */
const getPrimaryEvent = (ds: any) => {
    return ds["ods:hasEvents"]?.[0] ?? null;
}

/**
 * Transforms raw Digital Specimen data into a UI-ready model 
 * based on the DIGITAL_SPECIMEN_SCHEMA_MAP definitions.
 * It is executed in the useDigitalSpecimen hook immediately when the call is being done.
 */
export const mapDigitalSpecimen = (rawData: any): DigitalSpecimenUIModel | null => {
    const ds = rawData?.data?.attributes?.digitalSpecimen;
    if (!ds) return null;

    const acceptedIdentification = getAcceptedIdentification(ds);
    const primaryEvent = getPrimaryEvent(ds);
    
    const mappedCategories = DIGITAL_SPECIMEN_SCHEMA_MAP.map((category) => {
        const mappedFields = category.data.reduce<UIProperty[]>((accumulator, field) => {
            console.log(accumulator, field);
            const value = field.resolve(ds, { acceptedIdentification, primaryEvent });

            // Only push to the array if a valid value exists
            if (value !== undefined && value !== null && value !== "") {
                accumulator.push({
                    label: field.label,
                    value: value,
                    type: field.type || 'base',
                    hidden: field.hidden || false
                });
            }

            return accumulator;
        }, []);

        return {
            name: category.name,
            data: mappedFields
        };
    });

    return {
        // Only keep categories that have at least one valid data field
        mappedData: mappedCategories.filter(category => category.data.length > 0)
    };
};
