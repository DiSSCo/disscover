/* Import Dependencies */
import { Icon } from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';

/* Import Hooks */
import { useTrigger } from 'app/Hooks';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Sources */
import markerIconPng from 'leaflet/dist/images/marker-icon.png';


/* Props Type */
type Props = {
    georeference: Dict
};


const OpenStreetMapMarker = (props: Props) => {
    const { georeference } = props;

    /* Hooks */
    const leafletMap = useMap();
    const trigger = useTrigger();

    trigger.SetTrigger(() => {
        leafletMap.setView([georeference['dwc:decimalLatitude'], georeference['dwc:decimalLongitude']]);
    }, [georeference]);

    return (
        <Marker position={[georeference['dwc:decimalLatitude'], georeference['dwc:decimalLongitude']]}
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
        >
            <Popup>
                <p className="fw-bold m-0"> Coordinates </p>
                <p className="mt-1 mb-0"> Latitude: {georeference['dwc:decimalLatitude']} </p>
                <p className="mt-1"> Longitude: {georeference['dwc:decimalLongitude']} </p>
            </Popup>
        </Marker>
    );
};

export default OpenStreetMapMarker;