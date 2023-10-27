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


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
}


const Identifications = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    let identifications: {
        properties: Dict,
        [taxonIdentification: string]: Dict
    }[] = [];

    /* Craft identifications object to iterate over */
    specimen.digitalSpecimen['dwc:identification']?.forEach((identification, index) => {
        const copyIdentification = cloneDeep(identification);

        /* Push new craft occurrence to array */
        identifications.push({ properties: {} });

        /* Check for Taxon Identifications */
        if (!isEmpty(identification.taxonIdentifications)) {
            identification.taxonIdentifications?.forEach((taxonIdentification, index) => {
                /* Add Taxon Identification to craft identification */
                identifications[index][`taxon Identification #${++index}`] = taxonIdentification;
            });
        }

        /* Remove extensions from core occurrence object */
        ['taxonIdentifications'].forEach((key) => delete copyIdentification[key]);

        identifications[index].properties = copyIdentification;
    });

    return (
        <>
            {identifications.map((identification, index) => {
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
                                    <p className="fs-2 fw-lightBold">
                                        {identification.properties['dwc:identificationVerificationStatus'] ?
                                            <> {`Identification #${++index} (accepted)`} </>
                                            : <> {`Identification #${++index}`} </>
                                        }
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {Object.keys(identification).map((identificationKey) => {
                                        return (
                                            <div key={identificationKey} className="mt-3">
                                                <PropertiesTable
                                                    title={identificationKey}
                                                    properties={identification[identificationKey]}
                                                    ShowWithAnnotations={(property: string) => ShowWithAnnotations(property)}
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

export default Identifications;