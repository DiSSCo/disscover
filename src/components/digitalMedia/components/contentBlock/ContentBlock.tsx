/* Import Types */
import { DigitalMedia } from "app/types/DigitalMedia";

/* Import Components */
import { DigitalMediaMetadata, DigitalMediaOverview } from "./ContentBlockComponents";
import { EntityRelationships } from "components/elements/Elements";
import { Tabs } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    digitalMedia: DigitalMedia,
    annotoriousMode: string,
    selectedTabIndex: number,
    SetAnnotoriousMode: Function,
    SetSelectedTabIndex: Function
};


/**
 * Component that renders the content block on the digital media page
 * @param digitalMedia The selected digital media
 * @param annotoriousMode The currently selected Annotorious mode
 * @param selectedTabIndex The selected index for the digital specimen
 * @param SetAnnotoriousMode Function to set the Annotorious mode
 * @param SetSelectedTabIndex Function to set the selected tab index
 * @returns JSX Component
 */
const ContentBlock = (props: Props) => {
    const { digitalMedia, annotoriousMode, selectedTabIndex, SetAnnotoriousMode, SetSelectedTabIndex } = props;

    /* Base variables */
    const tabs = {
        'digitalMedia': <DigitalMediaOverview digitalMedia={digitalMedia}
            annotoriousMode={annotoriousMode}
            SetAnnotoriousMode={SetAnnotoriousMode}
        />,
        'metadata': <DigitalMediaMetadata digitalMedia={digitalMedia}
        />,
        'entityRelationships': <EntityRelationships digitalObjectId={digitalMedia["@id"]}
            digitalObjectName={digitalMedia["dcterms:title"]}
            digitalObjectEntityRelationships={digitalMedia["ods:hasEntityRelationships"]}
        />
    };

    return (
        <div className="h-100 d-flex flex-column">
            <Tabs tabs={tabs}
                selectedIndex={selectedTabIndex}
                tabClassName="fs-5 px-3"
                tabPanelClassName="h-100 overflow-y-scroll overflow-x-hidden"
                SetSelectedIndex={(index: number) => SetSelectedTabIndex(index)}
            />
        </div>
    );
};

export default ContentBlock;