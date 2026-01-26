/* Import Components */
import StaticPageRenderer from 'components/staticPageRenderer/StaticPageRenderer';
import TermsContent from 'sources/staticPages/terms.md?raw';


/**
 * Component that renders the terms page
 * @returns JSX Component
 */
const Terms = () => {
    return (
        <StaticPageRenderer pageContent={TermsContent}></StaticPageRenderer>
    );
};

export default Terms;