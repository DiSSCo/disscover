/* Import Dependencies */
import { isEmpty, cloneDeep } from 'lodash';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import PropertiesBlock from './PropertiesBlock';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
}


const Occurrences = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    let occurrences: {
        properties: Dict,
        location?: Dict,
        georeference?: Dict,
        geologicalContext?: Dict,
        assertions?: Dict
    }[] = [];
    const occurrenceLevels = {
        location: 'location.',
        georeference: 'location.georeference.',
        geologicalContext: 'location.geologicalContext.'
    };

    /* Craft occurrences object to iterate over */
    specimen.digitalSpecimen.occurrences?.forEach((occurrence, index) => {
        const copyOccurrence = cloneDeep(occurrence);

        /* Push new craft occurrence to array */
        occurrences.push({ properties: {} });

        /* Check for Location */
        if (!isEmpty(occurrence.location)) {
            /* Check for Georeference */
            if (!isEmpty(occurrence.location.georeference)) {
                /* Add Georeference to craft occurrence */
                occurrences[index].georeference = occurrence.location.georeference;
            }

            /* Check for Geological Context */
            if (!isEmpty(occurrence.location.geologicalContext)) {
                /* Add Geological Context to craft occurrence */
                occurrences[index].geologicalContext = occurrence.location.geologicalContext;
            }

            /* Remove extenstions from location object */
            ['georeference', 'geologicalContext'].forEach((key) => copyOccurrence.location && delete copyOccurrence.location[key]);

            /* Add Location to craft occurrence */
            occurrences[index].location = copyOccurrence.location;
        }

        /* Check for Assertions */
        if (!isEmpty(occurrence.assertions)) {
            /* Add Assertions to craft occurrence */
            occurrences[index].assertions = copyOccurrence.assertions;
        }

        /* Remove extensions from core occurrence object */
        ['location', 'assertions'].forEach((key) => delete copyOccurrence[key]);

        occurrences[index].properties = copyOccurrence;
    });

    return (
        <>
            {occurrences.map((occurrence, index) => {
                const key = `occurrence_${index}`;

                return <PropertiesBlock key={key}
                    index={index}
                    instanceName='Occurrence'
                    instanceLevel='occurrences'
                    instanceLevels={occurrenceLevels}
                    instanceProperties={occurrence}
                    ShowWithAnnotations={(propertyName: string) => ShowWithAnnotations(propertyName, index)}
                />
            })}
        </>
    );
}

export default Occurrences;