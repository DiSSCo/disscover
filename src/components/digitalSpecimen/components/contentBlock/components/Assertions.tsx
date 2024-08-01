/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";

/* Import Components */
import ClassProperties from "./classProperties/ClassProperties";


/* Props Type */
type Props = {
    digitalSpecimen: DigitalSpecimen
};


/**
 * Component that renders 
 * @returns 
 */
const Assertions = (props: Props) => {
    const { digitalSpecimen } = props;

    return (
        <div>
            {digitalSpecimen["ods:hasAssertion"]?.map((assertion, index) => (
                <ClassProperties key={`identification_${index}`}
                    index={index}
                    nameOfClass="hasIdentification"
                    title="identification"
                    properties={assertion}
                />
            ))}
        </div>
    );
};

export default Assertions;