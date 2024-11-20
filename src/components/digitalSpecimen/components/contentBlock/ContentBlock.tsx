/* Import Dependencies */
import { isEmpty } from 'lodash';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

/* Import Components */
import { Assertions, DigitalSpecimenDigitalMedia, DigitalSpecimenOverview, EntityRelationships, Events, Identifications } from './ContentBlockComponents';
import { Tabs } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen,
    digitalSpecimenDigitalMedia: DigitalMedia[] | undefined,
    selectedTabIndex: number,
    SetSelectedTabIndex: Function
};


/**
 * Component that renders the content block on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @param digitalSpecimenDigitalMedia The digital media attached to the digital specimen
 * @param selectedTabIndex The selected index for the digital specimen tabs
 * @param SetSelectedTabIndex Function to set the selected tab index
 * @returns JSX Component
 */
const ContentBlock = (props: Props) => {
    const { digitalSpecimen, digitalSpecimenDigitalMedia, selectedTabIndex, SetSelectedTabIndex } = props;

    /* Base variables */
    const tabs = {
        'digitalSpecimen': <DigitalSpecimenOverview digitalSpecimen={digitalSpecimen} />,
        ...(digitalSpecimenDigitalMedia && !isEmpty(digitalSpecimenDigitalMedia) && {
            'digitalMedia': <DigitalSpecimenDigitalMedia digitalSpecimenDigitalMedia={digitalSpecimenDigitalMedia} />
        }),
        'events': <Events digitalSpecimen={digitalSpecimen} />,
        'identifications': <Identifications digitalSpecimen={digitalSpecimen} />,
        'entityRelationships': <EntityRelationships digitalSpecimen={digitalSpecimen} />,
        ...(!isEmpty(digitalSpecimen['ods:hasAssertions']) && {
            'assertions': <Assertions digitalSpecimen={digitalSpecimen} />
        })
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