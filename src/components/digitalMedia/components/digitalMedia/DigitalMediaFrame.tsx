/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Styles */
import styles from 'components/digitalMedia/digitalMedia.module.scss';

/* Import Components */
import IIIFView from 'components/general/media/IIIFView';


const DigitalMediaFrame = () => {
    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);

    /* Check for the type of Digital Media and set content appropiate to it */
    let digitalMediaContent;

    if (digitalMedia.type === '2DImageObject') {
        digitalMediaContent = <img src={digitalMedia.mediaUrl}
            alt={digitalMedia.mediaUrl}
            className="h-100 border border-white"
        />
    } else if (digitalMedia.format === 'application/json' || digitalMedia.format === 'application/ld+json') {
        digitalMediaContent = <IIIFView mediaUrl={digitalMedia.mediaUrl} />
    } else {
        digitalMediaContent = <img src={digitalMedia.mediaUrl}
            alt={digitalMedia.mediaUrl}
            className="h-100 border border-white"
        />;
    }

    return (
        <div className={`${styles.digitalMediaFrame} h-100 d-flex justify-content-center`}>
            {digitalMediaContent}
        </div>
    );
}

export default DigitalMediaFrame;