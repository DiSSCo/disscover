/* Import components */
import { Hero } from 'components/Hero/Hero';
import { TabsContent } from 'components/Tabs/TabsContent';
import { TabsList } from 'components/Tabs/TabsList';
import { AnnotationRenderer } from 'components/AnnotationRenderer/AnnotationRenderer';

/* Import dependencies */
import { RetrieveEnvVariable } from 'app/Utilities';
import { useState } from 'react';

/* Import hooks */
import { useDigitalMedia } from 'hooks/useDigitalMedia';
import { useAnnotationHandler } from 'hooks/useAnnotationHooks';

/* Import subPages */
import { DigitalMediaDetails } from './SubPages/DigitalMediaDetails';
import { JsonViewer } from 'pages/ReusableTemplates/JsonViewer';
import { RelatedLinks } from 'pages/ReusableTemplates/RelatedLinks';

/* Import utils */
import { getIdFromUrl } from 'utils/Utils';

/* Import types */
import { TabItem } from 'types/digitalSpecimenTypes';

export const DigitalMediaOverview = () => {
    /* Base variables */
    const { identifier } = getIdFromUrl();
    const { data: digitalMedia, isLoading } = useDigitalMedia({ handle: identifier });
    const [annotationMode, setAnnotationMode] = useState(false);
    const [currentTab, setCurrentTab] = useState('media');

    /* Hooks */
    const handleOpenAnnotation = useAnnotationHandler(setAnnotationMode);

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
        },
        {
            value: 'links',
            title: 'Links',
            component: <RelatedLinks data={digitalMedia.entityRelationships}></RelatedLinks>
        },
        {
            value: 'full-data',
            title: 'Full Data',
            component: <JsonViewer json={digitalMedia.data}></JsonViewer>
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
                annotate={true}
                AnnotateHelper={() => handleOpenAnnotation()}
            >
            </Hero>
            <main>
                <div className="specimen-content-controller">
                    <TabsList tabs={tabs} setCurrentTab={(tab: string) => setCurrentTab(tab)} currentTab={currentTab}></TabsList>
                </div>
                <TabsContent tabs={tabs} currentTab={currentTab}></TabsContent>
            </main>
            {annotationMode && (
                <AnnotationRenderer digitalMedia={digitalMedia} setAnnotationMode={() => setAnnotationMode(false)}></AnnotationRenderer>
            )}
        </div>
    )
}