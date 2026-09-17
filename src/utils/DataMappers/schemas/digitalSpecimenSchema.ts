import { CardCategory } from 'types/digitalSpecimenTypes';
import { CategoryConfig } from 'types/dataMapperTypes';

/* Data schema to map Digital Specimen data that we use in the UI, managed from one central data mapper */
const DIGITAL_SPECIMEN_SCHEMA_MAP: CategoryConfig[] = [
    {
        name: CardCategory.SpecimenRecord,
        data: [
            {

                label: 'DOI',
                resolve: (ds) => ds["@id"],
                type: 'copy'
            },
            {
                label: 'Catalog Number',
                resolve: (ds) => {
                    const catalog = ds["ods:hasIdentifiers"]?.find((id: any) => id["dcterms:title"] === "dwc:catalogNumber");
                    const fallBack = ds["ods:hasIdentifiers"]?.find((id: any) => id["dcterms:title"] === "dwca:ID");
                    return catalog?.["dwc:catalogNumber"] || fallBack?.["dwca:id"];
                }
            },
            {
                label: 'Specimen Provider',
                resolve: (ds) => ds["ods:organisationName"]
            },
            {
                label: 'Source System',
                resolve: (ds) => ds["ods:sourceSystemName"]
            },
            {
                label: 'Basis of Record',
                resolve: (ds) => ds["dwc:basisOfRecord"]
            },
            {
                label: 'Discipline',
                resolve: (ds) => ds["dwc:topicDiscipline"]
            }
        ]
    },
    {
        name: CardCategory.Identification,
        data: [
            {
                label: 'Scientific Name',
                resolve: (_, { acceptedIdentification }) => {
                    const htmlLabel = acceptedIdentification?.["ods:scientificNameHTMLLabel"];
                    const fallbackLabel = acceptedIdentification?.["dwc:scientificName"];
                    
                    return htmlLabel || fallbackLabel;
                },
            },
            {
                label: 'Identification Verbatim',
                type: 'verbatim',
                resolve: (ds) => ds["ods:hasIdentifications"]?.[0]?.["dwc:verbatimIdentification"]
            },
            {
                label: 'Rank',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:taxonRank"]
            },
            {
                label: 'Taxonomic Status',
                type: 'url',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["@id"]
            },
            {
                label: 'Kingdom',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:kingdom"]
            },
            {
                label: 'Phylum',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:phylum"]
            },
            {
                label: 'Class',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:class"]
            },
            {
                label: 'Order',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:order"]
            },
            {
                label: 'Family',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:family"]
            },
            {
                label: 'Sub-family',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:subfamily"]
            },
            {
                label: 'Genus',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:genus"]
            },
            {
                label: 'Species',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:species"]
            },
            {
                label: 'Specific Epithet',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:specificEpithet"]
            },
            {
                label: 'Infrageneric Epithet',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:infragenericEpithet"]
            },
            {
                label: 'Infraspecific Epithet',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:infraspecificEpithet"]
            },
            {
                label: 'Nomenclatural Code',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:nomenclaturalCode"]
            },
            {
                label: 'Scientific Name Authorship',
                resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:scientificNameAuthorship"]
            },
            {
                label: 'Sex',
                resolve: (_, { primaryEvent }) => primaryEvent?.["dwc:sex"]
            },
            {
                label: 'Life Stage',
                resolve: (_, { primaryEvent }) => primaryEvent?.["dwc:lifeStage"]
            }
        ]
    },
    {
        name: CardCategory.Location,
        data: [
            {
                label: 'Country',
                resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasLocation"]?.["dwc:country"]
            },
            {
                label: 'Locality',
                resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasLocation"]?.["dwc:locality"]
            },
            { 
                label: 'Locality Verbatim', 
                type: 'verbatim',
                resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasLocation"]?.["dwc:verbatimLocality"],
            },
            {
                label: 'Geodetic Datum',
                resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasLocation"]?.["ods:hasGeoreference"]?.["dwc:geodeticDatum"]
            },
            {
                label: 'Decimal Longitude',
                resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasLocation"]?.["ods:hasGeoreference"]?.["dwc:decimalLongitude"]
            },
            {
                label: 'Decimal Longitude',
                resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasLocation"]?.["ods:hasGeoreference"]?.["dwc:verbatimLongitude"],
                type: 'verbatim'
            },
            {
                label: 'Decimal Latitude',
                resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasLocation"]?.["ods:hasGeoreference"]?.["dwc:decimalLatitude"]
            },
            {
                label: 'Decimal Latitude',
                resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasLocation"]?.["ods:hasGeoreference"]?.["dwc:verbatimLatitude"],
                type: 'verbatim'
            },
        ]
    },
    {
        name: CardCategory.CollectingEvent,
        data: [
            {
                label: 'Collector',
                resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasAgents"]?.[0]?.["schema:name"]
            },
            {
                label: 'Date',
                resolve: (_, { primaryEvent }) => primaryEvent?.["dwc:eventDate"]
            },
            {
                label: 'Date verbatim',
                resolve: (_, { primaryEvent }) => primaryEvent?.["dwc:verbatimEventDate"],
                type: 'verbatim'
            }
        ]
    },
    {
        name: CardCategory.CitationAndLicense,
        data: [
            {
                label: 'License Agreement',
                resolve: (ds) => ds["dcterms:license"]
            },
            {
                label: 'Organisation ID',
                resolve: (ds) => ds["ods:organisationID"],
                hidden: true
            },
            {
                label: 'Organisation Name',
                resolve: (ds) => ds["ods:organisationName"],
                hidden: true
            },
            {
                label: 'Scientific Name',
                resolve: (_, { acceptedIdentification }) => {
                    const htmlLabel = acceptedIdentification?.["ods:scientificNameHTMLLabel"];
                    const fallbackLabel = acceptedIdentification?.["dwc:scientificName"];
                    
                    return htmlLabel || fallbackLabel;
                },
                hidden: true
            },
            {
                label: 'Digital Specimen ID',
                resolve: (ds) => ds["@id"],
                hidden: true
            }
        ]
    }
];

export default DIGITAL_SPECIMEN_SCHEMA_MAP;