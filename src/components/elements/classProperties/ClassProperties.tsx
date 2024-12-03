/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { upperFirst } from 'lodash';
import { Card, Row, Col } from 'react-bootstrap';

/* Import Utilities */
import { MakeReadableString } from 'app/Utilities';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import PropertiesTable from './PropertiesTable';


/* Props Type */
type Props = {
    index?: number,
    title: string,
    taxonAcceptedName?: string,
    properties: Dict,
    jsonPaths: {
        [propertySection: string]: string
    },
    annotationMode: boolean,
    SetAnnotationTarget: Function
};


/**
 * Component that renders a block for displaying all properties of a digital specimen class
 * @param index The index of the class
 * @param title The title of the the class properties
 * @param taxonAcceptedName When related to taxonomy, holds the accepted taxonomic name
 * @param properties The class's properties
 * @param jsonPath The base JSON paths to adhere to for the different targets
 * @param annotationMode Boolean indicating ig the annotation mode is on
 * @param SetAnnotationTarget Function to set the annotation target
 * @returns JSX Component
 */
const ClassProperties = (props: Props) => {
    const { index, title, taxonAcceptedName, properties, jsonPaths, annotationMode, SetAnnotationTarget } = props;

    /* Base variables */
    const [collapsed, setCollapsed] = useState<boolean>(!!(index && index > 0));
    let blockName: string;

    if (taxonAcceptedName && properties.properties['dwc:identificationVerificationStatus'] && properties.properties['dwc:identificationVerificationStatus'] === true) {
        blockName = taxonAcceptedName;
    } else {
        blockName = MakeReadableString(title);
    }

    /* ClassNames */
    const CardClass = classNames({
        'mt-3': index && index > 0
    });

    return (
        <div>
            <Card key={`${title}_${index}`} className={CardClass}>
                <Card.Body>
                    <Row>
                        <Col>
                            <p className="fs-2 fw-lightBold"> {`${blockName} ${typeof index !== 'undefined' ? '#' + (index + 1) : ''}`} </p>
                        </Col>
                        <Col className="col-md-auto">
                            <FontAwesomeIcon icon={collapsed ? faChevronDown : faChevronUp}
                                className="mc-pointer"
                                onClick={() => setCollapsed(!collapsed)}
                            />
                        </Col>
                    </Row>
                    {!collapsed &&
                        <Row>
                            <Col>
                                {(typeof (properties[Object.keys(properties)[0]]) === 'object') ?
                                    <>
                                        {Object.keys(properties).map(propertyKey => {
                                            let jsonPath: string = jsonPaths[propertyKey].replace('index', `${index}`);

                                            /* Check if level holds an array */
                                            return (
                                                <div key={propertyKey}>
                                                    {Array.isArray(properties[propertyKey]) ?
                                                        properties[propertyKey].map((subInstance: Dict, subIndex: number) => {
                                                            const subKey: string = `subClass_${subIndex}`;

                                                            jsonPath = jsonPath.replace('subIndex', `${subIndex}`);

                                                            return (
                                                                <div key={subKey} className="mt-3">
                                                                    <PropertiesTable
                                                                        title={`${propertyKey} #${subIndex + 1}`}
                                                                        properties={subInstance}
                                                                        baseJsonPath={jsonPath}
                                                                        annotationMode={annotationMode}
                                                                        SetAnnotationTarget={SetAnnotationTarget}
                                                                    />
                                                                </div>
                                                            );
                                                        })
                                                        : <div className="mt-3">
                                                            <PropertiesTable
                                                                title={propertyKey}
                                                                properties={properties[propertyKey as keyof typeof properties] as Dict}
                                                                baseJsonPath={jsonPath}
                                                                annotationMode={annotationMode}
                                                                SetAnnotationTarget={SetAnnotationTarget}
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            );
                                        })}
                                    </>
                                    : <PropertiesTable title="Properties"
                                        properties={properties}
                                        baseJsonPath={`${jsonPaths.mainProperties.replace('index', `${index}`)}`}
                                        annotationMode={annotationMode}
                                        SetAnnotationTarget={SetAnnotationTarget}
                                    />
                                }
                            </Col>
                        </Row>
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

export default ClassProperties;