/* Import Types */
import { DigitalMedia } from "app/types/DigitalMedia";
import { Dict } from "app/Types";

/* Import Components */
import { ClassProperties } from "components/elements/Elements";


/* Props Type */
type Props = {
    digitalMedia: DigitalMedia,
    annotationMode: boolean,
    SetAnnotationTarget: Function
};


/**
 * Component that renders the digital media metadata content block on the digital media page
 * @param digitalMedia The selected digital media item
 * @param annotationMode Boolean indicating if the annotation mode is on
 * @param SetAnnotationTarget Function to set the annotation target
 * @returns JSX Component
 */
const DigitalMediaMetadata = (props: Props) => {
    const { digitalMedia, annotationMode, SetAnnotationTarget } = props;

    /* Base variables */
    const metadata: {
        mainProperties: Dict
    } = {
        mainProperties: {}
    };
    const jsonPaths: {
        [propertySection: string]: string
    } = {
        mainProperties: "$"
    };

    /* Construct table properties */
    Object.entries(digitalMedia).filter(([_key, value]) => typeof (value) !== 'object').forEach(([key, value]: [string, any]) => {
        metadata.mainProperties[key] = value;
    });

    return (
        <div className="h-100">
            <ClassProperties key={metadata.mainProperties['@id']}
                title="Metadata"
                properties={metadata}
                jsonPaths={jsonPaths}
                annotationMode={annotationMode}
                SetAnnotationTarget={SetAnnotationTarget}
            />
        </div>
    );
};

export default DigitalMediaMetadata;