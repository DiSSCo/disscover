/* Import Types */
import { Annotation } from "./types/Annotation";
import { DigitalMedia as DigitalMediaType } from "./types/DigitalMedia";
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
        digitalMedia?: DigitalMediaType,
        originalData?: Dict,
        digitalMediaObjects?: {
            digitalMediaObject: DigitalMediaType,
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
    contains?: {[searchFilterName: string]: SearchFilter},
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
}

/* Annotation target */
export type AnnotationTarget = {
    jsonPath: string
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