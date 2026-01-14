/* Import Dependencies */
import { Link } from 'react-router-dom';

/* Import Webroot */
import EUFundedLogo from 'webroot/logos/euFundedLogo.png';

/* Import Styles */
import './Footer.scss';

/* Import Components */
import FooterPlugin from './FooterPlugin';


/**
 * Component that renders the application's footer
 * @returns JSX Component
 */
export const Footer = () => {
    /* Base variables */
    const footerLearnMoreItems = [
        { url: '/about', label: 'About DiSSCover' },
        { url: 'https://dissco.eu', label: 'Distributed System of Scientific Collections' },
        { url: 'mailto:support@dissco.jitbit.com', label: 'Get support' },
        { url: '/acknowledgements', label: 'Acknowledgements' }
    ];
    const footerTermsItems = [
        { url: '/privacy', label: 'Privacy' },
        { url: '/terms', label: 'Terms' },
        { url: 'https://github.com/DiSSCo/unified-curation-and-annotation-service/issues', label: 'Send us feedback on GitHub'}
    ];

    const footerLinkItem = (item: { url: string, label: string }, key: string) => {
        return (
            <li key={key}>
                <Link to={item.url} target="_blank"
                    rel="noreferrer"
                >
                    {item.label}
                </Link>
            </li>
        )
    }

    return (
        <footer>
            <div id="footer-links-container">
                <div>
                    <h5>Learn more</h5>
                    <ul>
                        {footerLearnMoreItems.map((item, index) => {
                            const key = `footerLearnMoreItem_${index}`;

                            return footerLinkItem(item, key);
                        })}
                    </ul>
                </div>
                <div>
                    <h5>Terms and usage</h5>
                    <ul>
                        {footerTermsItems.map((item, index) => {
                            const key = `footerTermsItem_${index}`;

                            return footerLinkItem(item, key);
                        })}
                    </ul>
                </div>
            </div>
            {/* EU funded logo */}
            <img src={EUFundedLogo}
                alt="Funded by the European Union"
                id="footer-eu-logo"
            />
            {/* plugin */}
            <FooterPlugin />
        </footer>
    );
};
