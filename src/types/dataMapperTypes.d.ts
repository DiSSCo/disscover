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
    isHtml?: boolean;
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
    isHtml?: boolean
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

interface RawDigitalMediaData {
    data: {
        attributes: DigitalMedia
    },
    links?: Record<string, string>;
    meta?: Record<string, unknown>
}

interface DigitalSpecimenAttributes {
  digitalSpecimen: DigitalSpecimen;
  digitalMedia: DigitalMedia[];
  annotations: Annotation[];
}

interface DigitalSpecimenJson {
  type: 'ods:DigitalSpecimen';
  id: string;
  attributes: DigitalSpecimenAttributes;
}

interface DigitalMediaJson {
  type: 'ods:DigitalMedia';
  id: string;
  attributes: DigitalMedia;
}

type JsonViewerData = DigitalSpecimenJson | DigitalMediaJson;

export type {
    UIProperty,
    DsFieldConfig,
    DmFieldConfig,
    DigitalSpecimenUIModel,
    CategoryConfig,
    MappedCategories,
    IdentificationConfig,
    RawSpecimenData,
    RawDigitalMediaData,
    JsonViewerData,
    DigitalSpecimenJson,
    DigitalMediaJson
};
