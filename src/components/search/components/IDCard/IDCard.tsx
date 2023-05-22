/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSearchSpecimen, setSearchSpecimen } from 'redux/search/SearchSlice';

/* Import Types */
import { Specimen, DigitalMedia } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog, faCircleInfo, faChevronRight, faX } from '@fortawesome/free-solid-svg-icons';

/* Import Sources */
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

/* Import Components */
import OrganisationProperty from 'components/specimen/components/IDCard/OrganisationProperty';
import PhysicalSpecimenIdProperty from 'components/specimen/components/IDCard/PhysicalSpecimenIdProperty';

/* Import API */
import GetSpecimenDigitalMedia from 'api/specimen/GetSpecimenDigitalMedia';


const IDCard = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Base variables */
    const specimen = useAppSelector(getSearchSpecimen);
    const [digitalMedia, setDigitalMedia] = useState<DigitalMedia[]>([]);

    /* OnLoad: Check if Specimen has Digital Media attached to it */
    useEffect(() => {
        setDigitalMedia([]);

        GetSpecimenDigitalMedia(specimen.id.replace('https://hdl.handle.net/', '')).then((digitalMedia) => {
            if (digitalMedia) {
                setDigitalMedia(digitalMedia);
            }
        });
    }, [specimen]);

    /* Function for changing the zoom level of the Leaflet Map */
    const ChangeView = ({ center, zoom }: { center: LatLngExpression, zoom: number }) => {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    return (
        <Card className={`${styles.IDCard} px-4 py-3`}>
            <div className="h-100 d-flex flex-column">
                <Row className={styles.IDCardTop}>
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
                                    onClick={() => dispatch(setSearchSpecimen({} as Specimen))}
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
                <Row className="flex-grow-1 pt-3 overflow-hidden">
                    <Col className="h-100">
                        {/*  If present, show Geological Location */}
                        <div className="h-100 d-flex flex-column">
                            <Row className="flex-grow-1">
                                <Col>
                                    {(specimen.data['dwc:decimalLatitude'] && specimen.data['dwc:decimalLongitude']) &&
                                        <MapContainer center={[specimen.data['dwc:decimalLatitude'], specimen.data['dwc:decimalLongitude']]}
                                            zoom={13} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }}
                                        >
                                            <ChangeView center={[specimen.data['dwc:decimalLatitude'], specimen.data['dwc:decimalLongitude']]}
                                                zoom={13}
                                            />
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />

                                            <Marker position={[specimen.data['dwc:decimalLatitude'], specimen.data['dwc:decimalLongitude']]}
                                                icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
                                            >
                                                <Popup>
                                                    <p className="fw-bold m-0"> Coordinates </p>
                                                    <p className="mt-1 mb-0"> Latitude: {specimen.data['dwc:decimalLatitude']} </p>
                                                    <p className="mt-1"> Longitude: {specimen.data['dwc:decimalLongitude']} </p>
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    }
                                </Col>
                            </Row>

                            {/* If present, show Digital Media */}
                            <Row className={`${styles.digitalMediaBlock} pt-2`}>
                                <Col className="h-100">
                                    <div className={`${styles.digitalMediaSlider} h-100 w-auto`}>
                                        {digitalMedia.map((mediaItem) => {
                                            return (
                                                <img key={mediaItem.id} src={mediaItem.mediaUrl}
                                                    className={`${styles.digitalMediaItem} h-100 me-3`}
                                                    alt={mediaItem.mediaUrl}
                                                />
                                            );
                                        })}
                                    </div>
                                </Col>
                            </Row>

                            {/* Specimen Page Button */}
                            <Row className={styles.buttonBlock}>
                                <Col className="h-100 d-flex justify-content-end align-items-end">
                                    <button type="button" className={`${styles.specimenButton} fw-bold px-3`}
                                        onClick={() => navigate(`/ds/${specimen.id.replace('https://hdl.handle.net/', '')}`)}
                                    >
                                        See full details <FontAwesomeIcon icon={faChevronRight} />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </Card >
    );
}

export default IDCard;