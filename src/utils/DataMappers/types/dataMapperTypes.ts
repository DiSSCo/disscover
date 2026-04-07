/* MapperContext to set the context of the data, e.g. acceptedIdentification */
interface MapperContext {
    acceptedIdentification?: any;
    primaryEvent?: any;
}

/* UI Property interface to map data to */
interface UIProperty {
    label: string;
    value: any;
    isHtml: boolean;
    type: string;
}

/* Corresponding field config interface for DigitalSpecimen schema */
interface FieldConfig {
    label: string;
    resolve: (ds: any, context: MapperContext) => any;
    isHtml?: boolean;
    type?: string;
}

/* Result of the Digital Specimen data mapper */
interface DigitalSpecimenUIModel {
    SPECIMEN_RECORD: Record<string, UIProperty>;
    IDENTIFICATION: Record<string, UIProperty>;
    LOCATION: Record<string, UIProperty>;
    COLLECTING_EVENT: Record<string, UIProperty>;
    CITATION_LICENSE: Record<string, UIProperty>;
}

/* Generic map to handle schemas for the digitalSpecimenUIModel */
type SchemaMap = {
    [Key in keyof DigitalSpecimenUIModel]: Record<string, FieldConfig>;
};

export type { UIProperty, FieldConfig, DigitalSpecimenUIModel, SchemaMap };

