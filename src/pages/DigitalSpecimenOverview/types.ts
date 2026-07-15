export enum CardCategory {
    SpecimenRecord = 'Specimen Record',
    Identification = 'Identification',
    Location = 'Location',
    CollectingEvent = 'Collecting event',
    CitationAndLicense = 'Citation and license'
}

export const CARDS_LEFT_COLUMN: CardCategory[] = [
    CardCategory.SpecimenRecord,
    CardCategory.Identification
];

export const CARDS_RIGHT_COLUMN: CardCategory[] = [
    CardCategory.Location,
    CardCategory.CollectingEvent,
    CardCategory.CitationAndLicense
];

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