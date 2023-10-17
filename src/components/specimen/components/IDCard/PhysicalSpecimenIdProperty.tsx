/* Import Dependencies */
import validator from 'validator';

/* Import Types */
import { DigitalSpecimen } from 'app/Types';


/* Props Typing */
interface Props {
    specimen: DigitalSpecimen
};


const PhysicalSpecimenIdProperty = (props: Props) => {
    const { specimen } = props;

    if (specimen.physicalSpecimenId && validator.isURL(specimen['ods:normalisedPhysicalSpecimenId'] ?? '')) {
        return <a href={specimen['ods:normalisedPhysicalSpecimenId']} target="_blank" rel="noreferrer"
            className="c-accent"
        >
            {specimen['ods:normalisedPhysicalSpecimenId']}
        </a>
    } else {
        return <span> {specimen['ods:normalisedPhysicalSpecimenId']} </span>;
    }
}

export default PhysicalSpecimenIdProperty;