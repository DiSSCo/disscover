/* Import Types */
import { DigitalMedia } from "global/Types";

/* Import Styling */
import styles from 'components/specimen/specimen.module.scss';


/* Props Typing */
interface Props {
    digitalMedia: DigitalMedia
};


const Video = (props: Props) => {
    const { digitalMedia } = props;

    if (digitalMedia.mediaUrl.includes('youtube')) {
        return (
            <div className={`${styles.videoHover} w-100 h-100 position-relative transition`}>
                <iframe className={`w-100 h-100`} src={digitalMedia.mediaUrl} />
            </div>
        );
    } else {
        return (
            <div className={`${styles.videoHover} w-100 h-100 position-relative transition`}>
                <video className="w-100 rounded">
                    <source src={digitalMedia.mediaUrl} type="video/mp4" />
                    <source src={digitalMedia.mediaUrl} type="video/ogg" />
                    Your browser does not support direct video
                </video>
            </div>
        );
    }
}

export default Video;