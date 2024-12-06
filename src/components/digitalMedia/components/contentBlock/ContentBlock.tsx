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
    annotationMode: boolean,
    SetAnnotationTarget: Function,
    SetAnnotoriousMode: Function,
    SetSelectedTabIndex: Function
};


/**
 * Component that renders the content block on the digital media page
 * @param digitalMedia The selected digital media
 * @param annotoriousMode The currently selected Annotorious mode
 * @param selectedTabIndex The selected index for the digital specimen
 * @param annotationMode Boolean indicating if the annotation mode is on
 * @param SetAnnotationTarget Function to set the annotation target
 * @param SetAnnotoriousMode Function to set the Annotorious mode
 * @param SetSelectedTabIndex Function to set the selected tab index
 * @returns JSX Component
 */
const ContentBlock = (props: Props) => {
    const { digitalMedia, annotoriousMode, selectedTabIndex, annotationMode, SetAnnotationTarget, SetAnnotoriousMode, SetSelectedTabIndex } = props;

    /* Base variables */
    const tabs = {
        'digitalMedia': <DigitalMediaOverview digitalMedia={digitalMedia}
            annotoriousMode={annotoriousMode}
            SetAnnotoriousMode={SetAnnotoriousMode}
        />,
        'metadata': <DigitalMediaMetadata digitalMedia={digitalMedia}
            annotationMode={annotationMode}
            SetAnnotationTarget={SetAnnotationTarget}
        />,
        'entityRelationships': <EntityRelationships digitalObjectId={digitalMedia["@id"]}
            digitalObjectName={digitalMedia["dcterms:title"]}
            digitalObjectEntityRelationships={digitalMedia["ods:hasEntityRelationships"]}
            annotationMode={annotationMode}
            SetAnnotationTarget={SetAnnotationTarget}
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