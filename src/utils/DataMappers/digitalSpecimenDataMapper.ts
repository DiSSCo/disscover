/* Import schemas */
import DIGITAL_SPECIMEN_SCHEMA_MAP from "./schemas/DigitalSpecimenSchema";

/* Import types */
import { DigitalSpecimenUIModel, SchemaMap, UIProperty } from "./types/dataMapperTypes";

/**
 * Transforms raw Digital Specimen data into a UI-ready model 
 * based on the DIGITAL_SPECIMEN_SCHEMA_MAP definitions.
 * It is executed in the useDigitalSpecimen hook immediately when the call is being done.
 */
export const mapDigitalSpecimen = (rawData: any): DigitalSpecimenUIModel | null => {
    const ds = rawData?.data?.attributes?.digitalSpecimen;
    if (!ds) return null;

    // Use reduce to build the object cleanly
    return Object.entries(DIGITAL_SPECIMEN_SCHEMA_MAP as SchemaMap).reduce((acc, [groupKey, fields]) => {
        const mappedFields: Record<string, UIProperty> = {};

        Object.entries(fields).forEach(([fieldKey, config]) => {
            mappedFields[fieldKey] = {
                label: config.label,
                value: config.resolve(ds),
                isHtml: !!config.isHtml,
                type: config.type || 'base',
            };
        });

        acc[groupKey as keyof DigitalSpecimenUIModel] = mappedFields;
        return acc;
    }, {} as DigitalSpecimenUIModel);
};