/* Import Components */
import { isEmpty, cloneDeep } from 'lodash';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { Dict } from 'app/Types';

/* Import Components */
import ClassProperties from './classProperties/ClassProperties';


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen
};


/**
 * Component that renders the events content block on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @returns JSX Component
 */
const Events = (props: Props) => {
    const { digitalSpecimen } = props;

    /* Base variables */
    const events: {
        mainProperties: Dict,
        location?: Dict,
        georeference?: Dict,
        geologicalContext?: Dict,
        assertions?: Dict
    }[] = [];

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
                />
            ))}
        </div>
    );
};

export default Events;