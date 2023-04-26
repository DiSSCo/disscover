/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSearchSpecimen } from 'redux/search/SearchSlice';

/* Import Types */
import { DigitalMedia } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Sources */
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrog, faCircleInfo, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import GetSpecimenDigitalMedia from 'api/specimen/GetSpecimenDigitalMedia';


const IDCard = () => {
    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const specimen = useAppSelector(getSearchSpecimen);
    const [digitalMedia, setDigitalMedia] = useState<DigitalMedia[]>([]);

    /* OnLoad: Check if Specimen has Digital Media attached to it */
    useEffect(() => {
        setDigitalMedia([]);

        GetSpecimenDigitalMedia(specimen.id).then((digitalMedia) => {
            if (digitalMedia) {
                setDigitalMedia(digitalMedia);
            }
        });
    }, [specimen]);

    /* Function for displaying the Organisation of a Specimen */
    const OrganisationProperty = () => {
        if (specimen.data['ods:organisationName']) {
            return specimen.data['ods:organisationName'];
        } else if (specimen.organisationId) {
            return specimen.organisationId;
        } else {
            return '';
        }
    }

    /* Function for changing the zoom level of the Leaflet Map */
    const ChangeView = ({ center, zoom }: { center: LatLngExpression, zoom: number }) => {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    return (
        <Card className={`${styles.IDCard} px-4 py-3`}>
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
                    </Row>

                    {/* Specimen Identifier */}
                    <Row>
                        <Col>
                            <p className={styles.IDCardId}> {specimen.id} </p>
                        </Col>
                    </Row>

                    {/* MIDS Bar */}
                    <Row className="mt-2">
                        <Col className="col-md-auto pe-2">
                            <div className={`${styles.midsBlock} ${specimen.midsLevel >= 1 && styles.active} px-3 py-1 mt-2 fw-lightBold`}>
                                MIDS 1
                            </div>
                        </Col>
                        <Col className="col-md-auto px-2">
                            <div className={`${styles.midsBlock} ${specimen.midsLevel >= 2 && styles.active} px-3 py-1 mt-2 fw-lightBold`}>
                                MIDS 2
                            </div>
                        </Col>
                        <Col className="col-md-auto ps-2">
                            <div className={`${styles.midsBlock} ${specimen.midsLevel >= 3 && styles.active} px-3 py-1 mt-2 fw-lightBold`}>
                                MIDS 3
                            </div>
                        </Col>
                        <Col className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faCircleInfo} className={`${styles.midsInfoIcon} mt-2`} />
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
                                <span className="fw-bold"> Physical Specimen ID ({specimen.physicalSpecimenIdType}): </span> {specimen.physicalSpecimenId}
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Physical Specimen Collection: </span> {specimen.physicalSpecimenCollection}
                            </p>
                            <p className={`${styles.IDCardProperty} mt-2`}>
                                <span className="fw-bold"> Organisation: </span>
                                {OrganisationProperty()}
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={styles.IDCardBottom}>
                <Col className="h-100">
                    {/*  If present, show Geological Location */}
                    <Row className={styles.geoLocationBlock}>
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
                                        <img key={mediaItem.id} src={mediaItem.mediaUrl} className={`${styles.digitalMediaItem} h-100 me-3`} />
                                    );
                                })}
                            </div>
                        </Col>
                    </Row>

                    {/* Specimen Page Button */}
                    <Row className={styles.buttonBlock}>
                        <Col className="h-100 d-flex justify-content-end align-items-end">
                            <button type="button" className={`${styles.specimenButton} fw-bold px-3`}
                                onClick={() => navigate(`/ds/${specimen.id}`)}
                            >
                                See full details <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}

export default IDCard;