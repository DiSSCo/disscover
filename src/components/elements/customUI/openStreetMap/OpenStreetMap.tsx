/* Import Dependencies */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Sources */
import markerIconPng from 'leaflet/dist/images/marker-icon.png';


/* Props Type */
type Props = {
    georeference: Dict | undefined
};


/**
 * Component that renders a Leaflet map based on the given geological reference,
 * @param georeference A geological reference object holding the latitude and longitude among other properties
 * @returns JSX Component
 */
const OpenStreetMap = (props: Props) => {
    const { georeference } = props;

    return (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center bgc-grey">
            {(georeference && 'dwc:decimalLatitude' in georeference && 'dwc:decimalLatitude' in georeference) ?
                <MapContainer center={[georeference['dwc:decimalLatitude'], georeference['dwc:decimalLatitude']]}
                    zoom={13} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[georeference['dwc:decimalLatitude'], georeference['dwc:decimalLongitude']]}
                        icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
                    >
                        <Popup>
                            <p className="fw-bold m-0"> Coordinates </p>
                            <p className="mt-1 mb-0"> Latitude: {georeference['dwc:decimalLatitude']} </p>
                            <p className="mt-1"> Longitude: {georeference['dwc:decimalLongitude']} </p>
                        </Popup>
                    </Marker>
                </MapContainer>
                : <p className="fs-5">Geological map could not be created due to a lack of coordinates</p>
            }
        </div>
    );
}

export default OpenStreetMap;