/* Utilities associated with annotating */

/**
 * Function to provide a readable motivation based on the motivation vocabulary
 * @param motivation The motivation to transcribe
 * @returns Readable motivation string
 */
const ProvideReadableMotivation = (motivation: string) => {
    switch (motivation) {
        case 'ods:adding':
            return 'Addition';
        case 'ods:deleting':
            return 'Deletion';
        case 'oa:assessing':
            return 'Assessment';
        case 'oa:editing':
            return 'Modification';
        case 'oa:commenting':
            return 'Comment';
    };
};

export {
    ProvideReadableMotivation
};