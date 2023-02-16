/* Import Sources */
import AnnotationFilterLayer from 'sources/annotationFilterLayer.json';

/* Import Types */
import { Dict } from 'global/Types';


const FilterSpecimen = (specimen: Dict) => {
    /* Set property as type of JSON */
    type property = keyof typeof AnnotationFilterLayer;

    let specimenProperties: Dict = {
        Other: {}
    };

    for (let property in AnnotationFilterLayer) {
        let propertyInfo;

        if (property in specimen) {
            propertyInfo = { ...AnnotationFilterLayer[property as property], ...{ value: specimen[property], } };
        } else if (`dwc:${property}` in specimen['data']) {
            propertyInfo = { ...AnnotationFilterLayer[property as property], ...{ value: specimen['data'][`dwc:${property}`] } };
        } else if (`dcterms:${property}` in specimen['data']) {
            propertyInfo = { ...AnnotationFilterLayer[property as property], ...{ value: specimen['data'][`dcterms:${property}`] } };
        } else {
            let defaultValue: any = "Undefined";

            if ('default' in AnnotationFilterLayer[property as property]) {
                type d = keyof typeof AnnotationFilterLayer[property];

                defaultValue = AnnotationFilterLayer[property as property]['default' as d];
            }

            propertyInfo = { ...AnnotationFilterLayer[property as property], ...{ value: defaultValue } };
        }

        CheckRules(property, propertyInfo, Process);
    }

    function Process(property: string, propertyInfo: Dict) {
        specimenProperties[propertyInfo['group']] = { ...specimenProperties[propertyInfo['group']], [property]: propertyInfo };
    }

    if (Object.keys(specimenProperties['Other']).length === 0) {
        delete specimenProperties['Other'];
    } else {
        const other = specimenProperties['other'];
        delete specimenProperties['Other'];
        specimenProperties['other'] = other;
    }

    return specimenProperties;
}

function CheckRules(property: string, propertyInfo: Dict, callback: (property: string, propertyInfo: Dict) => void) {
    if (propertyInfo['rules']) {
        propertyInfo['rules'].forEach((rule: string, _i: number) => {
            if (propertyInfo['value'] || propertyInfo['value'] === 'Undefined') {
                switch (rule) {
                    case "list":
                        if (Array.isArray(propertyInfo['value'])) {
                            propertyInfo['value'] = propertyInfo['value'].join(', ');
                        }
                        break;
                    case "link":
                        // if (isValidUrl(propertyInfo['value'])) {
                            propertyInfo['value'] = propertyInfo['value'].link(propertyInfo['value']);
                        // }
                        break;
                    default:
                        break;
                }
            } else {
                propertyInfo['value'] = "Undefined";
            }
        });
    }

    callback(property, propertyInfo);
}

const isValidUrl = (urlString: string) => {
    console.log(urlString);

    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator

    return !!urlPattern.test(urlString);
}

export default FilterSpecimen;