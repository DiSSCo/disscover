/* Import types */
import { Annotation } from "app/types/Annotation";
import { DigitalMedia } from "app/types/DigitalMedia";
import { DigitalSpecimen } from "app/types/DigitalSpecimen";

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
    type?: string;
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

/* Interfaces for raw digitalSpecimen data */
interface RawSpecimenData {
    data: {
        attributes: {
            digitalSpecimen: DigitalSpecimen,
            digitalMedia: DigitalMedia[],
            annotations: Annotation[]
        },
        id: string,
        type: string
    },
    links?: Record<string, string>;
    meta?: Record<string, unknown>
}

export type { UIProperty, DsFieldConfig, DmFieldConfig, DigitalSpecimenUIModel, CategoryConfig, MappedCategories, IdentificationConfig, RawSpecimenData };
