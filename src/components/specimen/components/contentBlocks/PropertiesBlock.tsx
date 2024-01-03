/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { Card, Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import PropertiesTable from './PropertiesTable';


/* Props Typing */
interface Props {
    index: number,
    instanceName: string,
    taxonAcceptedName?: string,
    instanceLevel: string,
    instanceLevels?: Dict,
    instanceProperties: Dict
    ShowWithAnnotations: Function
};


const PropertiesBlock = (props: Props) => {
    const { index, instanceName, taxonAcceptedName, instanceLevel, instanceLevels, instanceProperties, ShowWithAnnotations } = props;

    /* Base variables */
    const [collapsed, setCollapsed] = useState<boolean>(index > 0);
    let blockName: string;
    
    if (taxonAcceptedName && instanceProperties.properties['dwc:identificationVerificationStatus'] && instanceProperties.properties['dwc:identificationVerificationStatus'] === true) {
        blockName = taxonAcceptedName;
    } else {
        blockName = instanceName;
    }

    /* ClassNames */
    const CardClass = classNames({
        'mt-3': index > 0
    });

    return (
        <Card key={`${instanceLevel}_${index}`} className={CardClass}>
            <Card.Body>
                <Row>
                    <Col>
                        <p className="fs-2 fw-lightBold"> {`${blockName} #${index + 1}`} </p>
                    </Col>
                    <Col className="col-md-auto">
                        <FontAwesomeIcon icon={collapsed ? faChevronDown : faChevronUp}
                            className="c-pointer"
                            onClick={() => setCollapsed(!collapsed)}
                        />
                    </Col>
                </Row>
                {!collapsed &&
                    <Row>
                        <Col>
                            {(typeof (instanceProperties[Object.keys(instanceProperties)[0]]) === 'object') ?
                                <>
                                    {Object.keys(instanceProperties).map((propertyKey) => {
                                        return (
                                            <div key={propertyKey} className="mt-3">
                                                <PropertiesTable
                                                    title={propertyKey}
                                                    properties={instanceProperties[propertyKey as keyof typeof instanceProperties] as Dict}
                                                    ShowWithAnnotations={(property: string) =>
                                                        ShowWithAnnotations(`${instanceLevel}[${index}]${instanceLevels ? instanceLevels[propertyKey as keyof typeof instanceLevels] : ''}${property}`)
                                                    }
                                                />
                                            </div>
                                        )
                                    })}
                                </>
                                : <PropertiesTable title="Properties"
                                    properties={instanceProperties}
                                    ShowWithAnnotations={(property: string) =>
                                        ShowWithAnnotations(`${instanceLevel}[${index}]${property}`)
                                    }
                                />
                            }
                        </Col>
                    </Row>
                }
            </Card.Body>
        </Card>
    );
}

export default PropertiesBlock;