/* Import schemas */
import DIGITAL_SPECIMEN_SCHEMA_MAP from "./schemas/DigitalSpecimenSchema";

/* Import types */
import { DigitalSpecimenUIModel, SchemaMap, UIProperty } from "./types/dataMapperTypes";

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

    /* Find acceptedIdentification or second best option */
    const acceptedIdentification = getAcceptedIdentification(ds);
    const primaryEvent = getPrimaryEvent(ds);

    return Object.fromEntries(
        Object.entries(DIGITAL_SPECIMEN_SCHEMA_MAP as SchemaMap).map(([groupKey, fields]) => {
            const mappedFields: Record<string, UIProperty> = Object.fromEntries(
                Object.entries(fields).map(([fieldKey, config]) => [
                    fieldKey,
                    {
                        label: config.label,
                        value: config.resolve(ds, {acceptedIdentification, primaryEvent}),
                        isHtml: Boolean(config.isHtml),
                        type: config.type || 'base',
                    }
                ])
            );

            return [groupKey, mappedFields];
        })
    ) as unknown as DigitalSpecimenUIModel;
};
