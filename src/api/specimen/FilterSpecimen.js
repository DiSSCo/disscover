/* Import sources */
import AnnotationFilterLayer from 'sources/annotationFilterLayer';


function FilterSpecimen(specimen) {
    let specimenProperties = {
        Other: {}
    };

    for (let property in AnnotationFilterLayer) {
        if (property in specimen) {
            let propertyInfo = { ...AnnotationFilterLayer[property], ...{ value: specimen[property] } };

            if (propertyInfo['rules']) {
                CheckRules(propertyInfo, Process);
            } else {
                Process(propertyInfo);
            }

            function Process(propertyInfo) {
                if (!specimenProperties[propertyInfo['group']]) {
                    specimenProperties[propertyInfo['group']] = {};
                }

                specimenProperties[propertyInfo['group']][property] = propertyInfo;
            }
        } else if (`dwc:${property}` in specimen['data']) {
            let propertyInfo = { ...AnnotationFilterLayer[property], ...{ value: specimen['data'][`dwc:${property}`] } };

            if (propertyInfo['rules']) {
                CheckRules(propertyInfo, Process);
            } else {
                Process(propertyInfo);
            }

            function Process(propertyInfo) {
                if (!specimenProperties[propertyInfo['group']]) {
                    specimenProperties[propertyInfo['group']] = {};
                }

                specimenProperties[propertyInfo['group']][property] = propertyInfo;
            }
        } else if (`dcterms:${property}` in specimen['data']) {
            let propertyInfo = { ...AnnotationFilterLayer[property], ...{ value: specimen['data'][`dcterms:${property}`] } };

            if (propertyInfo['rules']) {
                CheckRules(propertyInfo, Process);
            } else {
                Process(propertyInfo);
            }

            function Process(propertyInfo) {
                if (!specimenProperties[propertyInfo['group']]) {
                    specimenProperties[propertyInfo['group']] = {};
                }

                specimenProperties[propertyInfo['group']][property] = propertyInfo;
            }
        } else {
            let defaultValue;

            if ('default' in AnnotationFilterLayer[property]) {
                defaultValue = AnnotationFilterLayer[property]['default'];
            } else {
                defaultValue = 'Undefined';
            }

            let propertyInfo = { ...AnnotationFilterLayer[property], ...{ value: defaultValue } };

            if (!specimenProperties[propertyInfo['group']]) {
                specimenProperties[propertyInfo['group']] = {};
            }

            specimenProperties[propertyInfo['group']][property] = propertyInfo;
        }
    }

    function CheckRules(propertyInfo, callback) {
        propertyInfo['rules'].forEach((rule, _i) => {
            if (propertyInfo['value']) {
                switch (rule) {
                    case "list":
                        propertyInfo['value'] = propertyInfo['value'].join(', ');
                    case "link":
                        propertyInfo['value'] = propertyInfo['value'].link(propertyInfo['value']);
                }
            } else {
                propertyInfo['value'] = "Undefined";
            }
        });

        callback(propertyInfo);
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

export default FilterSpecimen;