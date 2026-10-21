import { AnnotationSidePanel } from "components/elements/Elements";

/* Import API */
import GetDigitalSpecimenComplete from 'api/digitalSpecimen/GetDigitalSpecimenComplete';
import GetDigitalSpecimenMas from 'api/digitalSpecimen/GetDigitalSpecimenMas';
import GetDigitalSpecimenMasJobRecords from 'api/digitalSpecimen/GetDigitalSpecimenMasJobRecords';
import ScheduleDigitalSpecimenMas from 'api/digitalSpecimen/ScheduleDigitalSpecimenMas';
import GetDigitalMediaAnnotations from 'api/digitalMedia/GetDigitalMediaAnnotations';
import GetDigitalMediaMas from 'api/digitalMedia/GetDigitalMediaMas';
import GetDigitalMediaMasJobRecords from 'api/digitalMedia/GetDigitalMediaMasJobRecords';
import ScheduleDigitalMediaMas from 'api/digitalMedia/ScheduleDigitalMediaMas';

/* Import schemas */
import DigitalSpecimenSchema from 'sources/dataModel/digitalSpecimen.json';
import DigitalSpecimenAnnotationCases from 'sources/annotationCases/DigitalSpecimenAnnotationCases.json';
import DigitalMediaSchema from 'sources/dataModel/digitalMedia.json';
import DigitalMediaAnnotationCases from 'sources/annotationCases/DigitalMediaAnnotationCases.json';

type AnnotationProps = {
    setAnnotationMode: Function,
    specimen?: any,
    digitalMedia?: any
}

export const AnnotationRenderer = ({ setAnnotationMode, specimen, digitalMedia }: AnnotationProps ) => {
    return (
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
            {   digitalMedia ?
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
            :
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
            }
        </aside>
    </>
    )
}