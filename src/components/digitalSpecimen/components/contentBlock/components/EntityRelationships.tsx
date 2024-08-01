/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";

/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";

/* Import Icons */
import { faDiagramProject, faTable } from "@fortawesome/free-solid-svg-icons";

/* Import Components */
import ClassProperties from "./classProperties/ClassProperties";
import { Button, RelationalGraph } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen
};


/**
 * Component that renders the entity relationships content block on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @returns JSX Component
 */
const EntityRelationships = (props: Props) => {
    const { digitalSpecimen } = props;

    /* Base variables */
    const [displayMode, setDisplayMode] = useState<'graph' | 'table'>('graph');
    const entityRelationships: {
        id: string,
        name: string,
        annotation?: boolean
    }[] = [];
    const centerPiece: {
        id: string,
        label: string
    } = {
        id: digitalSpecimen["ods:ID"],
        label: digitalSpecimen["ods:specimenName"] ?? digitalSpecimen["ods:ID"]
    };

    /* Craft entity relationships dictionary to iterate over */
    digitalSpecimen["ods:hasEntityRelationship"]?.forEach((entityRelationship) => {
        entityRelationships.push({
            id: entityRelationship["dwc:relatedResourceID"],
            name: entityRelationship["dwc:relationshipOfResource"] ?? entityRelationship["dwc:relatedResourceID"]
        });
    });

    /* Class Names */
    const graphModeButtonClass = classNames({
        'bgc-accent tc-white': displayMode === 'graph'
    });

    const tableModeButtonClass = classNames({
        'bgc-accent tc-white': displayMode === 'table'
    });

    return (
        <div className="h-100 position-relative">
            {/* Display either a relational graph or table based upon the display mode that displays the entity relationships */}
            {displayMode === 'graph' ?
                <Card className="h-100">
                    <RelationalGraph centerPiece={centerPiece}
                        relations={entityRelationships}
                    />
                </Card>
                : <>
                    {entityRelationships.map((entityRelationship, index) => (
                        <ClassProperties key={`entityRelationship_${index}`}
                            index={index}
                            title="entityRelationship"
                            properties={entityRelationship}
                        />
                    ))}
                </>
            }

            {/* Buttons for toggling between graph and table mode */}
            <div className="position-absolute top-0 end-0 mt-2 me-2">
                <Row>
                    <Col className="px-0 me-1">
                        <Button type="button"
                            variant="blank"
                            className={`${graphModeButtonClass} px-2 br-corner bgc-grey`}
                            OnClick={() => setDisplayMode('graph')}
                        >
                            <FontAwesomeIcon icon={faDiagramProject}
                                size="xl"
                            />
                        </Button>
                    </Col>
                    <Col className="ps-0">
                        <Button type="button"
                            variant="blank"
                            className={`${tableModeButtonClass} px-2 br-corner bgc-grey`}
                            OnClick={() => setDisplayMode('table')}
                        >
                            <FontAwesomeIcon icon={faTable}
                                size="xl"
                            />
                        </Button>
                    </Col>
                </Row>

            </div>
        </div>
    );
};

export default EntityRelationships;