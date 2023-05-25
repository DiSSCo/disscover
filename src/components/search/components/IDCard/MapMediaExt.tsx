/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Specimen, DigitalMedia } from 'global/Types';

/* Import Sources */
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import GetSpecimenDigitalMedia from 'api/specimen/GetSpecimenDigitalMedia';


/* Props Typing */
interface Props {
    specimen: Specimen
};


const MapMediaExt = (props: Props) => {
    const { specimen } = props;

    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const [digitalMedia, setDigitalMedia] = useState<DigitalMedia[]>([]);

    /* OnLoad: Check if Specimen has Digital Media attached to it */
    useEffect(() => {
        setDigitalMedia([]);

        GetSpecimenDigitalMedia(specimen.id.replace('https://hdl.handle.net/', '')).then((digitalMedia) => {
            if (digitalMedia) {
                setDigitalMedia(digitalMedia);
            }
        }).catch(error => {
            console.warn(error);
        });
    }, [specimen]);

     /* Function for changing the zoom level of the Leaflet Map */
     const ChangeView = ({ center, zoom }: { center: LatLngExpression, zoom: number }) => {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    return (
        <>
            {/*  If present, show Geological Location */}
            < div className="h-100 d-flex flex-column" >
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
        </>
    );
}

export default MapMediaExt;