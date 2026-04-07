/* Import schemas */
import DIGITAL_SPECIMEN_SCHEMA_MAP from "./schemas/DigitalSpecimenSchema";

/* Import types */
import { DigitalSpecimenUIModel, SchemaMap, UIProperty } from "./types/dataMapperTypes";

/**
 * Function to get the accepted identification or the first one it can find
 * @param ds The digital specimen object
 * @returns Either the accepted identification or, if there is none, the first identification it can find
 */
const getAcceptedIdentification = (ds: any) => {
    const identifications = ds["ods:hasIdentifications"];
    if (identifications) {
        const availableIdentification = identifications.find((item: any) => item["ods:isVerifiedIdentification"]) || identifications[0];
        return availableIdentification?.["ods:hasTaxonIdentifications"]?.[0];
    }
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

    return Object.entries(DIGITAL_SPECIMEN_SCHEMA_MAP as SchemaMap).reduce((accumulator, [groupKey, fields]) => {
        const mappedFields: Record<string, UIProperty> = {};

        Object.entries(fields).forEach(([fieldKey, config]) => {
            mappedFields[fieldKey] = {
                label: config.label,
                value: config.resolve(ds, acceptedIdentification),
                isHtml: !!config.isHtml,
                type: config.type || 'base',
            };
        });

        accumulator[groupKey as keyof DigitalSpecimenUIModel] = mappedFields;
        return accumulator;
    }, {} as DigitalSpecimenUIModel);
};
