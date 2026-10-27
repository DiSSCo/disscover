/* Import components */
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

/* Import types */
import { RawDigitalMediaData, RawSpecimenData } from "types/dataMapperTypes";

type AnnotationProps = {
    setAnnotationMode: (mode: boolean) => void;
    specimen?: RawSpecimenData;
    digitalMedia?: RawDigitalMediaData;
};

export const AnnotationRenderer = ({ setAnnotationMode, specimen, digitalMedia }: AnnotationProps) => {
    /* Define closing function */
    const handleClose = () => setAnnotationMode(false);

    /* Set annotation panel props on either digital specimen or digital media as those are the only two options */
    const getPanelProps = () => {
        if (digitalMedia) {
            return {
                superClass: digitalMedia.data?.attributes,
                schema: DigitalMediaSchema,
                annotationCases: DigitalMediaAnnotationCases.annotationCases,
                GetAnnotations: GetDigitalMediaAnnotations,
                GetMas: GetDigitalMediaMas,
                GetMasJobRecords: GetDigitalMediaMasJobRecords,
                ScheduleMas: ScheduleDigitalMediaMas,
            };
        }
        
        if (specimen) {
            return {
                superClass: specimen.data?.attributes?.digitalSpecimen,
                schema: DigitalSpecimenSchema,
                annotationCases: DigitalSpecimenAnnotationCases.annotationCases,
                GetAnnotations: GetDigitalSpecimenComplete,
                GetMas: GetDigitalSpecimenMas,
                GetMasJobRecords: GetDigitalSpecimenMasJobRecords,
                ScheduleMas: ScheduleDigitalSpecimenMas,
            };
        }

        return null;
    };

    /* Get panel props */
    const panelProps = getPanelProps();

    /* Return if no props can be set, because specimen and digitalMedia are not provided */
    if (!panelProps) return null;

    return (
        <>
            <button
                type="button"
                className="annotation-panel-overlay"
                tabIndex={0}
                aria-label="Close annotation panel"
                onClick={handleClose} 
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleClose();
                    }
                }}
            />
            <aside className="annotation-panel-container">
                <AnnotationSidePanel
                    {...panelProps}
                    HideAnnotationSidePanel={handleClose}
                />
            </aside>
        </>
    );
};