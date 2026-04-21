import { FieldConfig } from "../types/dataMapperTypes";

/* Data schema to map Digital Specimen data that we use in the UI, managed from one central data mapper */
const DIGITAL_SPECIMEN_SCHEMA_MAP: Record<string, Record<string, FieldConfig>> = {
    SPECIMEN_RECORD: {
        doi: {
            label: 'DOI',
            resolve: (ds) => ds["@id"],
            type: 'copy'
        },
        catalogNumber: {
            label: 'Catalog Number',
            resolve: (ds) => {
                const catalog = ds["ods:hasIdentifiers"]?.find((id: any) => id["dcterms:title"] === "dwc:catalogNumber");
                const fallBack = ds["ods:hasIdentifiers"]?.find((id: any) => id["dcterms:title"] === "dwca:ID");
                return catalog?.["dwc:catalogNumber"] || fallBack?.["dwca:id"];
            }
        },
        specimenProvider: {
            label: 'Specimen Provider',
            resolve: (ds) => ds["ods:organisationName"]
        },
        sourceSystem: {
            label: 'Source System',
            resolve: (ds) => ds["ods:sourceSystemName"]
        },
        basisOfRecord: {
            label: 'Basis of Record',
            resolve: (ds) => ds["dwc:basisOfRecord"]
        },
        discipline: {
            label: 'Discipline',
            resolve: (ds) => ds["dwc:topicDiscipline"]
        }
    },
  
    IDENTIFICATION: {
        scientificName: {
            label: 'Scientific Name',
            resolve: (_, { acceptedIdentification }) => {
                const htmlLabel = acceptedIdentification?.["ods:scientificNameHTMLLabel"];
                const fallbackLabel = acceptedIdentification?.["dwc:scientificName"];
                
                return htmlLabel || fallbackLabel;
            },
        },
        verbatimName: {
            label: 'Identification Verbatim',
            type: 'verbatim',
            resolve: (ds) => ds["ods:hasIdentifications"]?.[0]?.["dwc:verbatimIdentification"]
        },
        rank: {
            label: 'Rank',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:taxonRank"]
        },
        taxonomicStatus: {
            label: 'Taxonomic Status',
            type: 'url',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["@id"]
        },
        kingdom: {
            label: 'Kingdom',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:kingdom"]
        },
        phylum: {
            label: 'Phylum',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:phylum"]
        },
        class: {
            label: 'Class',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:class"]
        },
        order: {
            label: 'Order',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:order"]
        },
        family: {
            label: 'Family',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:family"]
        },
        subFamily: {
            label: 'Sub-family',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:subfamily"]
        },
        genus: {
            label: 'Genus',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:genus"]
        },
        species: {
            label: 'Species',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:species"]
        },
        specificEpithet: {
            label: 'Specific Epithet',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:specificEpithet"]
        },
        infragenericEpithet: {
            label: 'Infrageneric Epithet',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:infragenericEpithet"]
        },
        infraspecificEpithet: {
            label: 'Infraspecific Epithet',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:infraspecificEpithet"]
        },
        nomenClaturalCode: {
            label: 'Nomenclatural Code',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:nomenclaturalCode"]
        },
        scientificNameAuthorship: {
            label: 'Scientific Name Authorship',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:scientificNameAuthorship"]
        },
        sex: {
            label: 'Sex',
            resolve: (_, { primaryEvent }) => primaryEvent?.["dwc:sex"]
        },
        lifeStage: {
            label: 'Life Stage',
            resolve: (_, { primaryEvent }) => primaryEvent?.["dwc:lifeStage"]
        }
    },
  
    LOCATION: {
        country: {
            label: 'Country',
            resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasLocation"]?.["dwc:country"]
        },
        locality: {
            label: 'Locality',
            resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasLocation"]?.["dwc:locality"]
        },
        verbatimLocality: { 
            label: 'Locality Verbatim', 
            type: 'verbatim',
            resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasLocation"]?.["dwc:verbatimLocality"],
        },
        geodeticDatum: {
            label: 'Geodetic Datum',
            resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasLocation"]?.["ods:hasGeoreference"]?.["dwc:geodeticDatum"]
        }
    },
  
    COLLECTING_EVENT: {
        collector: {
            label: 'Collector',
            resolve: (_, { primaryEvent }) => primaryEvent?.["ods:hasAgents"]?.[0]?.["schema:name"]
        },
        date: {
            label: 'Date',
            resolve: (_, { primaryEvent }) => primaryEvent?.["dwc:eventDate"]
        },
        verbatimDate: {
            label: 'Date verbatim',
            resolve: (_, { primaryEvent }) => primaryEvent?.["dwc:verbatimEventDate"],
            type: 'verbatim'
        }
    },
  
    CITATION_LICENSE: {
        license: {
            label: 'License Agreement',
            resolve: (ds) => ds["dcterms:license"]
        }
    },
    UI_COMPONENTS_DATA: {
        taxonRank: {
            label: 'Taxonomic Rank',
            resolve: (_, { acceptedIdentification }) => acceptedIdentification?.["dwc:taxonRank"]
        },
        typeStatus: {
            label: 'Type Status',
            resolve: (ds) => ds["ods:hasIdentifications"]?.[0]?.["dwc:typeStatus"]
        }
    }
};

export default DIGITAL_SPECIMEN_SCHEMA_MAP;