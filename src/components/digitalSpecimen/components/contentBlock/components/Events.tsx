/* Import Components */
import { isEmpty, cloneDeep } from 'lodash';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { Dict } from 'app/Types';

/* Import Components */
import { ClassProperties } from 'components/elements/Elements';


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen,
    annotationMode: boolean,
    SetAnnotationTarget: Function
};


/**
 * Component that renders the events content block on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @param annotationMode Boolean indicating ig the annotation mode is on
 * @param SetAnnotationTarget Function to set the annotation target
 * @returns JSX Component
 */
const Events = (props: Props) => {
    const { digitalSpecimen, annotationMode, SetAnnotationTarget } = props;

    /* Base variables */
    const events: {
        mainProperties: Dict,
        location?: Dict,
        georeference?: Dict,
        geologicalContext?: Dict,
        assertions?: Dict
    }[] = [];
    const jsonPaths: {
       [propertySection: string]: string
    } = {
        mainProperties: "$['ods:hasEvents'][index]",
        location: "$['ods:hasEvents'][index]['ods:hasLocation']",
        georeference: "$['ods:hasEvents'][index]['ods:hasLocation']['ods:hasGeoreference']",
        geologicalContext: "$['ods:hasEvents'][index]['ods:hasLocation']['ods:hasGeologicalContext']",
        assertions: "$['ods:hasEvents'][index]['ods:hasAssertions']"
    };

    /* Craft events dictionary to iterate over */
    digitalSpecimen['ods:hasEvents']?.forEach((event, index) => {
        const copyEvent = cloneDeep(event);

        /* Push new craft occurrence to array */
        events.push({ mainProperties: {} });

        /* Check for Location */
        if (!isEmpty(event['ods:hasLocation'])) {
            /* Check for Georeference */
            if (!isEmpty(event['ods:hasLocation']['ods:hasGeoreference'])) {
                /* Add Georeference to craft occurrence */
                events[index].georeference = event['ods:hasLocation']['ods:hasGeoreference'];
            }

            /* Check for Geological Context */
            if (!isEmpty(event['ods:hasLocation']['ods:hasGeologicalContext'])) {
                /* Add Geological Context to craft occurrence */
                events[index].geologicalContext = event['ods:hasLocation']['ods:hasGeologicalContext'];
            }

            /* Remove extenstions from location object */
            ['georeference', 'geologicalContext'].forEach((key) => copyEvent['ods:hasLocation'] && delete copyEvent['ods:hasLocation'][key as keyof typeof copyEvent['ods:hasLocation']]);

            /* Add Location to craft occurrence */
            events[index].location = copyEvent['ods:hasLocation'];
        }

        /* Check for Assertions */
        if (!isEmpty(event['ods:hasAssertions'])) {
            /* Add Assertions to craft occurrence */
            events[index].assertions = copyEvent['ods:hasAssertions'];
        }

        /* Remove extensions from core occurrence object */
        ['location', 'assertions'].forEach((key) => delete copyEvent[key as keyof typeof copyEvent]);

        events[index].mainProperties = copyEvent;
    });

    return (
        <div className="h-100">
            {events.map((event, index) => (
                <ClassProperties key={event.mainProperties['@id']}
                    index={index}
                    title="event"
                    properties={event}
                    jsonPaths={jsonPaths}
                    annotationMode={annotationMode}
                    SetAnnotationTarget={SetAnnotationTarget}
                />
            ))}
        </div>
    );
};

export default Events;