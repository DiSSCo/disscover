/* Import styling */
import { Hero } from 'components/Hero/Hero';
import './DigitalMediaOverview.scss';
import { useState } from 'react';
import { useAnnotationHandler } from 'hooks/useAnnotationHooks';
import { AnnotationSidePanel } from 'components/elements/Elements';

/* Import API */
import GetDigitalSpecimenComplete from 'api/digitalSpecimen/GetDigitalSpecimenComplete';
import GetDigitalSpecimenMas from 'api/digitalSpecimen/GetDigitalSpecimenMas';
import GetDigitalSpecimenMasJobRecords from 'api/digitalSpecimen/GetDigitalSpecimenMasJobRecords';
import ScheduleDigitalSpecimenMas from 'api/digitalSpecimen/ScheduleDigitalSpecimenMas';

/* Import schemas */
import DigitalSpecimenSchema from 'sources/dataModel/digitalSpecimen.json';
import DigitalSpecimenAnnotationCases from 'sources/annotationCases/DigitalSpecimenAnnotationCases.json';
import { DigitalSpecimenTabs } from 'components/Tabs/Tabs';
import { DigitalMediaDetails } from './SubPages/DigitalMediaDetails';

export const DigitalMediaOverview = () => {
    /* Base variables */
    const [annotationMode, setAnnotationMode] = useState(false);

    /* Hooks */
    const handleOpenAnnotation = useAnnotationHandler(setAnnotationMode);

    /* Tabs */
    const tabs = [
        {
            value: 'media',
            title: 'Media',
            component: <DigitalMediaDetails onAnnotate={handleOpenAnnotation}></DigitalMediaDetails>
        }
    ]

    return (
        <div className="digital-specimen-page">
            <Hero
                title="image"
                navigateTo={{ pathName:"/search", text: "Specimen"}}
                showShareButton={true}
                badge={[{
                    content: 'image',
                    type: 'solid',
                    color: 'grass'
                }]}
                annotate={true}
                AnnotateHelper={() => handleOpenAnnotation()}
            >
            </Hero>
            <main>
                {/* Tabs of the Digital Specimen */}
                <DigitalSpecimenTabs defaultValue="media" tabs={tabs}></DigitalSpecimenTabs>
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
    )
}