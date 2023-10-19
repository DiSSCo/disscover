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

    if (specimen.digitalSpecimen.physicalSpecimenId && validator.isURL(specimen.digitalSpecimen['ods:normalisedPhysicalSpecimenId'] ?? '')) {
        return <a href={specimen.digitalSpecimen['ods:normalisedPhysicalSpecimenId']} target="_blank" rel="noreferrer"
            className="c-accent"
        >
            {specimen.digitalSpecimen['ods:normalisedPhysicalSpecimenId']}
        </a>
    } else {
        return <span> {specimen.digitalSpecimen['ods:normalisedPhysicalSpecimenId']} </span>;
    }
}

export default PhysicalSpecimenIdProperty;