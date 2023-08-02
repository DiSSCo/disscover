/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Styles */
import styles from 'components/digitalMedia/digitalMedia.module.scss';

/* Import Components */
import Image from './Image';
import Video from './Video';
import Audio from './Audio';
import File from './File';


const DigitalMediaFrame = () => {
    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);

    /* Check for the type of Digital Media and set content appropiate to it */
    let digitalMediaContent: React.ReactElement;

    switch (digitalMedia.type) {
        case '2DImageObject':
            digitalMediaContent = <Image digitalMedia={digitalMedia} />

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