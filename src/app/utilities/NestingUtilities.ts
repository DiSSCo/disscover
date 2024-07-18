/* Import Types */
import { Dict } from "app/Types";


/* Utilities associated with nested dictionaries */


/**
 * Function to extract a value from a nested dictionary using a relative json path
 * @param source The source dictionary to search in
 * @param jsonPath The relative json path to locate the value by
 */
const ExtractFromDictionary = (source: Dict | any[], jsonPath: string) => {
    /**
     * 
     * @param step 
     * @param source 
     */
    const ProcessStep = (source: Dict | Dict[] | string | string[] | number | number[] | boolean | boolean[] | undefined, path: string): string | number | boolean | undefined => {
        const step: string = path.split('.', 1).toString();
        let value: string | number | boolean | undefined;

        if (source && step.includes('[')) {
            /* Treat as nested array */
            const arrayIndications: string[] = step.split('[');

            value = ProcessStep(source[arrayIndications[0] as keyof typeof source][arrayIndications[1].replace(']', '')] as string, path.slice(path.indexOf('.') + 1));
        } else if (source && typeof source === 'object' && step in source) {
            /* Treat as nested dictionary */
            source = source as Dict;

            value = ProcessStep(source[step], path.slice(path.indexOf('.') + 1));
        } else {
            /* Treat as value */
            value = source as string | number | boolean | undefined;
        };

        return value;
    };

    return ProcessStep(source, jsonPath);
};

export {
    ExtractFromDictionary
};