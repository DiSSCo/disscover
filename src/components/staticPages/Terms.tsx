/* Import Sources */
import termsSource from 'sources/staticPages/terms.json';

/* Import Components */
import StaticPage from './StaticPage';


/**
 * Component that renders the terms page
 * @returns JSX Component
 */
const Terms = () => {
    return (
        <StaticPage sourceMaterial={termsSource} />
    );
};

export default Terms;