/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Styles */
import styles from 'components/digitalMedia/digitalMedia.module.scss';

/* Import Components */
import Image from 'components/general/mediaTypes/Image';
import Video from 'components/general/mediaTypes/Video';
import Audio from 'components/general/mediaTypes/Audio';
import File from 'components/general/mediaTypes/File';


const DigitalMediaFrame = () => {
    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);

    /* Check for the type of Digital Media and set content appropiate to it */
    let digitalMediaContent: React.ReactElement;

    switch (digitalMedia.type) {
        case '2DImageObject':
            digitalMediaContent = <Image digitalMedia={digitalMedia} sizeOrientation='height' />

            break;
        case 'video':
            digitalMediaContent = <Video digitalMedia={digitalMedia} />

            break;
        case 'audio':
            digitalMediaContent = <Audio digitalMedia={digitalMedia} />

            break;
        default:
            digitalMediaContent = <File digitalMedia={digitalMedia} />
    }

    return (
        <div className={`${styles.digitalMediaFrame} h-100 d-flex justify-content-center align-items-center`}>
            {digitalMediaContent}
        </div>
    );
}

export default DigitalMediaFrame;