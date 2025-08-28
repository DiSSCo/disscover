import { Dict } from "app/Types";

const TaxonomicIdentificationMapper = (annotationClass: Dict , newValues: any) => {
    console.log(newValues);
    console.log(annotationClass);
    Object.entries(annotationClass).forEach((item) => {
        console.log(item[0]);
    })
    // To do:
    // [ ] Loop through newValues.classification and match this to the oldValues
    // [ ] Loop through newValues.usage and match this to the oldValues
    // [ ] Return the oldValues array
}

export {
    TaxonomicIdentificationMapper
};