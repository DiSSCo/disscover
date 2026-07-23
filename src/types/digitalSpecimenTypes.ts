export enum CardCategory {
    SpecimenRecord = 'Specimen Record',
    Identification = 'Identification',
    Location = 'Location',
    CollectingEvent = 'Collecting event',
    CitationAndLicense = 'Citation and license'
}

export const LEFT_COLUMN_CATEGORIES = new Set<string>([
    CardCategory.SpecimenRecord,
    CardCategory.Identification
]);

export interface CardConfig {
    category: CardCategory;
    annotate?: boolean;
    georeference?: boolean;
    copy?: boolean;
    citation?: boolean;
}

export type AnnotationTargetPayload = {
    type: 'class' | 'term';
    jsonPath: string;
    directPath?: boolean;
};

export const CARD_CONFIGS: Record<CardCategory, Partial<CardConfig> & { annotationTarget?: AnnotationTargetPayload }> = {
    [CardCategory.SpecimenRecord]: {},
    [CardCategory.Identification]: { 
        annotate: true,
        annotationTarget: {
            type: 'class',
            jsonPath: "$['ods:hasIdentifications'][0]['ods:hasTaxonIdentifications'][0]",
            directPath: true
        }
    },
    [CardCategory.Location]: { 
        annotate: true, 
        georeference: true,
        annotationTarget: {
            type: 'class',
            jsonPath: "$['ods:hasEvents'][0]['ods:hasLocation']['ods:hasGeoreference']",
            directPath: true
        }
    },
    [CardCategory.CollectingEvent]: {},
    [CardCategory.CitationAndLicense]: { copy: true, citation: true }
};