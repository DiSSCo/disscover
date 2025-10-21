/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";

/* Import Types */
import { EntityRelationship } from "app/types/EntityRelationship";
import { Dict } from "app/Types";

/* Import Icons */
import { faDiagramProject, faTable } from "@fortawesome/free-solid-svg-icons";

/* Import Components */
import { ClassProperties } from "./ClassProperties";
import { Button, RelationalGraph } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    digitalObjectId: string,
    digitalObjectName?: string,
    digitalObjectEntityRelationships?: EntityRelationship[],
    annotationMode: boolean,
    SetAnnotationTarget: Function
};


/**
 * Component that renders the entity relationships content block on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @param annotationMode Boolean indicating ig the annotation mode is on
 * @param SetAnnotationTarget Function to set the annotation target
 * @returns JSX Component
 */
export const EntityRelationships = (props: Props) => {
    const { digitalObjectId, digitalObjectName, digitalObjectEntityRelationships, annotationMode, SetAnnotationTarget } = props;

    /* Base variables */
    const [displayMode, setDisplayMode] = useState<'graph' | 'table'>('graph');
    const visualEntityRelationships: {
        id: string,
        name: string,
        annotation?: boolean
    }[] = [];
    const entityRelationships: {
        mainProperties: Dict
    }[] = [];
    const jsonPaths: {
        [propertySection: string]: string
    } = {
        mainProperties: "$['ods:hasEntityRelationships'][index]"
    };
    const centerPiece: {
        id: string,
        label: string
    } = {
        id: digitalObjectId,
        label: digitalObjectName ?? digitalObjectId
    };

    /* Craft entity relationships dictionary to iterate over */
    digitalObjectEntityRelationships?.forEach((entityRelationship) => {
        entityRelationships.push({
            mainProperties: entityRelationship
        });

        visualEntityRelationships.push({
            id: entityRelationship["ods:relatedResourceURI"] ?? entityRelationship["dwc:relatedResourceID"] ?? entityRelationship["dwc:relationshipOfResource"],
            name: entityRelationship["dwc:relationshipOfResource"] ?? entityRelationship["ods:relatedResourceURI"] ?? entityRelationship["dwc:relatedResourceID"]
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
                        relations={visualEntityRelationships}
                    />
                </Card>
                : <>
                    {entityRelationships.map((entityRelationship, index) => {
                        const key: string = `entityRelationship_${index}`;

                        return (
                            <ClassProperties key={key}
                                index={index}
                                title="entityRelationship"
                                properties={entityRelationship}
                                jsonPaths={jsonPaths}
                                annotationMode={annotationMode}
                                SetAnnotationTarget={SetAnnotationTarget}
                            />
                        );
                    })}
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
