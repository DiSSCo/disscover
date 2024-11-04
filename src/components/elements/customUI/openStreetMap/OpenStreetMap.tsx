/* Import Dependencies */
import { MapContainer, TileLayer } from 'react-leaflet';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import OpenStreetMapMarker from './OpenStreetMapMarker';


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
        <div className="h-100 w-100 d-flex align-items-center justify-content-center bgc-grey-light">
            {(georeference && 'dwc:decimalLatitude' in georeference && 'dwc:decimalLongitude' in georeference) ?
                <MapContainer center={[georeference['dwc:decimalLatitude'], georeference['dwc:decimalLongitude']]}
                    zoom={13} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <OpenStreetMapMarker georeference={georeference} />
                </MapContainer>
                : <p className="fs-5">Geological map could not be created due to a lack of coordinates</p>
            }
        </div>
    );
};

export default OpenStreetMap;