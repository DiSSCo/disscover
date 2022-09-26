/* Import sources */
import AnnotationFilterLayer from 'sources/annotationFilterLayer';


function FilterSpecimen(specimen) {
    let specimenProperties = {
        Other: {}
    };

    for (let property in AnnotationFilterLayer) {
        let propertyInfo;

        if (property in specimen) {
            propertyInfo = { ...AnnotationFilterLayer[property], ...{ value: specimen[property] } };
        } else if (`dwc:${property}` in specimen['data']) {
            propertyInfo = { ...AnnotationFilterLayer[property], ...{ value: specimen['data'][`dwc:${property}`] } };
        } else if (`dcterms:${property}` in specimen['data']) {
            propertyInfo = { ...AnnotationFilterLayer[property], ...{ value: specimen['data'][`dcterms:${property}`] } };
        } else {
            let defaultValue = "Undefined";

            if ('default' in AnnotationFilterLayer[property]) {
                defaultValue = AnnotationFilterLayer[property]['default'];
            }

            propertyInfo = { ...AnnotationFilterLayer[property], ...{ value: defaultValue } };
        }

        CheckRules(property, propertyInfo, Process);
    }

    function Process(property, propertyInfo) {
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

function CheckRules(property, propertyInfo, callback) {
    if (propertyInfo['rules']) {
        propertyInfo['rules'].forEach((rule, _i) => {
            if (propertyInfo['value']) {
                switch (rule) {
                    case "list":
                        if (Array.isArray(propertyInfo['value'])) {
                            propertyInfo['value'] = propertyInfo['value'].join(', ');
                        }
                        break;
                    case "link":
                        
                        propertyInfo['value'] = propertyInfo['value'].link(propertyInfo['value']);
                        break;
                }
            } else {
                propertyInfo['value'] = "Undefined";
            }
        });
    }

    callback(property, propertyInfo);
}

export default FilterSpecimen;