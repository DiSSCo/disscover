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
 * @param span The width in Bootstrap span (grid based on 12 columns)
 * @param offset The offset width in Bootstrap span (grid based on 12 columns)
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

    ]

    return (
        <footer>
            <Flex gap="6">
                <div>
                    <Heading as="h5" size="2" weight="medium">Learn more</Heading>
                    <ul>
                        {footerLearnMoreItems.map((item, index) => {
                            const key = `footerLearnMoreItem_${index}`;

                            return (
                                <li key={key}>
                                    <Link to={item.url} target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Text as="p" size="2" weight="regular">{item.label}</Text>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <Heading as="h5" size="2" weight="medium">Terms and usage</Heading>
                    <ul>
                        {footerTermsItems.map((item, index) => {
                            const key = `footerTermsItem_${index}`;

                            return (
                                <li key={key}>
                                    <Link to={item.url} target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Text as="p" size="2" weight="regular">{item.label}</Text>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Flex>
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
