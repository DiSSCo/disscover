/* MapperContext to set the context of the data, e.g. acceptedIdentification */
interface MapperContext {
    acceptedIdentification?: any;
    primaryEvent?: any;
}

/* UI Property interface to map data */
interface UIProperty {
    label: string;
    value: any;
    type?: string;
    hidden?: boolean;
}

/* Corresponding field config interface for DigitalSpecimen schema */
interface DsFieldConfig {
    label: string;
    resolve: (ds: any, context: MapperContext) => any;
    isHtml?: boolean;
    type?: string;
    hidden?: boolean;
}

interface DmFieldConfig {
    label: string;
    resolve: (dm: any) => any;
}

interface IdentificationConfig {
    label: string;
    resolve: (identification, context: { taxonIdentification: any }) => any;
    type?: string;
}

interface CategoryConfig {
    data: DsFieldConfig[],
    name: string
}

interface MappedCategories {
    data: UIProperty[],
    name: string,
    isVerified?: boolean
}

/* Result of the Digital Specimen data mapper */
interface DigitalSpecimenUIModel {
    mappedData: MappedCategories[]
}

export type { UIProperty, DsFieldConfig, DmFieldConfig, DigitalSpecimenUIModel, CategoryConfig, MappedCategories, IdentificationConfig };
