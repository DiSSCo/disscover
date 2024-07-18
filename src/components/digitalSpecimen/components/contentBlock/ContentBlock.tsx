/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { DigitalSpecimen } from 'app/Types';

/* Import Components */
import { Assertions, DigitalSpecimenDigitalMedia, DigitalSpecimenOverview, EntityRelationships, Events, Identifications, OriginalData } from './ContentBlockComponents';
import { Tabs } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen
};


/**
 * Component that renders the content block on the digital specimen page
 * @param digitalSpecimen The selected digital specimen
 * @returns JSX Component
 */
const ContentBlock = (props: Props) => {
    const { digitalSpecimen } = props;

    /* Base variables */
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const tabs = {
        'digitalSpecimen': <DigitalSpecimenOverview />,
        'digitalMedia': <DigitalSpecimenDigitalMedia />,
        'events': <Events />,
        'identifications': <Identifications />,
        'entityRelationships': <EntityRelationships />,
        'assertions': <Assertions />,
        'originalData': <OriginalData />
    };

    return (
        <div className="h-100">
            <Tabs tabs={tabs}
                selectedIndex={selectedTabIndex}
                tabProps={{
                    digitalSpecimen
                }}
                tabClassName="fs-5 px-3"
                SetSelectedIndex={(index: number) => setSelectedTabIndex(index)}
            />
        </div>
    );
};

export default ContentBlock;