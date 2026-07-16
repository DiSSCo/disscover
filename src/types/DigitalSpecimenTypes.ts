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

export const CARD_CONFIGS: Record<CardCategory, Partial<CardConfig>> = {
    [CardCategory.SpecimenRecord]: {},
    [CardCategory.Identification]: { annotate: true },
    [CardCategory.Location]: { annotate: true, georeference: true },
    [CardCategory.CollectingEvent]: {},
    [CardCategory.CitationAndLicense]: { copy: true, citation: true }
};