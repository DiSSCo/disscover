/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
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
    index: number,
    nameOfClass: string,
    title: string,
    taxonAcceptedName?: string,
    /*instanceLevels?: Dict,*/
    properties: Dict
};


/**
 * Component that renders a block for displaying all properties of a digital specimen class
 * @param index The index of the class
 * @param nameOfClass The name of the class, which properties are shown
 * @param title The title of the the class properties
 * @param taxonAcceptedName When related to taxonomy, holds the accepted taxonomic name
 * @param properties The class's properties
 * @returns JSX Component
 */
const ClassProperties = (props: Props) => {
    const { index, nameOfClass, title, taxonAcceptedName,/* instanceLevels, */ properties } = props;

    /* Base variables */
    const [collapsed, setCollapsed] = useState<boolean>(index > 0);
    let blockName: string;

    if (taxonAcceptedName && properties.properties['dwc:identificationVerificationStatus'] && properties.properties['dwc:identificationVerificationStatus'] === true) {
        blockName = taxonAcceptedName;
    } else {
        blockName = MakeReadableString(title);
    }

    /* ClassNames */
    const CardClass = classNames({
        'mt-3': index > 0
    });

    return (
        <div>
            <Card key={`${nameOfClass}_${index}`} className={CardClass}>
                <Card.Body>
                    <Row>
                        <Col>
                            <p className="fs-2 fw-lightBold"> {`${blockName} #${index + 1}`} </p>
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
                                        {Object.keys(properties).map((propertyKey) => {
                                            /* Check if level holds an array */
                                            return (
                                                <>
                                                    {Array.isArray(properties[propertyKey]) ?
                                                        properties[propertyKey].map((subInstance: Dict, subIndex: number) => {
                                                            const subKey: string = `subClass_${subIndex}`;

                                                            return (
                                                                <div key={subKey} className="mt-3">
                                                                    <PropertiesTable
                                                                        title={`${propertyKey} #${subIndex + 1}`}
                                                                        properties={subInstance}
                                                                    />
                                                                </div>
                                                            );
                                                        })
                                                        : <div key={propertyKey} className="mt-3">
                                                            <PropertiesTable
                                                                title={propertyKey}
                                                                properties={properties[propertyKey as keyof typeof properties] as Dict}
                                                            />
                                                        </div>
                                                    }
                                                </>
                                            );
                                        })}
                                    </>
                                    : <PropertiesTable title="Properties"
                                        properties={properties}
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