/* Import sources */
import AnnotationFilterLayer from 'sources/annotationFilterLayer';


function FilterSpecimen(specimen) {
    let specimenProperties = {
        Other: {}
    };

    console.log(specimen);

    for (let authProperty in specimen['ods:authoritative']) {
        authProperty = authProperty.replace('ods:', '');

        if (AnnotationFilterLayer[authProperty]) {
            let propertyInfo = { ...AnnotationFilterLayer[authProperty], ...{ value: specimen['ods:authoritative']['ods:' + authProperty] } };

            if (propertyInfo['rules']) {
                CheckRules(propertyInfo, Process);
            } else {
                Process(propertyInfo);
            }

            function Process(propertyInfo) {
                if (!specimenProperties[propertyInfo['group']]) {
                    specimenProperties[propertyInfo['group']] = {};
                }

                specimenProperties[propertyInfo['group']][authProperty] = propertyInfo;
            }
        } else {
            specimenProperties['Other'][authProperty] = {
                displayName: authProperty,
                annotatable: true,
                value: specimen['ods:authoritative']['ods:' + authProperty]
            }
        }
    }

    for (const property in specimen['ods:unmapped']) {
        if (AnnotationFilterLayer[property]) {
            let propertyInfo = { ...AnnotationFilterLayer[property], ...{ value: specimen['ods:unmapped'][property] } };

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
            specimenProperties['Other'][property] = {
                displayName: property,
                annotatable: true,
                value: specimen['ods:unmapped'][property]
            }
        }
    }

    function CheckRules(propertyInfo, callback) {
        propertyInfo['rules'].forEach((rule, _i) => {
            switch (rule) {
                case "list":
                    propertyInfo['value'] = propertyInfo['value'].join(', ');
            }
        });

        callback(propertyInfo);
    }

    // console.log(specimenProperties);
    return specimenProperties;
}

export default FilterSpecimen;