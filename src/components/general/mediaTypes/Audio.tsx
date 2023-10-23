/* Import Types */
import { DigitalMedia } from 'app/Types';

/* Import Components */
import AudioPlayer from 'components/general/audioPlayer/AudioPlayer';


/* Props Typing */
interface Props {
    digitalMedia: DigitalMedia
};


const Audio = (props: Props) => {
    const { digitalMedia } = props;

    return (
        <AudioPlayer source={digitalMedia.digitalEntity['ac:accessUri']} />
    );
}

export default Audio;