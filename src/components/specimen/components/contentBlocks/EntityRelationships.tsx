/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { Card, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen, getSpecimenAnnotations } from 'redux/specimen/SpecimenSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import PropertiesTable from './PropertiesTable';
import ToggleButton from './entityRelationsBlock/ToggleButton';
import Cytoscape from 'components/general/graphs/Cytoscape';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
}


const EntityRelationships = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Base variables */
    const [viewToggle, setViewToggle] = useState<string>('graph');
    const [annotationsToggle, setAnnotationsToggle] = useState<boolean>(false);
    const specimen = useAppSelector(getSpecimen);
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);
    const relations: { id: string, name: string, annotation?: boolean }[] = [];

    /* Prepare relational graph data */
    specimen.digitalSpecimen.entityRelationships?.forEach((entityRelationship) => {
        relations.push({
            id: entityRelationship.objectEntityIri,
            name: entityRelationship.entityRelationshipType
        })
    });

    /* Check for annotations with entity relationship as target property and show annotations toggle is active */
    if ('entityRelationships' in specimenAnnotations && annotationsToggle) {
        /* Include entity relationship annotations as potential linkages */
        specimenAnnotations['entityRelationships'].forEach((annotation) => {
            const entityRelationshipObject: Dict = JSON.parse(annotation['oa:body']['oa:value'] as unknown as string);

            relations.push({
                id: entityRelationshipObject.entityRelationships.objectEntityIri,
                name: entityRelationshipObject.entityRelationships.entityRelationshipType,
                annotation: true
            })
        });
    }

    if (viewToggle === 'table' && specimen.digitalSpecimen.entityRelationships?.length) {
        return (
            <div className="position-relative">
                <div className="position-absolute end-0 z-1">
                    <ToggleButton viewToggle={viewToggle}
                        SetViewToggle={(viewToggle: string) => setViewToggle(viewToggle)}
                    />
                </div>

                {specimen.digitalSpecimen.entityRelationships?.map((entityRelationship, index) => {
                    const key = `entityRelationship${index}`;

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
                                            {`Entity Relationship #${++index}`}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="mt-3">
                                            <PropertiesTable
                                                title="Properties"
                                                properties={entityRelationship}
                                                ShowWithAnnotations={(property: string) => ShowWithAnnotations(property)}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        );
    } else if (viewToggle === 'graph' && specimen.digitalSpecimen.entityRelationships?.length) {
        return (
            <div className="h-100 position-relative">
                <div className="position-absolute end-0 z-1">
                    {('entityRelationships' in specimenAnnotations) &&
                        <button type="button"
                            className="accentButton px-3 py-1"
                            onClick={() => setAnnotationsToggle(!annotationsToggle)}
                        >
                            {!annotationsToggle ? 'Toggle' : 'Hide'} Annotations
                        </button>
                    }

                    <ToggleButton viewToggle={viewToggle}
                        SetViewToggle={(viewToggle: string) => setViewToggle(viewToggle)}
                    />
                </div>

                <Card className="h-100">
                    <Cytoscape target={specimen.digitalSpecimen}
                        relations={relations}
                    />
                </Card>
            </div>
        );
    } else {
        return <> </>
    }
}

export default EntityRelationships;