/* Import Types */
import { Annotation } from "./types/Annotation";
import { DigitalEntity } from "./types/DigitalEntity";
import { DigitalSpecimen as DigitalSpecimenType } from "./types/DigitalSpecimen";


/* General type for a dictionary */
export type Dict = {
    [name: string]: any;
};


/* Types for JSON Result Interfaces */
type DataFragment = {
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
        [property: string]: any
    }
}

export type JSONResult = {
    data: DataFragment,
    links: {
        self: string
    },
    meta?: {
        totalRecords: number
    }
};

export type JSONResultArray = {
    data: DataFragment[],
    links: {
        self: string,
        first?: string,
        next?: string,
        previous?: string
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

/* Annotation Types */
export type AnnotationArray = {
    [property: string]: Annotation[]
}

export type TargetProperty = {
    name: string,
    type: string
}

export type AnnotationTarget = {
    superClass: string,
    name?: string,
    type?: string,
    index?: number,
    annotations: Annotation[]
};

export type AnnotationType = {
    name: string,
    displayName: string,
    additionalFields: Dict,
    description: string
};

export type Property = string | number | boolean;

export type AnnotationTemplate = {
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

/* Digital Specimen Type */
export type DigitalSpecimen = {
    digitalSpecimen: DigitalSpecimenType,
    originalData: Dict
}

/* Digital Media Type */
export type DigitalMedia = {
    digitalEntity: DigitalEntity
    originalData: Dict
}

/* Organisation Type */
export type Organisation = {
    id: string,
    name: string,
    ror: string
}

/* Source System Type */
export type SourceSystem = {
    id: string,
    created: Date,
    type: string,
    name: string,
    endpoint: string,
    description: string,
    mappingId: string
}

/* Search Filter Type (search filters) */
export type SearchFilter = {
    label: string,
    type: string,
    nestedIn?: string,
    contains?: {[searchFilterName: string]: SearchFilter},
    searchable?: boolean
};

/* Search filters Type (fetch requests) */
export type SearchFilters = {
    [searchFilter: string]: string[]
}

/* Pagination Object Type */
export type PaginationObject = {
    records: Dict[],
    totalRecords: number,
    currentPage: number,
    lastPage: number,
    loading: boolean,
    GoToPage: Function,
    Next?: Function,
    Previous?: Function,
    Last?: Function
}

/* Dropdown item type */
export type DropdownItem = {
    label: string,
    value: string,
    action?: Function
};

/* Multi select item */
export type MultiSelectItem = {
    label: string,
    value: string,
    count?: number
};

/* Notification type */
export type Notification = {
    key: string,
    message: string,
    template?: string
};