/* Import dependencies */
import { useState } from 'react';

/* Import components */
import { Hero } from 'components/Hero/Hero';
import { AnnotationSidePanel } from 'components/elements/Elements';
import { TabsList } from 'components/Tabs/TabsList';
import { TabsContent } from 'components/Tabs/TabsContent';

/* Import hooks */
import { useDigitalSpecimenComplete, useDigitalSpecimenVersions } from 'hooks/useDigitalSpecimen';
import { useAnnotationHandler } from 'hooks/useAnnotationHooks';

/* Import types and enums */
import { CardCategory, TabItem } from 'types/digitalSpecimenTypes';
import { CategoryConfig, UIProperty } from 'types/dataMapperTypes';

/* Import styling */
import './DigitalSpecimenOverview.scss';

/* Import API */
import GetDigitalSpecimenComplete from 'api/digitalSpecimen/GetDigitalSpecimenComplete';
import GetDigitalSpecimenMas from 'api/digitalSpecimen/GetDigitalSpecimenMas';
import GetDigitalSpecimenMasJobRecords from 'api/digitalSpecimen/GetDigitalSpecimenMasJobRecords';
import ScheduleDigitalSpecimenMas from 'api/digitalSpecimen/ScheduleDigitalSpecimenMas';

/* Import schemas */
import DigitalSpecimenSchema from 'sources/dataModel/digitalSpecimen.json';
import DigitalSpecimenAnnotationCases from 'sources/annotationCases/DigitalSpecimenAnnotationCases.json';

/* Import utils */
import { getIdFromUrl } from 'utils/Utils';

/* Import subPages */
import { DigitalSpecimenDetails } from './SubPages/DigitalSpecimenDetails';
import { Identifications } from './SubPages/Identifications';
import { VersionDropdown } from 'components/VersionDropdown/VersionDropdown';

const DigitalSpecimenOverview = () => {
    /* Base variables */
    const [currentVersion, setCurrentVersion] = useState<number|undefined>();
    const { identifier } = getIdFromUrl();
    const { data: specimen, isLoading, isError } = useDigitalSpecimenComplete({ doi: identifier, version: currentVersion});
    const { data: versions } = useDigitalSpecimenVersions({ handle: identifier });
    const [annotationMode, setAnnotationMode] = useState(false);
    const [currentTab, setCurrentTab] = useState('overview');

    /* Hooks */
    const handleOpenAnnotation = useAnnotationHandler(setAnnotationMode);

    if (isLoading) return <main><p>Retrieving the Digital Specimen Details...</p></main>;
    if (!specimen) return <main><p>No data found</p></main>
    if (isError) return <main><p>Something went wrong with fetching the Digital Specimen. Please try again later.</p></main>;

    /* Helper to get raw data array by Category Enum */
    const getCardFragment = (category: CardCategory) => {
        return specimen?.mappedData?.find((cat: CategoryConfig) => cat.name === category)?.data || [];
    };

    /* Helper to get a field value */
    const getFieldValue = (category: CardCategory, label: string) => {
        return getCardFragment(category).find((field: UIProperty) => field.label === label)?.value;
    };

    /* Tabs */
    const tabs: TabItem[] = [
        {
            value: 'overview',
            title: 'Overview',
            component: <DigitalSpecimenDetails specimen={specimen} onAnnotate={handleOpenAnnotation}></DigitalSpecimenDetails>
        },
        {
            value: 'identifications',
            title: 'Identifications',
            component: <Identifications identificationData={specimen.identifications} onAnnotate={handleOpenAnnotation}></Identifications>
        }
    ]

    return (
        <div className="digital-specimen-page">
            <Hero
                title={getFieldValue(CardCategory.Identification, 'Scientific Name')}
                navigateTo={{ pathName:"/search", text: "Specimens"}}
                showShareButton={true}
                isHtml={specimen?.IDENTIFICATION?.scientificName?.value?.isHtml}
                badge={[{
                    content: getFieldValue(CardCategory.Identification, 'Rank')?.toLowerCase(),
                    type: 'solid',
                    color: 'grass'
                }]}
                annotate={true}
                AnnotateHelper={() => handleOpenAnnotation()}
            >
            </Hero>

            <main>
                {/* Tabs of the Digital Specimen & the version dropdown*/}
                <div className="specimen-content-controller">
                    <TabsList tabs={tabs} SetCurrentTab={(tab: string) => setCurrentTab(tab)} currentTab={currentTab}></TabsList>
                    <VersionDropdown
                        versions={versions?.data?.attributes?.versions.toReversed()}
                        onSelectVersion={(version: number) => setCurrentVersion(version)}
                        currentVersion={currentVersion}
                    >
                    </VersionDropdown>
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
                            superClass={specimen.data.attributes.digitalSpecimen}
                            schema={DigitalSpecimenSchema}
                            annotationCases={DigitalSpecimenAnnotationCases.annotationCases}
                            GetAnnotations={GetDigitalSpecimenComplete}
                            GetMas={GetDigitalSpecimenMas}
                            GetMasJobRecords={GetDigitalSpecimenMasJobRecords}
                            ScheduleMas={ScheduleDigitalSpecimenMas}
                            HideAnnotationSidePanel={() => setAnnotationMode(false)}
                        />
                    </aside>
                </>
            )}
        </div>
    );
};

export default DigitalSpecimenOverview;