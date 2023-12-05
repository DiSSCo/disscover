/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon, LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen, DigitalMedia } from 'app/Types';

/* Import Sources */
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import MediaRepresentation from 'components/general/mediaTypes/MediaRepresentation';

/* Import API */
import GetSpecimenDigitalMedia from 'api/specimen/GetSpecimenDigitalMedia';


/* Props Typing */
interface Props {
    specimen: DigitalSpecimen
};


const MapMediaExt = (props: Props) => {
    const { specimen } = props;

    /* Hooks */
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    /* Base variables */
    const [digitalMedia, setDigitalMedia] = useState<DigitalMedia[]>([]);
    const latitude: number | undefined = specimen.digitalSpecimen?.occurrences?.[0]?.location?.georeference?.['dwc:decimalLatitude'] ?? undefined;
    const longitude: number | undefined = specimen.digitalSpecimen?.occurrences?.[0]?.location?.georeference?.['dwc:decimalLongitude'] ?? undefined;

    /* OnLoad: Check if Specimen has Digital Media attached to it */
    useEffect(() => {
        setDigitalMedia([]);

        GetSpecimenDigitalMedia(specimen.digitalSpecimen['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')).then((digitalMedia) => {
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
            <div className="h-100 d-flex flex-column" >
                <Row className="flex-grow-1">
                    <Col>
                        {(latitude && longitude) &&
                            <MapContainer center={[latitude, longitude]}
                                zoom={13} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }}
                            >
                                <ChangeView center={[latitude, longitude]}
                                    zoom={13}
                                />
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <Marker position={[latitude, longitude]}
                                    icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
                                >
                                    <Popup>
                                        <p className="fw-bold m-0"> Coordinates </p>
                                        <p className="mt-1 mb-0"> Latitude: {latitude} </p>
                                        <p className="mt-1"> Longitude: {longitude} </p>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        }
                    </Col>
                </Row>

                {/* If present, show Digital Media */}
                <Row className={`${styles.digitalMediaBlock} pt-2`}>
                    {/* <Col className="h-100"> */}
                        <Col className={`${styles.digitalMediaSlider} h-100 d-flex`}>
                            {digitalMedia.map((mediaItem) => {
                                return (
                                    <div className={`${styles.iconRepresentation} h-100 w-25 me-2 text-center bgc-grey rounded-c d-inline-block`}>
                                        <MediaRepresentation mediaType={mediaItem.digitalEntity['dcterms:type'] as string}
                                            iconClassName={styles.digitalMediaIcon}
                                            accessUri={mediaItem.digitalEntity['ac:accessUri']}
                                            format={mediaItem.digitalEntity['dcterms:format']}
                                        />
                                    </div>
                                );
                            })}
                        </Col>
                    {/* </Col> */}
                </Row>

                {/* Specimen Page Button */}
                <Row className={styles.buttonBlock}>
                    <Col className="h-100 d-flex justify-content-end align-items-end">
                        <button type="button" className={`${styles.specimenButton} border-0 bgc-primary c-white fs-4 rounded-full transition fw-bold px-3`}
                            onClick={() => navigate(`/ds/${specimen.digitalSpecimen['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')}`, {
                                state: {
                                    filters: searchParams.toString()
                                }
                            })}
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