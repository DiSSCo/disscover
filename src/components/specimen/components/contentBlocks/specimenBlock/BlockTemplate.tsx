/* Import Dependencies */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimenAnnotations } from 'redux/specimen/SpecimenSlice';

/* Import Types */
import { IconProp } from '@fortawesome/fontawesome-svg-core';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';


/* Props Typing */
interface Props {
    title: string,
    icon: IconProp,
    properties: { name: string, value: string | number, property: string }[],
    ToggleSidePanel: Function
};


const BlockTemplate = (props: Props) => {
    const { title, icon, properties, ToggleSidePanel } = props;

    /* Base variables */
    const propertyGroups: { name: string, value: string | number, property: string }[][] = [];
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);

    /* Split properties into groups of 5 */
    let arrayIndex = 0;

    properties.forEach((property) => {
        if (property.value) {
            (propertyGroups[arrayIndex] || (propertyGroups[arrayIndex] = [])).push(property);

            if (propertyGroups[arrayIndex].length === 5) {
                arrayIndex++;
            }
        }
    });

    /* Class Name for Tabs */
    const classTab = classNames({
        'react-tabs__tab mx-1 bgc-grey rounded-full ratio ratio-1x1': true,
        [`${styles.propertiesTab}`]: true,
        'd-none': propertyGroups.length === 1
    });

    return (
        <Card className="h-100">
            <Card.Body className="h-100">
                <Row className="h-100">
                    <Col className="col-md-auto h-100">
                        <Row>
                            <Col>
                                <Card.Title className="c-accent">
                                    <FontAwesomeIcon icon={icon} />
                                </Card.Title>
                            </Col>
                        </Row>
                        <Row className="h-100">
                            <Col className="d-flex justify-content-center">
                                <div className="h-75 w-0 b-accent" />
                            </Col>
                        </Row>
                    </Col>
                    <Col className="h-100 ps-0 d-flex flex-column">
                        {/* Block icon and title */}
                        <Card.Title className="c-accent">
                            <span> {title} </span>
                        </Card.Title>

                        {/* Main properties */}
                        <Row className="mt-2 flex-grow-1">
                            <Col>
                                <Tabs className="h-100 d-flex flex-column">
                                    {/* Display all properties */}
                                    <Row className="flex-grow-1 pb-2">
                                        <Col>
                                            {propertyGroups.map((propertyGroup) => {
                                                return (
                                                    <TabPanel key={`${propertyGroup[0].name}`}
                                                        selectedClassName={"react-tabs__tab-panel--selected h-100 d-flex flex-column"}
                                                    >
                                                        {propertyGroup.map((property) => {
                                                            return (
                                                                <Row key={property.name}
                                                                    className={`${styles.propertyBlock} flex-grow-1 rounded-c transition`}
                                                                    onClick={() => ToggleSidePanel(property.property)}
                                                                >
                                                                    <Col>
                                                                        <p>
                                                                            <span className="fw-lightBold"> {property.name}: </span>
                                                                            {property.value}
                                                                        </p>
                                                                    </Col>
                                                                    {property.property in specimenAnnotations &&
                                                                        <Col className="col-md-auto">
                                                                            <FontAwesomeIcon icon={faPencil} />
                                                                        </Col>
                                                                    }
                                                                </Row>
                                                            );
                                                        })}
                                                    </TabPanel>
                                                )
                                            })}
                                        </Col>
                                    </Row>

                                    {/* If there is more than one property group, display tabs as bullets */}
                                    <TabList className="m-0 p-0 d-flex justify-content-center">
                                        {propertyGroups.map((propertyGroup, _index) => {
                                            return (
                                                <Tab key={`${propertyGroup[0].name}`}
                                                    className={classTab}
                                                    selectedClassName={styles.active}
                                                />
                                            );
                                        })}
                                    </TabList>
                                </Tabs>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    );
}

export default BlockTemplate;