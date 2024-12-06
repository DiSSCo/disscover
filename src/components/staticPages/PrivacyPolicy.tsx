/* Import Sources */
import privacyPolicySource from 'sources/staticPages/privacyPolicy.json';

/* Import Components */
import StaticPage from './StaticPage';


/**
 * Component that renders the privacy policy page
 * @returns JSX Component
 */
const PrivacyPolicy = () => {
    return (
        <StaticPage sourceMaterial={privacyPolicySource} />
    );
};

export default PrivacyPolicy;