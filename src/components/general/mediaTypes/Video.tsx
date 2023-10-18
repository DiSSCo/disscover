/* Import Dependencies */
import classNames from "classnames";

/* Import Types */
import { DigitalMedia } from "app/Types";

/* Import Styling */
import styles from 'components/specimen/specimen.module.scss';


/* Props Typing */
interface Props {
    digitalMedia: DigitalMedia,
    hoverEffect?: boolean
};


const Video = (props: Props) => {
    const { digitalMedia, hoverEffect } = props;

    /* Class Names */
    const classVideoHover = classNames({
        [`${styles.videoHover} z-2`]: hoverEffect,
        'position-relative transition': hoverEffect
    });

    if (digitalMedia['ac:accessUri'].includes('youtube')) {
        return (
            <div className={`${classVideoHover} w-100 h-100`}>
                <iframe className={`w-100 h-100`} src={digitalMedia['ac:accessUri']} />
            </div>
        );
    } else {
        return (
            <div className={`${classVideoHover} w-100 h-100`}>
                <video className="w-100 rounded">
                    <source src={digitalMedia['ac:accessUri']} type="video/mp4" />
                    <source src={digitalMedia['ac:accessUri']} type="video/ogg" />
                    Your browser does not support direct video
                </video>
            </div>
        );
    }
}

export default Video;