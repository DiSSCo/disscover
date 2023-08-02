/* Import Types */
import { DigitalMedia } from "global/Types";


/* Props Typing */
interface Props {
    digitalMedia: DigitalMedia
};


const Video = (props: Props) => {
    const { digitalMedia } = props;

    if (digitalMedia.mediaUrl.includes('youtube')) {
        return (
            <div className="w-100 h-100">
                <iframe className={`w-100 h-100`} src={digitalMedia.mediaUrl} />
            </div>
        );
    } else {
        return (
            <div className="w-100 h-100">
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