/* Import Components */
import { ImageViewer } from "components/elements/Elements";

/* Import Types */
import { DigitalMedia } from "app/types/DigitalMedia";


/* Props Type */
type Props = {
    digitalMedia: DigitalMedia
};


const DigitalMediaFrame = (props: Props) => {
    const { digitalMedia } = props;

    return (
        <div className="h-100">
            <ImageViewer digitalMedia={digitalMedia} />
        </div>
    );
};

export default DigitalMediaFrame;