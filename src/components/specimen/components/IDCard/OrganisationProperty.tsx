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

    if (specimen.digitalSpecimen['dwc:institutionName']) {
        organisationText = specimen.digitalSpecimen['dwc:institutionName'] ?? '';
    } else {
        organisationText = specimen.digitalSpecimen['dwc:institutionId'] ?? '';
    }

    return <a href={specimen.digitalSpecimen['dwc:institutionId']} target="_blank" rel="noreferrer"> {organisationText} </a>;

}

export default OrganisationProperty;