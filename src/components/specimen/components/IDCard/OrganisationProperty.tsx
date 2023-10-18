/* Import Types */
import { DigitalSpecimen } from "app/Types";


/* Props Typing */
interface Props {
    specimen: DigitalSpecimen
};


const OrganisationProperty = (props: Props) => {
    const { specimen } = props;

    /* Base variables */
    let organisationText: string;

    if (specimen['dwc:institutionName']) {
        organisationText = specimen['dwc:institutionName'] ?? '';
    } else {
        organisationText = specimen['dwc:institutionId'] ?? '';
    }

    return <a href={specimen['dwc:institutionId']} target="_blank" rel="noreferrer"> {organisationText} </a>;

}

export default OrganisationProperty;