/* Import Types */
import { Dict } from "app/Types";


/* Utilities associated with the tour functionality */


/**
 * Function for handling the annotation wizard tour trigger
 * @param tourAnnotationWizardFormValues The given annotation wizard form values from the tour
 * @param SetFieldValue Function to set the value of a form field in the annotation form
 */
const AnnotationWizardTourTrigger = (tourAnnotationWizardFormValues: Dict, SetFieldValue?: Function) => {
    const { jsonPath, annotationValues } = tourAnnotationWizardFormValues;

    /* Set tour class */
    SetFieldValue?.('class', tourAnnotationWizardFormValues.class);

    /* Set motivation */
    SetFieldValue?.('motivation', 'ods:adding');

    /* Set JSON path */
    SetFieldValue?.('jsonPath', jsonPath);

    /* Reset annotation values */
    SetFieldValue?.('annotationValues', annotationValues);
};

export {
    AnnotationWizardTourTrigger
};