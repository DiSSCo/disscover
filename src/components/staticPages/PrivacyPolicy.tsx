/* Import Components */
import StaticPageRenderer from 'components/staticPageRenderer/StaticPageRenderer';
import PrivacyContent from 'sources/staticPages/privacy.md?raw';

/**
 * Component that renders the privacy policy page
 * @returns JSX Component
 */
const PrivacyPolicy = () => {
    return (
        <StaticPageRenderer pageContent={PrivacyContent}></StaticPageRenderer>
    );
};

export default PrivacyPolicy;