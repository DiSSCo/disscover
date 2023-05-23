/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { Specimen } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog, faX, faCircleInfo, faLocationDot, faLandmark, faBoxArchive } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import PhysicalSpecimenIdProperty from 'components/specimen/components/IDCard/PhysicalSpecimenIdProperty';
import OrganisationProperty from 'components/specimen/components/IDCard/OrganisationProperty';


/* Props Typing */
interface Props {
    specimen: Specimen,
    RemoveFromComparison: Function
};


const CompareCard = (props: Props) => {
    const { specimen, RemoveFromComparison } = props;

    return (
        <Card className={`px-4 py-3`}>
            {/* Specimen Information */}
            <Row>
                <Col>
                    {/* Icon and Title */}
                    <Row className="align-items-center">
                        <Col className="col-md-auto h-100 pe-1">
                            <FontAwesomeIcon icon={faFrog}
                                className={styles.IDCardIcon}
                            />
                        </Col>
                        <Col>
                            <h2 className={styles.IDCardTitle}> {specimen.specimenName} </h2>
                        </Col>
                        <Col className="col-md-auto">
                            <FontAwesomeIcon icon={faX}
                                className={`${styles.IDCardCloseIcon} c-primary`}
                                onClick={() => RemoveFromComparison(specimen.id)}
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

                    {/* General Specimen properties */}
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

                    {/* Location properties */}
                    <Row className="mt-4">
                        <Col>
                            <h5 className="c-accent">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span className="ms-1"> Location </span>
                            </h5>

                            <p className={styles.IDCardProperty}>
                                <span className="fw-bold"> Continent: </span>
                                {specimen.data['dwc:continent'] ?
                                    specimen.data['dwc:continent']
                                    : 'Not provided'
                                }
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Country: </span>
                                {specimen.data['dwc:country'] ?
                                    specimen.data['dwc:country']
                                    : 'Not provided'
                                }
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Locality: </span>
                                {specimen.data['dwc:locality'] ?
                                    specimen.data['dwc:locality']
                                    : 'Not provided'
                                }
                            </p>
                        </Col>
                    </Row>

                    {/* Taxonomy properties */}
                    <Row className="mt-4">
                        <Col>
                            <h5 className="c-accent">
                                <FontAwesomeIcon icon={faFrog} />
                                <span className="ms-1"> Taxonomy </span>
                            </h5>

                            <p className={styles.IDCardProperty}>
                                <span className="fw-bold"> Kingdom: </span>
                                {specimen.data['dwc:kingdom'] ?
                                    specimen.data['dwc:kingdom']
                                    : 'Not provided'
                                }
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Phylum: </span>
                                {specimen.data['dwc:phylum'] ?
                                    specimen.data['dwc:phylum']
                                    : 'Not provided'
                                }
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Order: </span>
                                {specimen.data['dwc:order'] ?
                                    specimen.data['dwc:order']
                                    : 'Not provided'
                                }
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Family: </span>
                                {specimen.data['dwc:family'] ?
                                    specimen.data['dwc:family']
                                    : 'Not provided'
                                }
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Genus: </span>
                                {specimen.data['dwc:genus'] ?
                                    specimen.data['dwc:genus']
                                    : 'Not provided'
                                }
                            </p>
                        </Col>
                    </Row>

                    {/* Organisation properties */}
                    <Row className="mt-4">
                        <Col>
                            <h5 className="c-accent">
                                <FontAwesomeIcon icon={faLandmark} />
                                <span className="ms-1"> Organisation </span>
                            </h5>

                            <p className={styles.IDCardProperty}>
                                <span className="fw-bold"> Name: </span>
                                {specimen.data['ods:organisationName'] ?
                                    specimen.data['ods:organisationName']
                                    : 'Not provided'
                                }
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> ROR identifier: </span>
                                {specimen.organisationId.replace('https://ror.org/', '')}
                            </p>
                        </Col>
                    </Row>

                    {/* Collection properties */}
                    <Row className="mt-4">
                        <Col>
                            <h5 className="c-accent">
                                <FontAwesomeIcon icon={faBoxArchive} />
                                <span className="ms-1"> Collection </span>
                            </h5>

                            <p className={styles.IDCardProperty}>
                                <span className="fw-bold"> Collecting number: </span>
                                {specimen.data['ods:collectingNumber'] ?
                                    specimen.data['ods:collectingNumber']
                                    : 'Not provided'
                                }
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Collector: </span>
                                {specimen.data['ods:collector'] ?
                                    specimen.data['ods:collector']
                                    : 'Not provided'
                                }
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Date collected: </span>
                                {specimen.data['ods:dateCollected'] ?
                                    specimen.data['ods:dateCollected']
                                    : 'Not provided'
                                }
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}

export default CompareCard;