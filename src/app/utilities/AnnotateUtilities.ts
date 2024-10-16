/* Import Dependencies */
import jp from 'jsonpath';
import { isEmpty, cloneDeep } from 'lodash';

/* Import Utilities */
import { ExtractLowestLevelSchema, ExtractClassesAndTermsFromSchema, MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { DigitalMedia } from "app/types/DigitalMedia";
import { AnnotationFormProperty, AnnotationTarget, AnnotationTemplate, ParentClass, Dict } from "app/Types";


/* Utilities associated with annotating */


/**
 * Function to construct an annotation object based on the provided information
 * @param params Paramets to pass to the function, consisting of:
 * - digitalObjectId: The idenfitier of the targeted digital object
 * - digitalObjectType: The type of the targeted digital object
 * - motivation: The motivation used for annotating
 * - annotationTargetType: The type of the annotation target, being term, class or ROI
 * - jsonPath: The JSON path towards the annotation target
 * - annotationValues: An array of processed value from the annotation form
 */
const ConstructAnnotationObject = (params: {
    digitalObjectId: string,
    digitalObjectType: string,
    motivation: 'ods:adding' | 'ods:deleting' | 'oa:assessing' | 'oa:editing' | 'oa:commenting',
    annotationTargetType: 'term' | 'class' | 'ROI',
    jsonPath: string,
    annotationValues: (string | Dict)[]
}): AnnotationTemplate => {
    const { digitalObjectId, digitalObjectType, motivation, annotationTargetType, jsonPath, annotationValues } = params;

    let localJsonPath: string = jsonPath;

    /* If motivation is adding, check for new index at end of JSON path and removeif it is there */
    if (typeof (jp.parse(jsonPath).at(-1).expression.value) === 'number') {
        localJsonPath = jp.stringify(jp.parse(jsonPath).slice(0, -1));
    }

    /* Define target of annotation */
    const annotation: AnnotationTemplate = {
        "oa:motivation": motivation,
        "oa:motivatedBy": '',
        "oa:hasTarget": {
            "@id": digitalObjectId,
            "@type": digitalObjectType,
            "ods:ID": digitalObjectId,
            "ods:type": digitalObjectType,
            "oa:hasSelector": {
                ...(annotationTargetType === 'term' && {
                    "@type": 'ods:FieldSelector',
                    "ods:field": localJsonPath
                }),
                ...(annotationTargetType === 'class' && {
                    "@type": 'ods:ClassSelector',
                    "ods:class": localJsonPath
                }),
                ...(annotationTargetType === 'ROI' && {
                    "@type": 'oa:FragmentSelector',
                    "ac:hasROI": {
                        "ac:xFrac": 0,
                        "ac:yFrac": 0,
                        "ac:widthFrac": 0,
                        "ac:heightFrac": 0
                    },
                    "dcterms:conformsTo": ''
                })
            }
        },
        "oa:hasBody": {
            "oa:value": annotationValues
        }
    };

    return annotation;
};

/**
 * Function to extract parent classes from a given super class and provide all their associated information
 * @param params An object containing: the annotationTarget, superClass and parentClasses properties
 * @returns The extracted parent classes
 */
const ExtractParentClasses = (params: {
    annotationTarget: AnnotationTarget,
    superClass: DigitalSpecimen | DigitalMedia | Dict
}) => {
    const { annotationTarget, superClass } = params;

    /* Base variables */
    const pathArray: string[] = ['$'];
    const parents = jp.parse(annotationTarget.jsonPath).slice(1, -1);
    const parentClasses: ParentClass[] = [];

    /* For each parant, find and extract its class information */
    parents.forEach((parent, index) => {
        /* Filter path from schemas */
        let parentName = parent.expression.value.replace(/^[^:]+:/g, '');

        /* Add to pathArray */
        pathArray.push(parent.expression.value);

        if (parentName.includes('has')) {
            /* If a parent class is empty, it needs to be targeted, if it is not completely empty, check for indexes */
            const parentNodes = jp.nodes(superClass, jp.stringify(pathArray).replaceAll('][', ']..[').replaceAll('"', "'"));

            if (!parentNodes.length) {
                parentClasses.push({
                    jsonPath: jp.stringify(pathArray).replaceAll('"', "'"),
                    name: MakeJsonPathReadableString(jp.stringify(pathArray)),
                    ...(index > 0 && { parentName: pathArray[index] }),
                    present: false
                });
            }

            parentNodes.forEach((parentNode, parentIndex) => {
                parentClasses.push({
                    jsonPath: jp.stringify(parentNode.path).replaceAll('"', "'"),
                    name: MakeJsonPathReadableString(jp.stringify(parentNode.path)),
                    ...(index > 0 && { parentName: MakeJsonPathReadableString(pathArray[index]) }),
                    present: (Array.isArray(parentNode.value) && !!parentNode.value.length) || (!Array.isArray(parentNode.value) && typeof (parentNode.value) === 'object'),
                    ...(parentNode.value.length && { options: parentNode.value.length }),
                    ...(parentClasses[parentIndex]?.options && { dependent: true })
                });
            });
        }
    });

    return parentClasses;
};

/**
 * Function that formats a JSON path string and replaces the connections with lower dashes
 * @param jsonPath The provided JSON path
 * @returns Formatted JSON path string replacing connections with lower dashes
 */
const FormatFieldNameFromJsonPath = (jsonPath: string): string => {
    return jsonPath.replaceAll('][', '_').replaceAll(/[\][]/g, '');
};

/**
 * Function that formats a lower dash separated field name to a valid JSON path
 * @param fieldName The provided field name
 * @returns JSON path string
 */
const FormatJsonPathFromFieldName = (fieldName: string): string => {
    const splitArray: (string | number)[] = fieldName.replaceAll(/['$]/g, '').split('_');

    splitArray.forEach((value, index) => {
        if (!isNaN(value as number)) {
            splitArray[index] = Number(value);
        }
    });

    return jp.stringify(splitArray);
};

/**
 * Function to generate and return a dictionary containing all classes and terms of the schema adhering to the provided schema name; and their values
 * @param jsonPath The JSON path that leads to the schema to be used
 * @param superClass The provided super class
 * @param schemaName The name of the base schema
 * @returns The annotation form field properties and their associated form values
 */
const GenerateAnnotationFormFieldProperties = async (jsonPath: string, superClass: DigitalSpecimen | DigitalMedia | Dict, schemaName: string) => {
    const annotationFormFieldProperties: {
        [propertyName: string]: AnnotationFormProperty
    } = {};
    const formValues: Dict = {};

    /* Extract main schema */
    const schema: Dict | undefined = await ExtractLowestLevelSchema(jsonPath, schemaName);
    const { classesList, termsList, termValue } = await ExtractClassesAndTermsFromSchema(schema ?? {}, jsonPath);

    /* For each class, add it as a key property to the annotation form fields dictionary */
    classesList.forEach(classProperty => {
        if (!termValue) {
            const localPath: string = jp.parse(classProperty.value).pop().expression.value;

            annotationFormFieldProperties[classProperty.label] = {
                key: classProperty.key,
                name: classProperty.label,
                jsonPath: classProperty.value.replace(`$`, jsonPath),
                type: localPath.includes('has') ? 'array' : 'object',
                properties: []
            };

            /* Add class values to form values */
            const classValues: Dict | Dict[] = jp.value(superClass, classProperty.value.replace(`$`, jsonPath));
            const classFormValues: Dict = { ...classValues };

            if (!Array.isArray(classValues) && classValues) {
                Object.entries(classValues).forEach(([key, value]) => {
                    if (typeof (value) === 'object') {
                        delete classFormValues[key];
                    }
                });

                formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = classFormValues ?? {};
            } else if (classProperty.value.includes('has')) {
                formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = classValues ?? [];
            } else {
                formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = {};
            }

            /* For each term of class, add it to the properties array of the corresponding class in the annotation form fields dictionary */
            const termProperties = termsList.find(termsListOption => termsListOption.label === classProperty.label);

            termProperties?.options.forEach(termOption => {
                annotationFormFieldProperties[classProperty.label].properties?.push({
                    key: termOption.key,
                    name: termOption.label,
                    jsonPath: termOption.value,
                    type: 'string'
                });
            });
        } else {
            /* Treat upper parent as term and set annotation form value */
            formValues.value = jp.value(superClass, termValue.value);
        }
    });

    return {
        annotationFormFieldProperties,
        newFormValues: formValues
    };
};

/**
 * Function that returns all of the annotation motivations as options (excluding deletion as this is handled systematically)
 * @param givenMotivation An already selected motivation that impacts the choice in motivation
 */
const GetAnnotationMotivations = (givenMotivation?: string, targetType?: string) => ({
    ...((givenMotivation === 'ods:adding' || givenMotivation === '*') && { 'ods:adding': 'Addition' }),
    'oa:assessing': 'Assessment',
    ...((targetType !== 'superClass') && { 'oa:editing': "Modification" }),
    'oa:commenting': "Comment",
    ...(givenMotivation === '*' && { 'ods:deleting': "Deletion" })
});

/**
 * Function to process given annotation values into a fully fletched annotation object
 * @param annotationValues The values provided via the annotation form
 */
const ProcessAnnotationValues = (baseJsonPath: string, annotationValues: {
    [className: string]: {
        [termName: string]: string
    }
}) => {
    let annotationObject: Dict = {};

    Object.entries(annotationValues).sort((a, b) =>
        a[0].replace(/[^_]/g, "").length > b[0].replace(/[^_]/g, "").length ? 1 : 0
    ).forEach(([fieldName, annotationValue]) => {
        if (!isEmpty(annotationValue)) {
            /* Format field name into JSON path */
            const jsonPath = `${FormatJsonPathFromFieldName(fieldName).replaceAll('"', "'")}`;
            const localAnnotationValue = cloneDeep(annotationValue);

            /* Remove objects and arrays with objects from value */
            Object.keys(annotationValue).forEach(key => {
                if (key.includes('has')) {
                    delete localAnnotationValue[key];
                }
            });

            /* If value is present and path is root, append directly to root object, otherwise use JSON path minus base JSON path if value is present */
            if (!isEmpty({ ...localAnnotationValue }) && jsonPath === baseJsonPath) {
                annotationObject = {
                    ...annotationObject,
                    ...localAnnotationValue
                }
            } else if (!isEmpty({ ...localAnnotationValue })) {
                /* Set provided value according to JSON path in object */
                jp.value(annotationObject, `$${jsonPath.replace(baseJsonPath, '')}`, localAnnotationValue);
            }
        }
    });

    return annotationObject;
};

/**
 * Function to provide a readable motivation based on the motivation vocabulary
 * @param motivation The motivation to transcribe
 * @returns Readable motivation string
 */
const ProvideReadableMotivation = (motivation: 'ods:adding' | 'ods:deleting' | 'oa:assessing' | 'oa:editing' | 'oa:commenting') => {
    const annotationMotivations = {
        'ods:adding': 'Addition',
        'ods:deleting': 'Deletion',
        'oa:assessing': "Assessment",
        'oa:editing': "Modification",
        "oa:commenting": "Comment"
    };

    return annotationMotivations[motivation];
};

export {
    ConstructAnnotationObject,
    ExtractParentClasses,
    FormatJsonPathFromFieldName,
    GenerateAnnotationFormFieldProperties,
    GetAnnotationMotivations,
    ProcessAnnotationValues,
    ProvideReadableMotivation
};