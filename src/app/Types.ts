/* Import Types */
import { DigitalSpecimen as DigitalSpecimenType } from "./types/DigitalSpecimen";
import { DigitalEntity } from "./types/DigitalEntity";


/* Generic Types */
export type Callback = {
    (param: any): void;
};

export type EmptyCallback = {
    (): void;
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
            digitalMediaObjects?: DigitalEntity[],
            originalData?: Dict,
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
            digitalMediaObjects?: DigitalEntity[],
            originalData?: Dict,
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
export interface DigitalSpecimen extends DigitalSpecimenType {
    originalData: Dict
}

export interface SpecimenAnnotations {
    [specimenProperty: string]: Annotation[]
};

/* Digital Media Types */
export interface DigitalMedia extends DigitalEntity {
    originalData: Dict
}

export type DigitalMediaAnnotations = {
    [digitalMediaProperty: string]: Annotation[] | any
};

export type DigitalMediaObservation = {
    test: string
};

/* Annotation Types */
export interface Annotation {
    id: string,
    version: number,
    type: string,
    motivation: string,
    body: {
        type: string,
        value?: string | [],
        values?: string[],
        description?: string,
        basedOn?: string,
        reference?: string,
        purpose?: string
    },
    target: {
        id: string,
        indvProp: string,
        type: string,
        selector?: {
            type: string,
            value?: string,
            conformsTo?: string,
            hasROI?: {
                "ac:xFrac": number,
                "ac:yFrac": number,
                "ac:widthFrac": number,
                "ac:heightFrac": number
            },
        }
    },
    preferenceScore?: number,
    creator: string,
    created: number,
    generator?: Dict,
    generated?: Date,
    deleted_on?: Date
};

export interface AnnotationTemplate {
    type: string,
    motivation: string,
    body: {
        type: string,
        value: string[],
        description?: string,
        based_on?: string,
        reference?: string
    },
    target: {
        id: string,
        indvProp?: string,
        type: string,
    }
};

export interface ImageAnnotationTemplate {
    type: string,
    motivation: string,
    body: {
        type: string,
        values: string[]
    },
    target: {
        id: string,
        type: string,
        selector: {
            type: string,
            conformsTo: string,
            hasROI: {
                "ac:xFrac": number,
                "ac:yFrac": number,
                "ac:widthFrac": number,
                "ac:heightFrac": number
            },
            value?: string,
        }
    }
}

export interface AnnotateTarget {
    property: string,
    motivation?: string,
    target: DigitalSpecimenType | DigitalEntity,
    targetType: string,
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