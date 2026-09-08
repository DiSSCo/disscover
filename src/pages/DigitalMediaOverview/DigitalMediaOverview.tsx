/* Import components */
import { RetrieveEnvVariable } from 'app/Utilities';
import { Hero } from 'components/Hero/Hero';
import { useDigitalMedia } from 'hooks/useDigitalMedia';
import { DigitalMediaDetails } from './SubPages/DigitalMediaDetails';
import { DigitalSpecimenTabs } from 'components/Tabs/Tabs';

export const DigitalMediaOverview = () => {
    /* Base variables */
    const { data: digitalMedia, isLoading } = useDigitalMedia({ handle: 'TEST/9LV-YBE-QY3' });

    const getFieldValue = (label: string) => {
        return digitalMedia?.digitalMediaData?.find((item: { label: string; }) => item.label === label).value;
    }

    if (isLoading) return <main><p>Retrieving the Digital Media Details...</p></main>;

    /* Tabs */
    const tabs = [
        {
            value: 'media',
            title: 'Media',
            component: <DigitalMediaDetails data={digitalMedia?.digitalMediaData}></DigitalMediaDetails>
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
                <DigitalSpecimenTabs defaultValue="media" tabs={tabs}></DigitalSpecimenTabs>
            </main>
        </div>
    )
}