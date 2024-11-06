/* Import Components */
import { ImageViewer } from "components/elements/Elements";


/* Props Type */
type Props = {
    mediaUrl: string
};


const DigitalMediaFrame = (props: Props) => {
    const { mediaUrl } = props;

    return (
        <div className="h-100">
            <ImageViewer mediaUrl={mediaUrl} />
        </div>
    );
};

export default DigitalMediaFrame;