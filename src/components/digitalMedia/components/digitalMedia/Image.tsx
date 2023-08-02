/* Import Types */
import { DigitalMedia } from "global/Types"


/* Props Typing */
interface Props {
    digitalMedia: DigitalMedia
};


const Image = (props: Props) => {
    const { digitalMedia } = props;

    return (
        <img src={digitalMedia.mediaUrl}
            alt={digitalMedia.mediaUrl}
            className="h-100 border border-white"
        />
    )
}

export default Image;