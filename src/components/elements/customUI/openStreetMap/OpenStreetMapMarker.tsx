/* Import Dependencies */
import { Icon } from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';

/* Import Hooks */
import { useTrigger } from 'app/Hooks';

/* Import Sources */
import markerIconPng from 'leaflet/dist/images/marker-icon.png';


/* Props Type */
type Props = {
    longitude: number,
    latitude: number,
};


const OpenStreetMapMarker = ({longitude, latitude}: Props) => {
    /* Hooks */
    const leafletMap = useMap();
    const trigger = useTrigger();

    trigger.SetTrigger(() => {
        leafletMap.setView([latitude, longitude]);
    }, [longitude, latitude]);

    return (
        <Marker position={[latitude, longitude]}
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
        >
            <Popup>
                <p className="fw-bold m-0"> Coordinates </p>
                <p className="mt-1 mb-0"> Latitude: {latitude} </p>
                <p className="mt-1"> Longitude: {longitude} </p>
            </Popup>
        </Marker>
    );
};

export default OpenStreetMapMarker;