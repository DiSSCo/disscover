/* Import Dependencies */
import { Link } from 'react-router-dom';

/* Import Webroot */
import EUFundedLogo from 'webroot/logos/euFundedLogo.png';

/* Import Styles */
import styles from './Footer.module.scss';

/* Import Components */
import FooterPlugin from './FooterPlugin';
import { Flex, Heading, Text } from '@radix-ui/themes';


/* Props Type */
type Props = {
    plugin?: boolean
};


/**
 * Component that renders the application's footer
 * @param plugin Boolean that indicates if the footer plugin should be loaded
 * @returns JSX Component
 */
export const Footer = (props: Props) => {
    const { plugin } = props;

    const footerLearnMoreItems = [
        {
            url: '/about',
            label: 'About DiSSCover'
        },
        {
            url: 'https://dissco.eu',
            label: 'Distributed System of Scientific Collections'
        },
        {
            url: 'mailto:support@dissco.jitbit.com',
            label: 'Get support'
        },
        {
            url: '/acknowledgements',
            label: 'Acknowledgements'
        }
    ];
    const footerTermsItems = [
        {
            url: '/privacy',
            label: 'Privacy'
        },
        {
            url: '/terms',
            label: 'Terms'
        },
        {
            url: 'https://github.com/DiSSCo/unified-curation-and-annotation-service/issues',
            label: 'Send us feedback on GitHub'
        }
    ];

    return (
        <footer>
            <div id="footer-links-container">
                <div>
                    <p>Learn more</p>
                    <ul>
                        {footerLearnMoreItems.map((item, index) => {
                            const key = `footerLearnMoreItem_${index}`;

                            return (
                                <li key={key}>
                                    <Link to={item.url} target="_blank"
                                        rel="noreferrer"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <p>Terms and usage</p>
                    <ul>
                        {footerTermsItems.map((item, index) => {
                            const key = `footerTermsItem_${index}`;

                            return (
                                <li key={key}>
                                    <Link to={item.url} target="_blank"
                                        rel="noreferrer"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <img src={EUFundedLogo}
                alt="Funded by the European Union"
                className={styles.euFundedLogo}
            />
            {plugin &&
                <FooterPlugin />
            }
        </footer>
    );
};
