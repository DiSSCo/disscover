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
        { url: '/about', label: 'About DiSSCover' , id: 'footerLinkItem_about'},
        { url: 'https://dissco.eu', label: 'Distributed System of Scientific Collections', id: 'footerLinkItem_dissco'},
        { url: 'mailto:support@dissco.jitbit.com', label: 'Get support', id: 'footerLinkItem_support' },
        { url: '/acknowledgements', label: 'Acknowledgements', id: 'footerLinkItem_acknowledgements' }
    ];
    const footerTermsItems = [
        { url: '/privacy', label: 'Privacy', id: 'footerLinkItem_privacy' },
        { url: '/terms', label: 'Terms', id: 'footerLinkItem_terms' },
        { url: 'https://github.com/DiSSCo/unified-curation-and-annotation-service/issues', label: 'Send us feedback on GitHub', id: 'footerLinkItem_github'}
    ];

    return (
        <footer>
            <div id="footer-links-container">
                <div>
                    <h5>Learn more</h5>
                    <ul>
                        {footerLearnMoreItems.map((item) => {
                            return (
                                <li key={item.id}>
                                    <Link to={item.url} rel="noreferrer" className="navigation-link">
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h5>Terms and usage</h5>
                    <ul>
                        {footerTermsItems.map((item) => {
                            return (
                                <li key={item.id}>
                                    <Link to={item.url} rel="noreferrer" className="navigation-link">
                                        {item.label}
                                    </Link>
                                </li>
                            );
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
