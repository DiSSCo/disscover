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

    // if (specimen['ods:images']) {
    //     if (!specimenProperties['Media']) {
    //         specimenProperties['Media'] = [];
    //     }

    //     specimen['ods:images'].forEach((image, _i) => {
    //         if (specimenProperties['Media']['images']) {
    //             specimenProperties['Media']['images'].push(image['ods:imageURI']);
    //         } else {
    //             specimenProperties['Media']['images'] = [image['ods:imageURI']];
    //         }
    //     });
    // }

    function CheckRules(propertyInfo, callback) {
        propertyInfo['rules'].forEach((rule, _i) => {
            switch (rule) {
                case "list":
                    if (propertyInfo['value']) {
                        propertyInfo['value'] = propertyInfo['value'].join(', ');
                    } else {
                        propertyInfo['value'] = 'Undefined';
                    }
            }
        });

        callback(propertyInfo);
    }

    return specimenProperties;
}

export default FilterSpecimen;