/* Import Dependencies */
import { MapContainer, TileLayer } from 'react-leaflet';

/* Import Components */
import OpenStreetMapMarker from './OpenStreetMapMarker';


/* Props Type */
type Props = {
    longitude?: number,
    latitude?: number,
};


/**
 * Component that renders a Leaflet map based on the given geological reference,
 * @param longitude Longitude decimal number
 * @param latitude Latitude decimal number
 * @returns JSX Component
 */
const OpenStreetMap = ({longitude, latitude}: Props) => {
    return (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center bgc-grey-light">
            {(longitude && latitude) ?
                <MapContainer center={[latitude, longitude]}
                    zoom={13} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <OpenStreetMapMarker longitude={longitude} latitude={latitude} />
                </MapContainer>
                : <p className="fs-5">Geographical map could not be created due to a lack of coordinates</p>
            }
        </div>
    );
};

export default OpenStreetMap;