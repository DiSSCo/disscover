/* Import Dependencies */
import validator from 'validator';

/* Import Types */
import { Specimen } from 'global/Types';


/* Props Typing */
interface Props {
    specimen: Specimen
};


const PhysicalSpecimenIdProperty = (props: Props) => {
    const { specimen } = props;

    if (specimen.physicalSpecimenId && validator.isURL(specimen.physicalSpecimenId)) {
        return <a href={specimen.physicalSpecimenId} target="_blank" rel="noreferrer"
            className="c-accent"
        >
            {specimen.physicalSpecimenId}
        </a>
    } else {
        return <span> {specimen.physicalSpecimenId} </span>;
    }
}

export default PhysicalSpecimenIdProperty;