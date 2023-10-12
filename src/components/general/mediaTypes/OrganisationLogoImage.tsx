/* Import Sources */
import OrganisationLogos from 'sources/organisationLogos.json';

/* Import Styles */
import styles from './mediaTypes.module.scss';


/* Props Typing */
interface Props {
    organisationId?: string
};


const OrganisationLogoImage = (props: Props) => {
    const { organisationId } = props;

    /* Base variables */
    const organisationLogos: { [ror: string]: { name: string, logo: string | string[] } } = { ...OrganisationLogos };

    /* Check if reference to Organisation logo is present in Source File */
    let organisationLogoUrl: string = '';
    let organisationLogoAlt: string = 'Organisation Logo';

    if (organisationId) {
        if (organisationId in organisationLogos) {
            const logo = organisationLogos[organisationId].logo;

            if (Array.isArray(logo)) {
                organisationLogoUrl = logo[0];
            } else {
                organisationLogoUrl = logo;
            }

            organisationLogoAlt = organisationLogos[organisationId].name;
        }
    }

    return (
        <img src={organisationLogoUrl}
            className={`${styles.organisationLogo} w-100`}
            alt={organisationLogoAlt}
        />
    );
}

export default OrganisationLogoImage;