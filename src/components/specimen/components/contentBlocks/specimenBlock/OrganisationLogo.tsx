/* Import Dependencies */
import { Card } from "react-bootstrap";

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Sources */
import OrganisationLogos from 'sources/organisationLogos.json';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';


const OrganisationLogo = () => {
    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const organisationLogos: { [ror: string]: { name: string, logo: string | string[] } } = { ...OrganisationLogos };

    /* Check if reference to Organisation logo is present in Source File */
    let organisationLogoUrl: string = '';
    let organisationLogoAlt: string = 'Organisation Logo';

    if (specimen.organisationId) {
        if (specimen.organisationId.replace('https://ror.org/', '') in organisationLogos) {
            const logo = organisationLogos[specimen.organisationId.replace('https://ror.org/', '')].logo;

            if (Array.isArray(logo)) {
                organisationLogoUrl = logo[0];
            } else {
                organisationLogoUrl = logo;
            }

            organisationLogoAlt = organisationLogos[specimen.organisationId.replace('https://ror.org/', '')].name;
        }
    }

    return (
        <Card className="h-100">
            <Card.Body className="h-100 d-flex flex-column">
                {organisationLogoUrl &&
                    <img src={organisationLogoUrl}
                        className={styles.organisationLogo}
                        alt={organisationLogoAlt}
                    />
                }
            </Card.Body>
        </Card>
    );
}

export default OrganisationLogo;