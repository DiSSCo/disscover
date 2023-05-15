/* Import Types */
import { Specimen } from "global/Types";


/* Props Typing */
interface Props {
    specimen: Specimen
};


const OrganisationProperty = (props: Props) => {
    const { specimen } = props;

    /* Base variables */
    let organisationText: string;

    if (specimen.data['ods:organisationName']) {
        organisationText = specimen.data['ods:organisationName'];
    } else {
        organisationText = specimen.organisationId;
    }

    return <a href={specimen.organisationId} target="_blank" rel="noreferrer"> {organisationText} </a>;

}

export default OrganisationProperty;