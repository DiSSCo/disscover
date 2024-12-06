/* Import Types */
import { Annotation } from "./types/Annotation";
import { DigitalMedia as DigitalMediaType } from "./types/DigitalMedia";
import { DigitalSpecimen as DigitalSpecimenType } from "./types/DigitalSpecimen";
import { SourceSystem } from "./types/SourceSystem";


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
        digitalMedia?: DigitalMediaType,
        originalData?: Dict,
        digitalMediaObjects?: {
            digitalMediaObject: DigitalMediaType,
            annotations: Annotation[]
        }[],
        annotations?: Annotation[],
        sourceSystem?: SourceSystem
        [property: string]: any
    }
};

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
    data: DataFragment[] | Dict[],
    links: {
        self: string,
        first?: string,
        next?: string,
        previous?: string
    },
    meta?: {
        totalRecords: number
    }
};

/* User */
export type User = {
    id: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    organisation?: string
    orcid?: string,
};

/* Search Filter Type (search filters) */
export type SearchFilter = {
    label: string,
    type: string,
    nestedIn?: string,
    contains?: { [searchFilterName: string]: SearchFilter },
    searchable?: boolean,
    searchAlias?: string
};

/* Search filters (fetch requests) */
export type SearchFilters = {
    [searchFilter: string]: string[]
}

/* Pagination object */
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
};

/* Super class (annotation target) */
export type SuperClass = DigitalSpecimenType | DigitalMediaType | Dict;

/* Annotation target */
export type AnnotationTarget = {
    type: 'superClass' | 'class' | 'term',
    jsonPath: string,
    directPath?: boolean,
    annotation?: {
        id: string,
        motivation: string,
        values: string[]
    }
};

/* Annotation template */
export type AnnotationTemplate = {
    "oa:motivation": "ods:adding" | "ods:deleting" | "oa:assessing" | "oa:editing" | "oa:commenting",
    "oa:motivatedBy": string,
    "oa:hasTarget": {
        "@id": string,
        "@type": string,
        "dcterms:identifier": string,
        "ods:fdoType": string,
        "oa:hasSelector": {
            "@type"?: 'ods:TermSelector' | 'ods:ClassSelector' | 'oa:FragmentSelector',
            "ods:term"?: string
        } | {
            "@type"?: 'ods:TermSelector' | 'ods:ClassSelector' | 'oa:FragmentSelector',
            "ods:class"?: string
        } | {
            "@type"?: 'ods:TermSelector' | 'ods:ClassSelector' | 'oa:FragmentSelector',
            "ac:hasROI"?: {
                "ac:xFrac": number,
                "ac:yFrac": number,
                "ac:widthFrac": number,
                "ac:heightFrac": number
            },
            "dcterms:conformsTo"?: "https://ac.tdwg.org/termlist/#711-region-of-interest-vocabulary"
        }
    },
    "oa:hasBody": {
        "oa:value": (string | Dict)[]
    }
};

/* Machine Job Record */
export type MasJobRecord = {
    annotations: Dict,
    batchingRequested: boolean,
    jobHandle: string,
    masId: string,
    orcid: string,
    state: 'SCHEDULED' | 'RUNNING' | 'FAILED' | 'COMPLETED',
    targetId: string,
    targetType: string,
    timeCompleted: string,
    timeStarted: string,
    timeToLive: number
};

/* Parent class */
export type ParentClass = {
    jsonPath: string,
    name: string,
    parentName?: string,
    present: boolean,
    options?: number,
    dependent?: boolean
};

/* Annotation form property */
export type AnnotationFormProperty = {
    key: string,
    name: string,
    jsonPath: string,
    type: string,
    currentValue?: string | number | boolean | Dict,
    properties?: AnnotationFormProperty[]
};

/* Dropdown item */
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

/* Notification */
export type Notification = {
    key: string,
    message: string,
    template?: string
};

/* Progress dot */
export type ProgressDot = {
    label: string,
    OnClick: Function
};

/* Tour topic */
export type TourTopic = {
    name: string,
    title: string
};