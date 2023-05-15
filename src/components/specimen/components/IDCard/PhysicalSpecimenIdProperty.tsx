/* Import Dependencies */
import { ValidateURL } from 'global/Utilities';

/* Import Types */
import { Specimen } from 'global/Types';


/* Props Typing */
interface Props {
    specimen: Specimen
};


const PhysicalSpecimenIdProperty = (props: Props) => {
    const { specimen } = props;

    if (ValidateURL(specimen.physicalSpecimenId)) {
        return <a href={ specimen.physicalSpecimenId } target = "_blank" rel = "noreferrer"
            className = "c-accent"
        >
            { specimen.physicalSpecimenId }
        </a>
    } else {
        return <span> specimen.physicalSpecimenId </span>;
    }    
}

export default PhysicalSpecimenIdProperty;