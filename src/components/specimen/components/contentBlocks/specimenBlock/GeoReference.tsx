/* Import Dependencies */
import { Card } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

/* Import Store */
import { useAppSelector } from "app/hooks";
import { getSpecimen } from "redux/specimen/SpecimenSlice";

/* Import Sources */
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';


const GeoReference = () => {
    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    /* Check if latitude and longitude are present */

    return (
        <Card className="h-100">
            <Card.Body className="h-100 d-flex flex-column">
                {/* Block icon and title */}
                <Card.Title className="c-accent">
                    <FontAwesomeIcon icon={faGlobe} />
                    <span className="ms-1"> Geo Reference </span>
                </Card.Title>

                {/* Leaflet Map */}
                <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                    {/*specimen.data['dwc:decimalLatitude'] && specimen.data['dwc:decimalLongitude'] ?
                        <MapContainer center={[specimen.data['dwc:decimalLatitude'], specimen.data['dwc:decimalLongitude']]}
                            zoom={13} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }}
                        >
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
                        : <p className="fst-italic"> Map can not be generated due to lack of coordinates </p>
                    */}
                </div>
            </Card.Body>
        </Card>
    );
}

export default GeoReference;