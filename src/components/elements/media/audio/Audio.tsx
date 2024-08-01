/* Import Components */
import { AudioPlayer } from 'components/elements/customUI/CustomUI';


/* Props Typing */
type Props = {
    accessURI: string
};


/**
 * Component that renders an audio element for displaying and playing audio
 * @param accessURI The URL on which the media can be accessed
 * @returns JSX Component
 */
const Audio = (props: Props) => {
    const { accessURI } = props;

    return (
        <AudioPlayer accessURI={accessURI} />
    );
};

export default Audio;