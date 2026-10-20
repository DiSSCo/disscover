/* Import components */
import { Hero } from 'components/Hero/Hero';
import { TabsContent } from 'components/Tabs/TabsContent';
import { TabsList } from 'components/Tabs/TabsList';
import { AnnotationSidePanel } from 'components/elements/Elements';

/* Import dependencies */
import { RetrieveEnvVariable } from 'app/Utilities';
import { useState } from 'react';

/* Import hooks */
import { useDigitalMedia } from 'hooks/useDigitalMedia';

/* Import subPages */
import { DigitalMediaDetails } from './SubPages/DigitalMediaDetails';
import { RelatedLinks } from 'pages/ReusableTemplates/RelatedLinks';

/* Import utils */
import { getIdFromUrl } from 'utils/Utils';

/* Import Sources */
import DigitalMediaSchema from 'sources/dataModel/digitalMedia.json';
import DigitalMediaAnnotationCases from 'sources/annotationCases/DigitalMediaAnnotationCases.json';

/* Import types */
import { TabItem } from 'types/digitalSpecimenTypes';

import { useAnnotationHandler } from 'hooks/useAnnotationHooks';

/* Import services */
import GetDigitalMediaAnnotations from 'api/digitalMedia/GetDigitalMediaAnnotations';
import GetDigitalMediaMas from 'api/digitalMedia/GetDigitalMediaMas';
import GetDigitalMediaMasJobRecords from 'api/digitalMedia/GetDigitalMediaMasJobRecords';
import ScheduleDigitalMediaMas from 'api/digitalMedia/ScheduleDigitalMediaMas';

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
                <>
                    <button
                        type="button"
                        className="annotation-panel-overlay"
                        tabIndex={0}
                        aria-label="Close annotation panel"
                        onClick={() => setAnnotationMode(false)} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                setAnnotationMode(false);
                            }
                        }}
                    ></button>
                    <aside className="annotation-panel-container">
                        <AnnotationSidePanel
                            superClass={digitalMedia.data.attributes}
                            schema={DigitalMediaSchema}
                            annotationCases={DigitalMediaAnnotationCases.annotationCases}
                            GetAnnotations={GetDigitalMediaAnnotations}
                            GetMas={GetDigitalMediaMas}
                            GetMasJobRecords={GetDigitalMediaMasJobRecords}
                            ScheduleMas={ScheduleDigitalMediaMas}
                            HideAnnotationSidePanel={() => setAnnotationMode(false)}
                        />
                    </aside>
                </>
            )}
        </div>
    )
}