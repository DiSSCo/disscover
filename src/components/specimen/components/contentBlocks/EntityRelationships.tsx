/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { Card, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Components */
import PropertiesTable from './PropertiesTable';
import ToggleButton from './entityRelationsBlock/ToggleButton';
import RelationalGraph from 'components/general/graphs/RelationalGraph';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
}


const EntityRelationships = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Base variables */
    const [viewToggle, setViewToggle] = useState<string>('graph');
    const specimen = useAppSelector(getSpecimen);
    const relations: { id: string, name: string }[] = [];

    /* OnLoad: Prepare relational graph data */
    specimen.digitalSpecimen.entityRelationships?.forEach((entityRelationship) => {
        relations.push({
            id: entityRelationship.objectEntityIri,
            name: entityRelationship.entityRelationshipType
        })
    });

    if (viewToggle === 'table' && specimen.digitalSpecimen.entityRelationships?.length) {
        return (
            <div className="position-relative">
                <ToggleButton viewToggle={viewToggle}
                    SetViewToggle={(viewToggle: string) => setViewToggle(viewToggle)}
                />

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
                <ToggleButton viewToggle={viewToggle}
                    SetViewToggle={(viewToggle: string) => setViewToggle(viewToggle)}
                />

                <Card className="h-100">
                    <RelationalGraph target={specimen.digitalSpecimen}
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