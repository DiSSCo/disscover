/* Import Dependencies */
import classNames from "classnames";

/* Import Types */
import { Annotation } from "app/Types";

/* Import Components */
import AutomatedAnnotationsModal from "components/general/automatedAnnotations/automatedAnnotations/AutomatedAnnotationsModal";
import SidePanel from "./sidePanel/SidePanel";


/* Props Typing */
interface Props {
    sidePanelToggle: boolean,
    automatedAnnotationsToggle: boolean,
    SetAutomatedAnnotationToggle: Function,
    ShowWithAnnotations: Function,
    UpdateAnnotationsSource: Function,
    RefreshAnnotations: Function
};


const AnnotationTools = (props: Props) => {
    const {
        sidePanelToggle, automatedAnnotationsToggle, SetAutomatedAnnotationToggle,
        ShowWithAnnotations, UpdateAnnotationsSource, RefreshAnnotations
    } = props;

    /* Class Names */
    const classSidePanel = classNames({
        'p-0': true,
        'w-0': !sidePanelToggle,
        'col-md-4': sidePanelToggle
    });
    
    return (
        <>
            {/* Automated Annotations Modal */}
            <AutomatedAnnotationsModal automatedAnnotationsToggle={automatedAnnotationsToggle}
                HideAutomatedAnnotationsModal={() => SetAutomatedAnnotationToggle(false)}
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