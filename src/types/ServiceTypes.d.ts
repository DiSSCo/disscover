/* Interface for the POST request for creating a new Virtual Collection */
export interface NewVirtualCollectionRequest {
    data: {
        type: string,
        attributes: {
            "ltc:collectionName": string,
            "ltc:description": string,
            "ltc:basisOfScheme": string,
            "ods:hasTargetDigitalObjectFilter": {
                "ods:predicateType": string,
                "ods:predicateKey": string,
                "ods:predicateValues": string[]
            }
        }
    }
}