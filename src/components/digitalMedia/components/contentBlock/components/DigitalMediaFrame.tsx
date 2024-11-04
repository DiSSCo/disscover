/* Import Dependencies */
import { Annotorious } from "@annotorious/react";

/* Import Components */
import { ImageViewer } from "components/elements/Elements";

/* Import Types */
import { DigitalMedia } from "app/types/DigitalMedia";

/* Import API */
import GetDigitalMediaAnnotations from "api/digitalMedia/GetDigitalMediaAnnotations";


/* Props Type */
type Props = {
    digitalMedia: DigitalMedia,
    annotoriousMode: string
};


const DigitalMediaFrame = (props: Props) => {
    const { digitalMedia, annotoriousMode } = props;

    return (
        <div className="h-100">
            <Annotorious>
                <ImageViewer digitalMedia={digitalMedia}
                    annotoriousMode={annotoriousMode}
                    GetAnnotations={() => GetDigitalMediaAnnotations({ handle: digitalMedia["ods:ID"].replace(import.meta.env.VITE_DOI_URL, '') })}
                />
            </Annotorious>
        </div>
    );
};

export default DigitalMediaFrame;