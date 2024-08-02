/* Import Dependencies */
import classNames from "classnames";

/* Import Styling */
import styles from './video.module.scss';


/* Props Typing */
interface Props {
    accessURI: string,
    hover?: boolean
};


/**
 * Component that reners an element for displaying and playing video
 * @param accessURI The URL on which the media can be accessed
 * @param hover Boolean that indicates if a hover effect should be triggered when hovering over the video element
 * @returns JSX Component
 */
const Video = (props: Props) => {
    const { accessURI, hover } = props;

    /* Class Names */
    const classVideoHover = classNames({
        [`${styles.videoHover} z-2`]: hover,
        'position-relative transition': hover
    });

    if (accessURI.includes('youtube')) {
        return (
            <div className={`${classVideoHover} w-100 h-100`}>
                <iframe src={accessURI}
                    title="Stream to source video"
                    className={`w-100 h-100`}
                >
                    <track kind="captions" />
                </iframe>
            </div>
        );
    } else {
        return (
            <div className={`${classVideoHover} w-100 h-100`}>
                <video className="w-100 rounded"
                    title={`Video player for: ${accessURI}`}
                >
                    <track kind="captions" />
                    <source src={accessURI} type="video/mp4" />
                    <source src={accessURI} type="video/ogg" />
                    Your browser does not support direct video
                </video>
            </div>
        );
    }
};

export default Video;