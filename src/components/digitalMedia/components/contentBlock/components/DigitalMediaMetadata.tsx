/* Import Types */
import { DigitalMedia } from "app/types/DigitalMedia";
import { Dict } from "app/Types";

/* Import Components */
import { ClassProperties } from "components/elements/Elements";


/* Props Type */
type Props = {
    digitalMedia: DigitalMedia,
};


/**
 * Component that renders the digital media metadata content block on the digital media page
 * @param digitalMedia The selected digital media item
 * @returns JSX Component
 */
const DigitalMediaMetadata = (props: Props) => {
    const { digitalMedia } = props;

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
            />
        </div>
    );
};

export default DigitalMediaMetadata;