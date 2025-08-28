/* Types */
interface ClassificationItem {
    rank: string;
    label: string;
    labelHtml?: string;
}

interface Usage {
    label?: string;
    labelHtml?: string;
    name?: {
        authorship?: string;
        specificEpithet?: string;
        infragenericEpithet?: string;
    };
}

interface TaxonomicIdentificationItem {
    id?: string | number;
    classification?: ClassificationItem[];
    usage?: Usage;
}

const TaxonomicIdentificationMapper = (taxonomicTree: TaxonomicIdentificationItem, [key, value]: [string, any]) => {
    const classificationItem = taxonomicTree?.classification?.find(
        (classification) => classification.rank === key.replace(/^(dwc:|ods:)/, '')
    );

    switch (key) {
        case 'dwc:scientificName':
            return taxonomicTree?.usage?.label;
        case '@id':
        case 'dwc:taxonID':
            return `https://www.checklistbank.org/dataset/3/taxon/${taxonomicTree?.id}`;
        case 'ods:scientificNameHTMLLabel':
            return taxonomicTree?.usage?.labelHtml;
        case 'ods:genusHTMLLabel':
        case 'ods:speciesHTMLLabel':
            return classificationItem?.labelHtml;
        case 'dwc:scientificNameAuthorship':
            return taxonomicTree?.usage?.name?.authorship;
        case 'dwc:specificEpithet':
            return taxonomicTree?.usage?.name?.specificEpithet;
        case 'dwc:infragenericEpithet':
            return taxonomicTree?.usage?.name?.infragenericEpithet;
        default:
            if (classificationItem) {
                return classificationItem.label;
            }
            return value;
    }
}

export {
    TaxonomicIdentificationMapper
};