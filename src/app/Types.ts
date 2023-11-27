/* Import Types */
import { Annotation } from "./types/Annotation";
import { DigitalEntity } from "./types/DigitalEntity";
import { DigitalSpecimen as DigitalSpecimenType } from "./types/DigitalSpecimen";


/* Generic Types */
export type Callback = {
    (param: any): Function | void;
};

export type EmptyCallback = {
    (): Function | void;
}

export type Dict = {
    [name: string]: any;
};


/* JSON Result Interface */
export type JSONResult = {
    data: {
        id: string,
        type: string,
        attributes: {
            digitalSpecimen?: DigitalSpecimenType,
            digitalEntity?: DigitalEntity,
            originalData?: Dict,
            digitalMediaObjects?: {
                digitalMediaObject: DigitalMedia,
                annotations: Annotation[]
            }[],
            annotations?: Annotation[],
            [property: string]: any
        }
    },
    links: {
        self: string
    },
    meta?: {
        totalRecords: number
    }
};

export type JSONResultArray = {
    data: {
        id: string,
        type: string,
        attributes: {
            digitalSpecimen?: DigitalSpecimenType,
            digitalEntity?: DigitalEntity,
            originalData?: Dict,
            digitalMediaObjects?: {
                digitalMediaObject: DigitalMedia,
                annotations: Annotation[]
            }[],
            annotations?: Annotation[]
        }
    }[],
    links: {
        self: string
    },
    meta?: {
        totalRecords: number
    }
}

/* User Type */
export type User = {
    id: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    organisation?: string
    orcid?: string,
};

/* Search Types */
export interface SearchFilter {
    [filter: string]: string | []
}

/* Specimen Types */
export interface DigitalSpecimen {
    digitalSpecimen: DigitalSpecimenType,
    originalData: Dict
}

export interface SpecimenAnnotations {
    [specimenProperty: string]: Annotation[]
};

/* Digital Media Types */
export interface DigitalMedia {
    digitalEntity: DigitalEntity
    originalData: Dict
}

export type DigitalMediaAnnotations = {
    [digitalMediaProperty: string]: Annotation[]
};

export type DigitalMediaObservation = {
    test: string
};

export interface AnnotationTemplate {
    "ods:id"?: string,
    "oa:motivation": string,
    "oa:target": {
        "ods:id": string,
        "ods:type": string,
        "oa:selector": {
            "ods:type": string,
            "ods:field"?: string,
            "dcterms:conformsTo"?: string,
            "ac:hasRoi"?: {
                "ac:xFrac": number,
                "ac:yFrac": number,
                "ac:widthFrac": number,
                "ac:heightFrac": number
            }
        },
    }
    "oa:body": {
        "ods:type": string,
        "oa:value": string[],
        "dcterms:reference"?: string,
        "ods:score"?: 100
    }
};

export interface TargetProperty {
    name: string,
    type: string
}

export interface AnnotateTarget {
    target: DigitalSpecimenType | DigitalEntity,
    targetType: string,
    targetProperty: TargetProperty,
    currentValue?: (string|number|boolean|Dict)[],
    motivation?: string,
    annotations: Annotation[]
};

export interface AnnotationMotivation {
    key: string,
    displayName: string,
    additionalFields: Dict,
    context: string
};


/* Organisation Types */
export interface Organisation {
    id: string,
    name: string,
    ror: string
}


/* Source System Types */
export interface SourceSystem {
    id: string,
    created: Date,
    type: string,
    name: string,
    endpoint: string,
    description: string,
    mappingId: string
}


/* General Types */
export interface PaginationObject {
    page: string,
    pageNumber: number,
    filters?: string[][]
}