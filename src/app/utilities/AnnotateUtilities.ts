/* Import Dependencies */
import { W3CImageAnnotation } from '@annotorious/annotorious';
import { format } from 'date-fns';
import jp from 'jsonpath';
import { cloneDeep, isEmpty, toLower } from 'lodash';

/* Import Utilities */
import { CheckForClassDefaultValues } from './ClassAnnotationUtilities';
import { ExtractLowestLevelSchema, ExtractClassesAndTermsFromSchema, MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';

/* Import Types */
import { Annotation } from 'app/types/Annotation';
import { AnnotationFormProperty, AnnotationTarget, AnnotationTemplate, ParentClass, Dict, SuperClass } from "app/Types";


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
 * - coordinates: Potential coordinates supplied for a visual annotation
 */
const ConstructAnnotationObject = (params: {
    digitalObjectId: string,
    digitalObjectType: string,
    motivation: 'ods:adding' | 'ods:deleting' | 'oa:assessing' | 'oa:editing' | 'oa:commenting',
    annotationTargetType: 'term' | 'class' | 'ROI',
    jsonPath?: string,
    annotationValues: (string | Dict)[],
    fragments?: {
        xFrac: number,
        yFrac: number,
        widthFrac: number,
        heightFrac: number
    }
}): AnnotationTemplate => {
    const { digitalObjectId, digitalObjectType, motivation, annotationTargetType, jsonPath, annotationValues, fragments } = params;

    let localJsonPath: string = jsonPath?.replaceAll("'", '"') ?? '';

    /* If motivation is adding, check for new index at end of JSON path and remove if it is there */
    if (motivation === 'ods:adding') {
        if (jsonPath && typeof (jp.parse(jsonPath).at(-1).expression.value) === 'number') {
            localJsonPath = jp.stringify(jp.parse(jsonPath).slice(0, -1));
        }
    }

    /* Define target type DOI */
    let targetTypeDoi: string = '';

    if (digitalObjectType === 'ods:DigitalSpecimen') {
        targetTypeDoi = 'https://doi.org/21.T11148/894b1e6cad57e921764e';
    } else if (digitalObjectType === 'ods:DigitalMedia') {
        targetTypeDoi = 'https://doi.org/21.T11148/bbad8c4e101e8af01115';
    }

    /* Define target of annotation */
    const annotation: AnnotationTemplate = {
        "oa:motivation": motivation,
        "oa:motivatedBy": '',
        "oa:hasTarget": {
            "@id": digitalObjectId,
            "@type": digitalObjectType,
            "dcterms:identifier": digitalObjectId,
            "ods:fdoType": targetTypeDoi,
            "oa:hasSelector": {
                ...(annotationTargetType === 'term' && {
                    "@type": 'ods:TermSelector',
                    "ods:term": localJsonPath
                }),
                ...(annotationTargetType === 'class' && {
                    "@type": 'ods:ClassSelector',
                    "ods:class": localJsonPath
                }),
                ...((annotationTargetType === 'ROI' && fragments) && {
                    "@type": 'oa:FragmentSelector',
                    "ac:hasROI": {
                        "ac:xFrac": fragments.xFrac,
                        "ac:yFrac": fragments.yFrac,
                        "ac:widthFrac": fragments.widthFrac,
                        "ac:heightFrac": fragments.heightFrac
                    },
                    "dcterms:conformsTo": 'https://ac.tdwg.org/termlist/#711-region-of-interest-vocabulary'
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
    superClass: SuperClass
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

        if (parentName.includes('has') && parentName.at(-1) === 's') {
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
const GenerateAnnotationFormFieldProperties = async (jsonPath: string, superClass: SuperClass, schemaName: string, motivation: string) => {
    const annotationFormFieldProperties: {
        [propertyName: string]: AnnotationFormProperty
    } = {};
    const formValues: Dict = {};

    /* Extract main schema */
    const schema: Dict | undefined = await ExtractLowestLevelSchema(jsonPath, schemaName);
    const { classesList, termsList, termValue } = await ExtractClassesAndTermsFromSchema(schema ?? {}, jsonPath);

    /**
     * Function to push to the local class values in the nested levels of the upcoming loop below
     * @param Push Function to push to the local class values array
     */
    const PushToLocalClassValues = (parentValues: Dict | undefined, childFieldName: string, Push: Function) => {
        if (Array.isArray(parentValues)) {
            parentValues?.filter((parentValue: Dict) => parentValue[childFieldName]).forEach((parentValue: Dict) => {
                Push(parentValue[childFieldName]);
            });
        } else if (parentValues?.[childFieldName]) {
            Push(parentValues[childFieldName]);
        }
    };

    /**
     * Function to check for a default value for a term
     * @param key The term key to check
     */
    const CheckForTermDefaultValue = (key: string) => {
        if (toLower(key).includes('date')) {
            return format(new Date, 'yyyy-MM-dd');
        }
    };

    /**
     * Function to depict the values to be set for the class to be annotated
     * @param fieldName The field name of the class (parsed from JSON path)
     * @param classValues Possible existing class values from the super class
     * @param isArray Boolean indicating if the class represents an array
     * @param localClassValues Possible existing local class values of an annotation
     */
    const DepictClassValues = (fieldName: string, classValues: Dict | Dict[] | undefined, isArray?: boolean, localClassValues?: Dict[]) => {
        if (classValues) {
            return classValues;
        } else if (!isEmpty(localClassValues)) {
            return localClassValues;
        } else if (motivation === 'ods:adding' && isArray) {
            return [CheckForClassDefaultValues(fieldName)];
        } else if (motivation === 'ods:adding') {
            return CheckForClassDefaultValues(fieldName) ?? {};
        }
    };

    /* For each class, add it as a key property to the annotation form fields dictionary */
    classesList.forEach(classProperty => {
        if (!termValue) {
            const localPath: string = jp.parse(classProperty.value).pop().expression.value;

            annotationFormFieldProperties[classProperty.label] = {
                key: classProperty.key,
                name: classProperty.label,
                jsonPath: classProperty.value.replace(`$`, jsonPath),
                type: (localPath.at(-1) === 's') ? 'array' : 'object',
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

                formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = {};

                /* Check if (default) values are present, if so, set form values property with them */
                formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = DepictClassValues(
                    classProperty.value.replace(`$`, jsonPath), classFormValues
                );

            } else if (classProperty.value.includes('has') && classProperty.value.at(-3) === 's') {
                let localClassValues: Dict[] = classValues ?? [];

                if (!classValues && (Array.isArray(classValues) && classValues[0])) {
                    const parentFieldName: string = classProperty.value.replace(`$`, jsonPath).split('[').slice(0, -1).join('[');
                    const parentValues: Dict | undefined = jp.value(superClass, parentFieldName);
                    const childFieldName: string = classProperty.value.split('[').pop()?.replace(']', '').replaceAll("'", '') ?? '';

                    PushToLocalClassValues(parentValues, childFieldName, (value: Dict) => localClassValues?.push(value));
                }

                formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = [];

                /* Check if (default) values are present, if so, set form values property with them */
                formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = DepictClassValues(
                    classProperty.value.replace(`$`, jsonPath), classValues, true, localClassValues
                );
            } else {
                formValues[FormatFieldNameFromJsonPath(classProperty.value.replace(`$`, jsonPath))] = CheckForClassDefaultValues(classProperty.value.replace(`$`, jsonPath)) ?? {};
            }

            /* For each term of class, add it to the properties array of the corresponding class in the annotation form fields dictionary */
            const termProperties = termsList.find(termsListOption => termsListOption.label === classProperty.label);

            termProperties?.options.forEach(termOption => {
                /* Add to properties of class */
                annotationFormFieldProperties[classProperty.label].properties?.push({
                    key: termOption.key,
                    name: termOption.label,
                    jsonPath: termOption.value,
                    type: termOption.type,
                    ...(termOption.enum && { enum: termOption.enum })
                });

                /* Check if the term field needs to be filled with a default value */
                if (CheckForTermDefaultValue(termOption.key) && !(termOption.key in classFormValues)) {
                    classFormValues[termOption.key] = CheckForTermDefaultValue(termOption.key);
                }
            });
        } else {
            /* Treat upper parent as term and set annotation form value */
            formValues.value = jp.value(superClass, termValue.value) ?? CheckForTermDefaultValue(termValue.key) ?? '';

            /* Set term record as sole annotation form field property */
            annotationFormFieldProperties[termValue.key] = {
                key: termValue.key,
                name: termValue.label,
                jsonPath: termValue.value,
                type: schema?.type ?? 'string',
                ...(termValue.enum && { enum: termValue.enum })
            };
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
                if (key.includes('has') && key.at(-1) === 's') {
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

/**
 * Function to reformat an annotation to the Annotorious format
 * @param annotation The annotation to reformat
 * @param mediaUrl The URL pointing to the source of the media
 * @param imageDimenstions An object containg the x and y dimensions of the image
 * @returns Annotation according to Annotorious format
 */
const ReformatToAnnotoriousAnnotation = (annotation: Annotation, mediaUrl: string, imageDimenstions: { x: number, y: number }) => {
    let annotoriousAnnotation: W3CImageAnnotation = {} as W3CImageAnnotation;

    /* Check if the annotation is a visual one and */
    if (annotation['oa:hasTarget']['oa:hasSelector']?.['@type'] === 'oa:FragmentSelector') {
        /* Calculate the W3C pixels relative to the TDWG AC position */
        const ROI = annotation['oa:hasTarget']['oa:hasSelector']['ac:hasROI'] as {
            "ac:xFrac": number,
            "ac:yFrac": number,
            "ac:widthFrac": number,
            "ac:heightFrac": number
        };

        const x = ROI["ac:xFrac"] * imageDimenstions.x;
        const y = ROI["ac:yFrac"] * imageDimenstions.y;
        const w = ROI["ac:widthFrac"] * imageDimenstions.x;
        const h = ROI["ac:heightFrac"] * imageDimenstions.y;

        annotoriousAnnotation = {
            id: annotation['@id'],
            "@context": 'http://www.w3.org/ns/anno.jsonld',
            type: 'Annotation',
            body: [{
                type: 'TextualBody',
                value: annotation['oa:hasBody']?.['oa:value'][0] ?? '',
                purpose: 'commenting',
                creator: {
                    id: annotation['dcterms:creator']['@id'] ?? ''
                }
            }],
            target: {
                selector: {
                    conformsTo: 'http://www.w3.org/TR/media-frags/',
                    type: 'FragmentSelector',
                    value: `xywh=pixel:${x},${y},${w},${h}`
                },
                source: mediaUrl
            }
        };
    }

    return annotoriousAnnotation;
};

const AnnotationFormFields = (topic: string) : string[] => {
    switch (topic) {
        case 'TaxonIdentification':
            return ['dwc:kingdom', 'dwc:phylum', 'dwc:class', 'dwc:order', 'dwc:family', 'dwc:genus', 'dwc:scientificName'];
        case 'Georeference':
            return ['dwc:geodeticDatum', 'dwc:decimalLatitude', 'dwc:decimalLongitude', 'dwc:coordinateUncertaintyInMeters', 'dwc:verbatimCoordinates', 'dwc:coordinatePrecision'];
        default:
            return [];
    }
};

/**
 * Filters and reorders properties for specific annotation classes.
 * For 'Taxon Identification', it moves 'dwc:scientificName' to the end.
 * This function mutates the properties of the found annotation class.
 * @param annotationFormFieldProperties The properties object to modify.
 */
const FilterAndReorderAnnotationProperties = (
    annotationFormFieldProperties: { [propertyName: string]: AnnotationFormProperty },
) => {
    /* Defines which class we are currently annotating based on the jsonPath, i.e. Georeference and sets the specific form fields */
    const currentAnnotationClassEntry = Object.entries(annotationFormFieldProperties).find(item => 
        item[1].jsonPath.includes('Taxon') || item[1].jsonPath.includes('Georeference'));

    if (!currentAnnotationClassEntry) {
        return;
    }

    const currentAnnotationClass = currentAnnotationClassEntry[1];

    /* Set the form properties to expectedProperties if the user is trying to annotate either the Taxon Identification or Georeference */
    if (currentAnnotationClass.properties) {
        const props = currentAnnotationClass.properties.filter(prop =>
            AnnotationFormFields(currentAnnotationClass.key)?.includes(prop.key)
        );

        if (currentAnnotationClass.key === 'Taxon Identification') {
            /* Recreating the props array by adding scientificName at the end for the UI */
            const scientificNameProp = props.find(p => p.key === 'dwc:scientificName');
            const otherProps = props.filter(p => p.key !== 'dwc:scientificName');
            currentAnnotationClass.properties = scientificNameProp
                ? [...otherProps, scientificNameProp]
                : otherProps;
        } else {
            currentAnnotationClass.properties = props;
        }
    }
};

export {
    ConstructAnnotationObject,
    ExtractParentClasses,
    FormatFieldNameFromJsonPath,
    FormatJsonPathFromFieldName,
    GenerateAnnotationFormFieldProperties,
    GetAnnotationMotivations,
    ProcessAnnotationValues,
    ProvideReadableMotivation,
    ReformatToAnnotoriousAnnotation,
    AnnotationFormFields,
    FilterAndReorderAnnotationProperties
};