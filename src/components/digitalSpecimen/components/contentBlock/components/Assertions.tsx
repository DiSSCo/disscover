/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";

/* Import Components */
import { ClassProperties } from "components/elements/Elements";


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen,
    annotationMode: boolean,
    SetAnnotationTarget: Function
};


/**
 * Component that renders
 * @param digitalSpecimen The selected digital specimen
 * @param annotationMode Boolean indicating ig the annotation mode is on
 * @param SetAnnotationTarget Function to set the annotation target
 * @returns JSX Component
 */
const Assertions = (props: Props) => {
    const { digitalSpecimen, annotationMode, SetAnnotationTarget } = props;

    /* Base variables */
    const jsonPaths: {
        [propertySection: string]: string
    } = {
        mainProperties: "$['ods:hasAssertions'][index]",
    };

    return (
        <div className="h-100">
            {digitalSpecimen["ods:hasAssertions"]?.map((assertion, index) => (
                <ClassProperties key={assertion["@id"]}
                    index={index}
                    title="assertion"
                    properties={assertion}
                    jsonPaths={jsonPaths}
                    annotationMode={annotationMode}
                    SetAnnotationTarget={SetAnnotationTarget}
                />
            ))}
        </div>
    );
};

export default Assertions;