interface UIProperty {
    label: string;
    value: any;
    isHtml: boolean;
}
  
interface DigitalSpecimenUIModel {
    SPECIMEN_RECORD: Record<string, UIProperty>;
    IDENTIFICATION: Record<string, UIProperty>;
    LOCATION: Record<string, UIProperty>;
    COLLECTING_EVENT: Record<string, UIProperty>;
    CITATION_LICENSE: Record<string, UIProperty>;
}

const getAcceptedIdentification = (ds: any) => {
	const idents = ds["ods:hasIdentifications"] || [];
	const active = idents.find(i => i["ods:isVerifiedIdentification"]) || idents[0];
	const taxon = active?.["ods:hasTaxonIdentifications"]?.[0];
	return taxon;
}

/**
 * THE REGISTRY
 * Use this to change labels or logic for any field in the app.
 */
const SCHEMA_MAP = {
    SPECIMEN_RECORD: {
		doi: {
			label: 'DOI',
			resolve: (ds: any) => ds["@id"]
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
        isHtml: true, // Signals UI to use HTML rendering
        resolve: (ds: any) => {
			const accp = getAcceptedIdentification(ds);
			// Context-aware: preferentially return the HTML label provided by the API
			return accp?.["ods:scientificNameHTMLLabel"] || accp?.["dwc:scientificName"];
        }
      },
	  taxonomicStatus: {
		label: 'Taxonomic Status',
		resolve: (ds: any) => {
			const accp = getAcceptedIdentification(ds);
			return accp?.["@id"];
		}
	  },
      verbatimName: {
        label: 'Identification Verbatim',
        resolve: (ds: any) => ds["ods:hasIdentifications"]?.[0]?.["dwc:verbatimIdentification"]
      },
	  kingdom: {
		label: 'Kingdom',
		resolve: (ds: any) => {
			const accp = getAcceptedIdentification(ds);
			return accp?.["dwc:kingdom"];
		}
	  },
	  phylum: {
		label: 'Phylum',
		resolve: (ds: any) => {
			const accp = getAcceptedIdentification(ds);
			return accp?.["dwc:phylum"];
		}
	  },
	  class: {
		label: 'Class',
		resolve: (ds: any) => {
			const accp = getAcceptedIdentification(ds);
			return accp?.["dwc:class"];
		}
	  },
	  order: {
		label: 'Order',
		resolve: (ds: any) => {
			const accp = getAcceptedIdentification(ds);
			return accp?.["dwc:order"];
		}
	  },
	  family: {
		label: 'Family',
		resolve: (ds: any) => {
			const accp = getAcceptedIdentification(ds);
			return accp?.["dwc:family"];
		}
	  },
	  subFamily: {
		label: 'Sub-family',
		resolve: (ds: any) => {
			const accp = getAcceptedIdentification(ds);
			return accp?.["dwc:subfamily"];
		}
	  },
	  genus: {
		label: 'Genus',
		resolve: (ds: any) => {
			const accp = getAcceptedIdentification(ds);
			return accp?.["dwc:genus"];
		}
	  },
	  species: {
		label: 'Kingdom',
		resolve: (ds: any) => {
			const accp = getAcceptedIdentification(ds);
			return accp?.["dwc:species"];
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
        citation: {
            label: 'Citation',
          	resolve: (ds:any) => ds["dcterms:title"]
        },
		license: {
			label: 'License Agreement',
			resolve: (ds:any) => ds["dcterms:license"]
		}
    }
};
  
/**
 * Transforms raw Digital Specimen data into a UI-ready model 
 * based on the SCHEMA_MAP definitions.
 */
export const mapDigitalSpecimen = (rawData: any): DigitalSpecimenUIModel | null => {
    // Extract the core specimen attributes from the DiSSCo JSON structure
    const ds = rawData?.data?.attributes?.digitalSpecimen;
    
    if (!ds) return null;
  
    const uiModel = {};
  
    // Iterate through each fragment (e.g., SPECIMEN_RECORD, LOCATION)
    Object.entries(SCHEMA_MAP).forEach(([fragmentKey, fields]) => {
		uiModel[fragmentKey] = {};
	
		// Process each field within the fragment
		Object.entries(fields).forEach(([fieldKey, config]) => {
			uiModel[fragmentKey][fieldKey] = {
			label: config.label,
			value: config.resolve(ds),
			isHtml: config.isHtml || false
			};
		});
    });
  
    return uiModel as DigitalSpecimenUIModel;
};

export const mapDigitalSpecimenMedia = (rawData: any) => {
	const ds = rawData?.data?.attributes?.digitalSpecimen;
	const dm = rawData?.data?.attributes?.digitalMedia;

	if (!ds) return null;
	return {
		HAS_MEDIA: ds['ods:isKnownToContainMedia'],
		DIGITAL_MEDIA: dm
	}
}