/* Import schemas */
import DIGITAL_SPECIMEN_SCHEMA_MAP from "./schemas/DigitalSpecimenSchema";

/* Define interfaces */
interface UIProperty {
    label: string;
    value: any;
    isHtml: boolean;
    type: string;
}

interface DigitalSpecimenUIModel {
    SPECIMEN_RECORD: Record<string, UIProperty>;
    IDENTIFICATION: Record<string, UIProperty>;
    LOCATION: Record<string, UIProperty>;
    COLLECTING_EVENT: Record<string, UIProperty>;
    CITATION_LICENSE: Record<string, UIProperty>;
}

/**
 * Transforms raw Digital Specimen data into a UI-ready model 
 * based on the DIGITAL_SPECIMEN_SCHEMA_MAP definitions.
 * It is executed in the useDigitalSpecimen hook immediately when the call is being done.
 */
export const mapDigitalSpecimen = (rawData: any): DigitalSpecimenUIModel | null => {
    const ds = rawData?.data?.attributes?.digitalSpecimen;
    
    if (!ds) return null;
  
    let digitalSpecimenUiDataModel = {};
  
    Object.entries(DIGITAL_SPECIMEN_SCHEMA_MAP).forEach(([fragmentKey, fields]) => {
		digitalSpecimenUiDataModel[fragmentKey] = {};
	
		Object.entries(fields).forEach(([fieldKey, config]) => {
			digitalSpecimenUiDataModel[fragmentKey][fieldKey] = {
                label: config.label,
                value: config.resolve(ds),
                isHtml: config.isHtml || false,
                type: config.type || 'base',
			};
		});
    });

    return digitalSpecimenUiDataModel as DigitalSpecimenUIModel;
};
