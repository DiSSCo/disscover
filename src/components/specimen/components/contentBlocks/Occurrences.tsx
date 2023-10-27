/* Import Dependencies */
import { isEmpty, cloneDeep } from 'lodash';
import classNames from 'classnames';
import { Card, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import PropertiesTable from './PropertiesTable';


const Occurrences = () => {
    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    let occurrences: {
        properties: Dict,
        location?: Dict,
        georeferece?: Dict,
        geologicalContect?: Dict,
        assertions?: Dict
    }[] = [];

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
                occurrences[index].georeferece = occurrence.location.georeference;
            }

            /* Check for Geological Context */
            if (!isEmpty(occurrence.location.geologicalContext)) {
                /* Add Geological Context to craft occurrence */
                occurrences[index].geologicalContect = occurrence.location.geologicalContext;
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

        occurrences[index].properties = copyOccurrence
    });

    return (
        <>
            {occurrences.map((occurrence, index) => {
                const key = `occurrence${index}`;

                /* ClassNames */
                const CardClass = classNames({
                    'mt-3': index > 0
                });

                return (
                    <Card key={key} className={CardClass}>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <p className="fs-2 fw-lightBold"> {`Occurrence #${++index}`} </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {Object.keys(occurrence).map((occurreneKey) => {
                                        return (
                                            <div key={occurreneKey} className="mt-3">
                                                <PropertiesTable
                                                    title={occurreneKey}
                                                    properties={occurrence[occurreneKey as keyof typeof occurrence] as Dict}
                                                />
                                            </div>
                                        );
                                    })}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                );
            })}
        </>
    );
}

export default Occurrences;