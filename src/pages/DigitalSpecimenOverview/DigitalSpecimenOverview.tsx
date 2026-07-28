/* Import dependencies */
import { useState } from 'react';

/* Import components */
import { Hero } from 'components/Hero/Hero';
import { AnnotationSidePanel } from 'components/elements/Elements';
import { DigitalSpecimenTabs } from 'components/Tabs/Tabs';

/* Import hooks */
import { useDigitalSpecimenComplete } from 'hooks/useDigitalSpecimen';

/* Import types and enums */
import { CardCategory } from 'types/digitalSpecimenTypes';
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

/* Import hooks */
import { useAnnotationHandler } from 'hooks/useAnnotationHooks';

/* Import store */
import { DigitalSpecimenDetails } from './SubPages/DigitalSpecimenDetails';

const DigitalSpecimenOverview = () => {
    /* Base variables */
    const url = new URL(globalThis.location.href);
    const segments = url.pathname.split('/');
    const identifier = segments.slice(2).join("/");
    const { data: specimen, isLoading, isError } = useDigitalSpecimenComplete({ doi: identifier});
    const [annotationMode, setAnnotationMode] = useState(false);

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
    const tabs = [
        {
            value: 'overview',
            title: 'Overview',
            component: <DigitalSpecimenDetails specimen={specimen} onAnnotate={handleOpenAnnotation}></DigitalSpecimenDetails>
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

            {/* Tabs of the Digital Specimen */}
            <DigitalSpecimenTabs defaultValue="overview" tabs={tabs}></DigitalSpecimenTabs>

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