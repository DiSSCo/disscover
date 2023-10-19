/* Import Dependencies */
import { Card } from "react-bootstrap";

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Dependencies */
import OrganisationLogoImage from "components/general/mediaTypes/OrganisationLogoImage";


const OrganisationLogo = () => {
    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    return (
        <Card className="h-100">
            <Card.Body className="h-100 d-flex flex-column">
                {specimen.digitalSpecimen['dwc:institutionId'] &&
                    <OrganisationLogoImage organisationId={specimen.digitalSpecimen['dwc:institutionId'].replace('https://ror.org/', '')} />
                }
            </Card.Body>
        </Card>
    );
}

export default OrganisationLogo;