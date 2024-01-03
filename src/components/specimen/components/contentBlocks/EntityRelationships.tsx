/* Import Dependencies */
import { useState } from 'react';
import { Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen, getSpecimenAnnotations } from 'redux/specimen/SpecimenSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import PropertiesBlock from './PropertiesBlock';
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
                    console.log(entityRelationship);

                    const key = `entityRelationship${index}`;

                    return <PropertiesBlock key={key}
                        index={index}
                        instanceName='Entity Relationship'
                        instanceLevel='entityRelationships'
                        instanceProperties={entityRelationship}
                        ShowWithAnnotations={(propertyName: string) => ShowWithAnnotations(propertyName, index)}
                    />
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