import { IdentificationConfig } from "types/dataMapperTypes";

const IDENTIFICATION_SCHEMA_MAP: IdentificationConfig[] = [
    {
        label: 'Scientific Name',
        resolve: (_, { taxonIdentification }) => {
            const htmlLabel = taxonIdentification?.["ods:scientificNameHTMLLabel"];
            const fallbackLabel = taxonIdentification?.["dwc:scientificName"];
            
            return htmlLabel || fallbackLabel;
        },
    },
    {
        label: 'Identification Verbatim',
        type: 'verbatim',
        resolve: (identification) => identification?.["dwc:verbatimIdentification"]
    },
    {
        label: 'Rank',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:taxonRank"]
    },
    {
        label: 'Taxonomic Status',
        type: 'url',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["@id"]
    },
    {
        label: 'Kingdom',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:kingdom"]
    },
    {
        label: 'Phylum',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:phylum"]
    },
    {
        label: 'Class',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:class"]
    },
    {
        label: 'Order',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:order"]
    },
    {
        label: 'Family',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:family"]
    },
    {
        label: 'Sub-family',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:subfamily"]
    },
    {
        label: 'Genus',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:genus"]
    },
    {
        label: 'Species',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:species"]
    },
    {
        label: 'Specific Epithet',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:specificEpithet"]
    },
    {
        label: 'Infrageneric Epithet',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:infragenericEpithet"]
    },
    {
        label: 'Infraspecific Epithet',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:infraspecificEpithet"]
    },
    {
        label: 'Nomenclatural Code',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:nomenclaturalCode"]
    },
    {
        label: 'Scientific Name Authorship',
        resolve: (_, { taxonIdentification }) => taxonIdentification?.["dwc:scientificNameAuthorship"]
    }
]

export default IDENTIFICATION_SCHEMA_MAP;