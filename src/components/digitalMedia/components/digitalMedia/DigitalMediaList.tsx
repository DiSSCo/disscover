/* Import Dependencies */
import { useEffect, useState } from 'react';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Types */
import { DigitalMedia } from 'app/Types';

/* Import Styles */
import styles from 'components/digitalMedia/digitalMedia.module.scss';

/* Import Components */
import DigitalMediaListItem from './DigitalMediaListItem';

/* Import API */
import GetSpecimenDigitalMedia from 'api/specimen/GetSpecimenDigitalMedia';


const DigitalMediaList = () => {
    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    const [specimenDigitalMedia, setSpecimenDigitalMedia] = useState<DigitalMedia[]>([]);

    /* Search and fetch all other Digital Media items from target specimen */
    useEffect(() => {
        GetSpecimenDigitalMedia(digitalMedia.digitalEntity['ods:id'].replace('https://doi.org/', '')).then((specimenDigitalMedia) => {
            if (specimenDigitalMedia) {
                setSpecimenDigitalMedia(specimenDigitalMedia);
            }
        }).catch(error => {
            console.warn(error);
        });
    }, [digitalMedia]);

    /* View will be set by an Array containing Components */
    const digitalMediaItems: React.ReactElement[] = [];

    if (specimenDigitalMedia) {
        specimenDigitalMedia.forEach((specimenDigitalMedia) => {
            digitalMediaItems.push(
                <DigitalMediaListItem key={specimenDigitalMedia.digitalEntity['ods:id']} specimenDigitalMedia={specimenDigitalMedia} />
            );
        });
    }

    return (
        <div className={`${styles.digitalMediaList} bgc-white rounded-c h-100`}>
            {digitalMediaItems}
        </div>
    );
}

export default DigitalMediaList;