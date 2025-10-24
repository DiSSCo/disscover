/* Import Dependencies */
import { isEmpty } from 'lodash';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

/* Import Components */
import { Assertions, DigitalSpecimenDigitalMedia, DigitalSpecimenOverview, Events, Identifications } from './ContentBlockComponents';
import { EntityRelationships } from 'components/elements/Elements';
import { Tabs } from 'components/elements/customUI/CustomUI';
import Identifiers from './components/Identifiers';


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen,
    digitalSpecimenDigitalMedia: DigitalMedia[] | undefined,
    selectedTabIndex: number,
    SetAnnotationTarget: Function,
    SetSelectedTabIndex: Function,
};


/**
 * Component that renders the content block on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @param digitalSpecimenDigitalMedia The digital media attached to the digital specimen
 * @param selectedTabIndex The selected index for the digital specimen tabs
 * @param SetAnnotationTarget Function to set the annotation target
 * @param SetSelectedTabIndex Function to set the selected tab index
 * @returns JSX Component
 */
const ContentBlock = (props: Props) => {
    const { digitalSpecimen, digitalSpecimenDigitalMedia, selectedTabIndex, SetAnnotationTarget, SetSelectedTabIndex } = props;

    const tabs = {
        'digitalSpecimen': <DigitalSpecimenOverview digitalSpecimen={digitalSpecimen}
            SetAnnotationTarget={SetAnnotationTarget}
        />,
        ...(digitalSpecimenDigitalMedia && !isEmpty(digitalSpecimenDigitalMedia) && {
            'digitalMedia': <DigitalSpecimenDigitalMedia digitalSpecimenDigitalMedia={digitalSpecimenDigitalMedia} />
        }),
        'events': <Events digitalSpecimen={digitalSpecimen}
        />,
        'identifications': <Identifications digitalSpecimen={digitalSpecimen}
        />,
        'entityRelationships': <EntityRelationships digitalObjectId={digitalSpecimen['@id']}
            digitalObjectName={digitalSpecimen['ods:specimenName']}
            digitalObjectEntityRelationships={digitalSpecimen['ods:hasEntityRelationships']}
        />,
        ...(!isEmpty(digitalSpecimen['ods:hasAssertions']) && {
            'assertions': <Assertions digitalSpecimen={digitalSpecimen}
            />
        }),
        'identifiers': <Identifiers digitalSpecimen={digitalSpecimen}/>
    };

    return (
        <div className="h-100">
            <Tabs tabs={tabs}
                selectedIndex={selectedTabIndex}
                tabProps={{
                    digitalSpecimen
                }}
                tabClassName="fs-5 px-3"
                tabPanelClassName="h-100 overflow-y-scroll overflow-x-hidden"
                SetSelectedIndex={(index: number) => SetSelectedTabIndex(index)}
            />
        </div>
    );
};

export default ContentBlock;