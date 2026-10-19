/* Import components */
import { Hero } from 'components/Hero/Hero';
import { TabsContent } from 'components/Tabs/TabsContent';
import { TabsList } from 'components/Tabs/TabsList';

/* Import dependencies */
import { RetrieveEnvVariable } from 'app/Utilities';
import { useState } from 'react';

/* Import hooks */
import { useDigitalMedia } from 'hooks/useDigitalMedia';

/* Import subPages */
import { DigitalMediaDetails } from './SubPages/DigitalMediaDetails';

/* Import utils */
import { getIdFromUrl } from 'utils/Utils';

/* Import types */
import { TabItem } from 'types/digitalSpecimenTypes';

export const DigitalMediaOverview = () => {
    /* Base variables */
    const { identifier } = getIdFromUrl();
    const { data: digitalMedia, isLoading } = useDigitalMedia({ handle: identifier });
    const [currentTab, setCurrentTab] = useState('media');

    const getFieldValue = (label: string) => {
        return digitalMedia?.digitalMediaData?.find((item: { label: string; }) => item.label === label).value;
    }

    if (isLoading) return <main><p>Retrieving the Digital Media Details...</p></main>;

    /* Tabs */
    const tabs: TabItem[] = [
        {
            value: 'media',
            title: 'Media',
            component: <DigitalMediaDetails data={digitalMedia}></DigitalMediaDetails>
        }
    ]

    return (
        <div className="digital-specimen-page">
            <Hero
                title={getFieldValue('DOI').replace(RetrieveEnvVariable('DOI_URL'), '')}
                showShareButton={true}
                badge={[{
                    content: 'image',
                    type: 'solid',
                    color: 'amber'
                }]}
            >
            </Hero>
            <main>
                <TabsList tabs={tabs} SetCurrentTab={(tab: string) => setCurrentTab(tab)} currentTab={currentTab}></TabsList>
                <TabsContent tabs={tabs} currentTab={currentTab}></TabsContent>
            </main>
        </div>
    )
}