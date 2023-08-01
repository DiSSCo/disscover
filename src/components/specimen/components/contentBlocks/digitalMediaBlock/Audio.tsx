/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { DigitalMedia } from "global/Types";

/* Import Styling */
import styles from 'components/specimen/specimen.module.scss';

/* Import Components */
import AudioPlayer from 'components/general/audioPlayer/AudioPlayer';


/* Props Typing */
interface Props {
    digitalMedia: DigitalMedia
};


const Audio = (props: Props) => {
    const { digitalMedia } = props;

    return (
        <AudioPlayer source="http://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3" />
    );
}

export default Audio;