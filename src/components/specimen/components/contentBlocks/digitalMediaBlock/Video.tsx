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

    /* Temporary */
    let mediaUrl = "https://www.youtube.com/embed/4PY0uilPMfk";

    if (mediaUrl.includes('youtube')) {
        return (
            <div className={`${styles.videoHover} w-100 h-100 position-relative transition`}>
                <iframe className={`w-100 h-100`} src="https://www.youtube.com/embed/4PY0uilPMfk" />
            </div>
        );
    } else {
        return (
            <div className={`${styles.videoHover} w-100 h-100 position-relative transition`}>
                <video className="w-100 rounded">
                    <source src={mediaUrl} type="video/mp4" />
                    <source src={mediaUrl} type="video/ogg" />
                    Your browser does not support direct video
                </video>
            </div>
        );
    }
}

export default Video;