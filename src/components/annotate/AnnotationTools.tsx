/* Import Dependencies */
import classNames from "classnames";

/* Import Types */
import { Dict } from "app/Types";
import { Annotation } from "app/types/Annotation";

/* Import Components */
import AutomatedAnnotationsModal from "components/general/automatedAnnotations/automatedAnnotations/AutomatedAnnotationsModal";
import SidePanel from "./sidePanel/SidePanel";


/* Props Typing */
interface Props {
    targetId: string,
    sidePanelToggle: boolean,
    automatedAnnotationsToggle: boolean,
    SetAutomatedAnnotationToggle: Function,
    ShowWithAnnotations: Function,
    UpdateAnnotationsSource: Function,
    RefreshAnnotations: Function,
    GetMachineJobRecords: (targetId: string, pageSize: number, pageNumber: number) => Promise<{machineJobRecords: Dict[], links: Dict}>
};


const AnnotationTools = (props: Props) => {
    const { 
        targetId, sidePanelToggle, automatedAnnotationsToggle, SetAutomatedAnnotationToggle,
        ShowWithAnnotations, UpdateAnnotationsSource, RefreshAnnotations, GetMachineJobRecords
    } = props;

    /* Class Names */
    const classSidePanel = classNames({
        'p-0 h-100': true,
        'w-0': !sidePanelToggle,
        'col-md-4': sidePanelToggle
    });
    
    return (
        <>
            {/* Automated Annotations Modal */}
            <AutomatedAnnotationsModal targetId={targetId}
                automatedAnnotationsToggle={automatedAnnotationsToggle}
                HideAutomatedAnnotationsModal={() => SetAutomatedAnnotationToggle(false)}
                GetMachineJobRecords={GetMachineJobRecords}
            />

            {/* Annotations Side Panel */}
            <div className={`${classSidePanel} transition`}>
                <SidePanel ShowWithAllAnnotations={() => ShowWithAnnotations()}
                    UpdateAnnotationsSource={(annotation: Annotation, remove?: boolean) => UpdateAnnotationsSource(annotation, remove)}
                    RefreshAnnotations={(targetProperty: string) => RefreshAnnotations(targetProperty)}
                />
            </div>
        </>
    );
}

export default AnnotationTools;