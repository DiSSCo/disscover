/* Import components */
import { Hero } from 'components/Hero/Hero';
import { DigitalSpecimenTabs } from 'components/Tabs/Tabs';

/* Import dependencies */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Import hooks */
import { useDigitalMedia } from 'hooks/useDigitalMedia';

/* Import subPages */
import { DigitalMediaDetails } from './SubPages/DigitalMediaDetails';

/* Import utils */
import { getIdFromUrl } from 'utils/Utils';

export const DigitalMediaOverview = () => {
    /* Base variables */
    const { identifier } = getIdFromUrl();
    const { data: digitalMedia, isLoading } = useDigitalMedia({ handle: identifier });

    const getFieldValue = (label: string) => {
        return digitalMedia?.digitalMediaData?.find((item: { label: string; }) => item.label === label).value;
    }

    if (isLoading) return <main><p>Retrieving the Digital Media Details...</p></main>;

    /* Tabs */
    const tabs = [
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
                <DigitalSpecimenTabs defaultValue="media" tabs={tabs}></DigitalSpecimenTabs>
            </main>
        </div>
    )
}