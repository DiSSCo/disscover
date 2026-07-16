/* MapperContext to set the context of the data, e.g. acceptedIdentification */
interface MapperContext {
    acceptedIdentification?: any;
    primaryEvent?: any;
}

/* UI Property interface to map data */
interface UIProperty {
    label: string;
    value: any;
    type: string;
    hidden: boolean;
}

/* Corresponding field config interface for DigitalSpecimen schema */
interface FieldConfig {
    label: string;
    resolve: (ds: any, context: MapperContext) => any;
    isHtml?: boolean;
    type?: string;
    hidden?: boolean;
}

interface CategoryConfig {
    data: FieldConfig[],
    name: string
}

interface MappedCategories {
    data: UIProperty[],
    name: string
}

/* Result of the Digital Specimen data mapper */
interface DigitalSpecimenUIModel {
    mappedData: MappedCategories[]
}

export type { UIProperty, FieldConfig, DigitalSpecimenUIModel, CategoryConfig, MappedCategories };