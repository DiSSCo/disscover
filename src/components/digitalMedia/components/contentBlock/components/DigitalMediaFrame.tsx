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
    annotoriousMode: string,
    SetAnnotoriousMode: Function
};


/**
 * Component that renders the digital media frame with image viewer on the digital media page
 * @param digitalMedia The selected digital media item
 * @param annotoriousMode The currently selected Annotorious mode
 * @param SetAnnotoriousMode Function to set the Annotirous mode
 * @returns JSX Component
 */
const DigitalMediaFrame = (props: Props) => {
    const { digitalMedia, annotoriousMode, SetAnnotoriousMode } = props;

    return (
        <div className="h-100">
            <Annotorious>
                <ImageViewer digitalMedia={digitalMedia}
                    annotoriousMode={annotoriousMode}
                    GetAnnotations={() => GetDigitalMediaAnnotations({ handle: digitalMedia["ods:ID"].replace(import.meta.env.VITE_DOI_URL, '') })}
                    SetAnnotoriousMode={SetAnnotoriousMode}
                />
            </Annotorious>
        </div>
    );
};

export default DigitalMediaFrame;