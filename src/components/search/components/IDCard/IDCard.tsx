/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { Specimen } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond, faCircleInfo, faX } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import OrganisationProperty from 'components/specimen/components/IDCard/OrganisationProperty';
import PhysicalSpecimenIdProperty from 'components/specimen/components/IDCard/PhysicalSpecimenIdProperty';
import { ReactElement } from 'react';


/* Props Typing */
interface Props {
    specimen: Specimen,
    extensions: ReactElement[],
    OnClose: Function
};


const IDCard = (props: Props) => {
    const { specimen, extensions, OnClose } = props;

    return (
        <Card className="h-100 px-4 py-3">
            <div className="h-100 d-flex flex-column">
                <Row>
                    <Col>
                        {/* Icon and Title */}
                        <Row className="align-items-center">
                            <Col className="col-md-auto h-100 pe-1">
                                <FontAwesomeIcon icon={faDiamond}
                                    className={styles.IDCardIcon}
                                />
                            </Col>
                            <Col>
                                <h2 className={styles.IDCardTitle}> {specimen.specimenName} </h2>
                            </Col>
                            <Col className="col-md-auto">
                                <FontAwesomeIcon icon={faX}
                                    className={`${styles.IDCardCloseIcon} c-primary`}
                                    onClick={() => OnClose(specimen.id)}
                                />
                            </Col>
                        </Row>

                        {/* Specimen Identifier */}
                        <Row>
                            <Col>
                                <p className={styles.IDCardId}> {specimen.id.replace('https://hdl.handle.net/', '')} </p>
                            </Col>
                        </Row>

                        {/* MIDS Bar */}
                        <Row className="mt-2">
                            <Col className="col-md-auto pe-0">
                                <FontAwesomeIcon icon={faCircleInfo} className={`${styles.midsInfoIcon} mt-2`} />
                            </Col>
                            <Col className="d-flex align-items-center mt-1">
                                <Row>
                                    <Col className="col-md-auto">
                                        <div className={`${styles.midsBlock} ${specimen.midsLevel === 0 && styles.active} fw-lightBold`}>
                                            MIDS 0
                                        </div>
                                    </Col>
                                    <Col className="col-md-auto">
                                        <div className={`${styles.midsBlock} ${specimen.midsLevel >= 1 && styles.active} fw-lightBold`}>
                                            MIDS 1
                                        </div>
                                    </Col>
                                    <Col className="col-md-auto">
                                        <div className={`${styles.midsBlock} ${specimen.midsLevel >= 2 && styles.active} fw-lightBold`}>
                                            MIDS 2
                                        </div>
                                    </Col>
                                    <Col className="col-md-auto">
                                        <div className={`${styles.midsBlock} ${specimen.midsLevel >= 3 && styles.active} fw-lightBold`}>
                                            MIDS 3
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {/* Specimen Information */}
                        <Row className="mt-4">
                            <Col>
                                <p className={styles.IDCardProperty}>
                                    <span className="fw-bold"> Scientific Name: </span> {specimen.specimenName}
                                </p>
                                <p className={`${styles.IDCardProperty} mt-2`}>
                                    <span className="fw-bold"> Specimen Type: </span> {specimen.type}
                                </p>
                                <p className={`${styles.IDCardProperty} mt-2`}>
                                    <span className="fw-bold"> Physical Specimen ID ({specimen.physicalSpecimenIdType}): </span>
                                    {<PhysicalSpecimenIdProperty specimen={specimen} />}
                                </p>
                                <p className={`${styles.IDCardProperty} mt-2`}>
                                    <span className="fw-bold"> Physical Specimen Collection: </span> {specimen.physicalSpecimenCollection}
                                </p>
                                <p className={`${styles.IDCardProperty} mt-2`}>
                                    <span className="fw-bold"> Organisation: </span>
                                    <span className="c-accent"> {<OrganisationProperty specimen={specimen} />} </span>
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {extensions.map((extension) => {
                    return extension;
                })}
            </div>
        </Card>
    );
}

export default IDCard;