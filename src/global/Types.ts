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
        attributes: Dict
    },
    links: {
        self: string
    }
};

export type JSONResultArray = {
    data: {
        id: string,
        type: string,
        attributes: Dict
    }[],
    links: {
        self: string
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

export type UserAnnotations = {
    [property: string]: Annotation[]
};

/* Search Types */
export interface SearchFilter {
    [filter: string]: string | []
}

/* Specimen Types */
export interface Specimen {
    id: string,
    created: Date,
    data: Dict,
    dwcaId: string,
    midsLevel: number,
    organisationId: string,
    originalData: Dict,
    physicalSpecimenCollection: string,
    physicalSpecimenId: string,
    physicalSpecimenIdType: string,
    sourceSystemId: string,
    specimenName: string,
    version: number,
    type: string
};

export interface SpecimenDigitalMedia  {
    annotations: Annotation[],
    digitalMediaObject: DigitalMedia,
    created: Date
};

export interface SpecimenAnnotations {
    [specimenProperty: string]: Annotation[]
};

/* Digital Media Type */
export interface DigitalMedia {
    id: string,
    created: Date,
    data: Dict,
    digitalSpecimenId: string,
    format: string,
    mediaUrl: string,
    originalData: Dict
    sourceSystemId: string,
    type: string,
    version: number,
    filtered?: Dict
};

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
    target: {
        id: string,
        indvProp: string,
        type: string
    },
    body: {
        type: string,
        value: string | [],
        values?: [],
        description?: string,
        based_on?: string,
        reference?: string
    },
    preferenceScore: number,
    creator: string,
    created: number,
    generator: Dict,
    generated: Date,
    deleted_on: Date
    /* Temporary solution */
    specimen?: Specimen
    digitalMedia?: DigitalMedia
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
        indvProp: string,
        type: string
    },
};

export interface AnnotateTarget {
    property: string,
    motivation?: string,
    target: Specimen | DigitalMedia,
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