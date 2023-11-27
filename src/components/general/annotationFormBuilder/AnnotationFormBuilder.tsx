/* Import Dependencies */
import { Field, FieldArray } from 'formik';
import { ExtractFromSchema } from 'app/utilities/AnnotationUtilities';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import PropertyField from './PropertyField';
import PropertyFieldArray from './PropertyFieldArray';


const AnnotationFormBuilder = (properties: Dict, formValues: Dict = {}) => {
    /* Base variables */
    const initialValues: Dict = {};
    const formFields: JSX.Element[] = [];

    /* Function for constructing form */
    const ConstructForm = (properties: Dict, level?: string, subLevel?: string) => {
        /* For each class property, add to object as initial value for form */
        for (const propertyName in properties) {
            const property: Dict = properties[propertyName as keyof typeof properties];

            /* Check type of property */
            if (property.type && ['string', 'integer', 'number', 'boolean'].includes(property.type)) {
                /* Add to initial values */
                if (level && subLevel) {
                    initialValues[subLevel][level][propertyName] = '';
                } else if (level) {
                    initialValues[level][propertyName] = '';
                } else {
                    initialValues[propertyName] = '';
                }

                /* Construct a Property Field and add to array of form fields */
                formFields.push(<PropertyField key={propertyName}
                    name={'classProperties.' + `${subLevel ? `${subLevel}.` : ''}` + `${level ? `${level}.` : ''}` + propertyName}
                />);
            } else if (property.type && property.type === 'array') {
                /* Add to initial values */
                initialValues[`${level ? `${level}.` : ''}${propertyName}`] = [];

                /* Construct a Property Field Array */
                formFields.push(<PropertyFieldArray key={propertyName}
                    name={'classProperties.' + `${subLevel ? `${subLevel}.` : ''}` + `${level ? `${level}.` : ''}` + propertyName}
                />);
            } else {
                /* Add sub class to initial values */
                if (level) {
                    initialValues[level][propertyName] = {};
                } else {
                    initialValues[propertyName] = {};
                }

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