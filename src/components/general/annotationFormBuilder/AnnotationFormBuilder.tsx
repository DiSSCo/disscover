/* Import Dependencies */
import { ExtractFromSchema } from 'app/utilities/AnnotationUtilities';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import PropertyField from './PropertyField';
import PropertyFieldArray from './PropertyFieldArray';


const AnnotationFormBuilder = (properties: Dict, targetClass: string, propertyData?: Dict[]) => {
    /* Base variables */
    const initialValues: Dict = {};
    const formFields: {
        [propertyName: string]: {
            title: string,
            template: string,
            fields: JSX.Element[]
        }
    } = {
        ['main']: {
            title: targetClass,
            template: 'object',
            fields: []
        }
    };

    /* Function to check for a current value of a property */
    const CheckForCurrentValue = (propertyName: string, level?: string, subLevel?: string) => {
        let currentValue = '';

        /* Check if this is an Annotation on an existing instance, otherwise there is no current value */
        if (propertyData) {
            if (level && subLevel) {
                currentValue = propertyData[0][subLevel][level][propertyName] ?? '';
            } else if (level) {
                currentValue = propertyData[0][level][propertyName] ?? '';
            } else {
                currentValue = propertyData[0][propertyName] ?? '';
            }
        }

        return currentValue;
    }

    /* Function to push or unshift to form fields */
    const PushUnshiftToFormFields = (currentValue: any, formField: JSX.Element, level?: string) => {
        if (currentValue) {
            if (level) {
                formFields[level as keyof typeof formFields].fields.unshift(formField);
            } else {
                formFields['main'].fields.unshift(formField);
            }
        } else {
            if (level) {
                formFields[level as keyof typeof formFields].fields.push(formField);
            } else {
                formFields['main'].fields.push(formField);
            }
        }
    }

    /* Function for constructing form */
    const ConstructForm = (properties: Dict, level?: string, subLevel?: string) => {
        /* For each class property, add to object as initial value for form */
        for (const propertyName in properties) {
            const property: Dict = properties[propertyName as keyof typeof properties];

            /* Check type of property */
            if (property.type && ['string', 'integer', 'number', 'boolean'].includes(property.type)) {
                /* Add to initial values */
                if (level && subLevel) {
                    initialValues[subLevel][level][propertyName] = CheckForCurrentValue(propertyName, level, subLevel);

                    /* Construct a Property Field and add to array of form fields */
                    const formField = <PropertyField key={propertyName}
                        name={'classProperties.' + `${subLevel ? `${subLevel}.` : ''}` + `${level ? `${level}.` : ''}` + propertyName}
                    />;

                    PushUnshiftToFormFields(initialValues[subLevel][level][propertyName], formField, level);
                } else if (level) {
                    initialValues[level][propertyName] = CheckForCurrentValue(propertyName, level, subLevel);

                    /* Construct a Property Field and add to array of form fields */
                    const formField = <PropertyField key={propertyName}
                        name={'classProperties.' + `${subLevel ? `${subLevel}.` : ''}` + `${level ? `${level}.` : ''}` + propertyName}
                    />;

                    PushUnshiftToFormFields(initialValues[level][propertyName], formField, level);
                } else {
                    initialValues[propertyName] = CheckForCurrentValue(propertyName, level, subLevel);

                    /* Construct a Property Field and add to array of form fields */
                    const formField = <PropertyField key={propertyName}
                        name={'classProperties.' + `${subLevel ? `${subLevel}.` : ''}` + `${level ? `${level}.` : ''}` + propertyName}
                    />

                    PushUnshiftToFormFields(initialValues[propertyName], formField);
                }
            } else if (property.type && property.type === 'array') {
                /* Add to initial values */
                initialValues[`${level ? `${level}.` : ''}${propertyName}`] = [];

                /* Construct a Property Field Array */
                formFields[propertyName] = {
                    title: propertyName,
                    template: 'array',
                    fields: [
                        <PropertyFieldArray key={propertyName}
                            name={'classProperties.' + `${subLevel ? `${subLevel}.` : ''}` + `${level ? `${level}.` : ''}` + propertyName}
                        />
                    ]
                };
            } else {
                /* Add sub class to initial values */
                if (level) {
                    initialValues[level][propertyName] = {};
                } else {
                    initialValues[propertyName] = {};
                }

                /* Push a record to the form fields for this level */
                formFields[propertyName] = {
                    title: propertyName,
                    template: 'object',
                    fields: []
                };

                /* Get properties from schema */
                const properties = ExtractFromSchema(propertyName);

                ConstructForm(properties, propertyName, level && level);
            }
        }
    }

    ConstructForm(properties);

    return {
        initialValues: initialValues,
        formFields: formFields
    };
}

export default AnnotationFormBuilder;