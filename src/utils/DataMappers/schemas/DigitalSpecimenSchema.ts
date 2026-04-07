/**
 * Function to get the accepted identification or the first one it can find
 * @param ds The digital specimen object
 * @returns Either the accepted identification or, if there is none, the first identification it can find
 */
const getAcceptedIdentification = (ds: any) => {
    const identifications = ds["ods:hasIdentifications"];
    if (identifications) {
        const availableIdentification = identifications.find((item: any) => item["ods:isVerifiedIdentification"]) || identifications[0];
        return availableIdentification?.["ods:hasTaxonIdentifications"]?.[0];
    }
}

/* Data schema to map Digital Specimen data that we use in the UI, managed from one central data mapper */
const DIGITAL_SPECIMEN_SCHEMA_MAP = {
    SPECIMEN_RECORD: {
		doi: {
			label: 'DOI',
			resolve: (ds: any) => ds["@id"],
            type: 'copy'
		},
		catalogNumber: {
			label: 'Catalog Number',
			resolve: (ds: any) => {
				const catalog = ds["ods:hasIdentifiers"].find((id: any) => id["dcterms:title"] === "dwc:catalogNumber");
				const fallBack = ds["ods:hasIdentifiers"].find((id: any) => id["dcterms:title"] === "dwca:ID");
				return catalog?.["dwc:catalogNumber"] || fallBack?.["dwca:id"];
			}
		},
		specimenProvider: {
			label: 'Specimen Provider',
			resolve: (ds: any) => ds["ods:organisationName"]
		},
		sourceSystem: {
			label: 'Source System',
			resolve: (ds: any) => ds["ods:sourceSystemName"]
		},
		basisOfRecord: {
			label: 'Basis of Record',
			resolve: (ds: any) => ds["dwc:basisOfRecord"]
		},
		discipline: {
			label: 'Discipline',
			resolve: (ds: any) => ds["dwc:topicDiscipline"]
		}
    },
  
    IDENTIFICATION: {
        scientificName: {
            label: 'Scientific Name',
            isHtml: true,
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["ods:scientificNameHTMLLabel"] || acceptedIdentification?.["dwc:scientificName"];
            }
        },
        taxonomicStatus: {
            label: 'Taxonomic Status',
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["@id"];
            },
            type: 'url'
        },
        verbatimName: {
            label: 'Identification Verbatim',
            resolve: (ds: any) => ds["ods:hasIdentifications"]?.[0]?.["dwc:verbatimIdentification"],
            type: 'verbatim'
        },
        kingdom: {
            label: 'Kingdom',
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["dwc:kingdom"];
            }
        },
        phylum: {
            label: 'Phylum',
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["dwc:phylum"];
            }
        },
        class: {
            label: 'Class',
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["dwc:class"];
            }
        },
        order: {
            label: 'Order',
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["dwc:order"];
            }
        },
        family: {
            label: 'Family',
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["dwc:family"];
            }
        },
        subFamily: {
            label: 'Sub-family',
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["dwc:subfamily"];
            }
        },
        genus: {
            label: 'Genus',
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["dwc:genus"];
            }
        },
        species: {
            label: 'Species',
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["dwc:species"];
            }
        },
        specificEpithet: {
            label: 'Specific Epithet',
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["dwc:specificEpithet"];
            }
        },
        nomenClaturalCode: {
            label: 'Nomen/Clatural Code',
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["dwc:nomenclaturalCode"];
            }
        },
        scientificNameAuthorship: {
            label: 'Scientific Name Authorship',
            resolve: (ds: any) => {
                const acceptedIdentification = getAcceptedIdentification(ds);
                return acceptedIdentification?.["dwc:scientificNameAuthorship"];
            }
        },
    },
  
    LOCATION: {
		country: {
			label: 'Country',
			resolve: (ds: any) => ds["ods:hasEvents"]?.[0]?.["ods:hasLocation"]?.["dwc:country"]
		},
		locality: {
			label: 'Locality',
			resolve: (ds: any) => ds["ods:hasEvents"]?.[0]?.["ods:hasLocation"]?.["dwc:locality"]
		},
        verbatimLocality: {
            label: 'Locality Verbatim',
            resolve: (ds: any) => ds["ods:hasEvents"]?.[0]?.["ods:hasLocation"]?.["dwc:verbatimLocality"],
            type: 'verbatim'
        },
		geodeticDatum: {
			label: 'Geodetic Datum',
			resolve: (ds: any) => ds["ods:hasEvents"]?.[0]?.["ods:hasLocation"]?.["dwc:geodeticDatum"]
		}
    },
  
    COLLECTING_EVENT: {
		collector: {
			label: 'Collector',
			resolve: (ds: any) => ds["ods:hasEvents"]?.[0]?.["ods:hasAgents"]?.[0]?.["schema:name"]
		},
		date: {
			label: 'Date',
			resolve: (ds: any) => ds["ods:hasEvents"]?.[0]?.["dwc:eventDate"]
		},
		verbatimDate: {
			label: 'Date verbatim',
			resolve: (ds: any) => ds["ods:hasEvents"]?.[0]?.["dwc:verbatimEventDate"]
		}
    },
  
    CITATION_LICENSE: {
		license: {
			label: 'License Agreement',
			resolve: (ds:any) => ds["dcterms:license"]
		}
    }
};

export default DIGITAL_SPECIMEN_SCHEMA_MAP;