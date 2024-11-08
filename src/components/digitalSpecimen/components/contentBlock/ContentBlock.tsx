/* Import Dependencies */
import { isEmpty } from 'lodash';
import { useState } from 'react';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

/* Import Components */
import { Assertions, DigitalSpecimenDigitalMedia, DigitalSpecimenOverview, EntityRelationships, Events, Identifications } from './ContentBlockComponents';
import { Tabs } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen,
    digitalSpecimenDigitalMedia: DigitalMedia[] | undefined
};


/**
 * Component that renders the content block on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @param digitalSpecimenDigitalMedia The digital media attached to the digital specimen
 * @returns JSX Component
 */
const ContentBlock = (props: Props) => {
    const { digitalSpecimen, digitalSpecimenDigitalMedia } = props;

    /* Base variables */
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const tabs = {
        'digitalSpecimen': <DigitalSpecimenOverview digitalSpecimen={digitalSpecimen} />,
        ...(digitalSpecimenDigitalMedia && !isEmpty(digitalSpecimenDigitalMedia) && {
            'digitalMedia': <DigitalSpecimenDigitalMedia digitalSpecimenDigitalMedia={digitalSpecimenDigitalMedia} />
        }),
        'events': <Events digitalSpecimen={digitalSpecimen} />,
        'identifications': <Identifications digitalSpecimen={digitalSpecimen} />,
        'entityRelationships': <EntityRelationships digitalSpecimen={digitalSpecimen} />,
        ...(!isEmpty(digitalSpecimen['ods:hasAssertion']) && {
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
                SetSelectedIndex={(index: number) => setSelectedTabIndex(index)}
            />
        </div>
    );
};

export default ContentBlock;