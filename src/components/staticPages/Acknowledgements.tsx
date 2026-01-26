/* Import Components */
import StaticPageRenderer from 'components/staticPageRenderer/StaticPageRenderer';
import AcknowledgementsContent from 'sources/staticPages/acknowledgements.md?raw';

/**
 * Component that renders the acknowledgements page
 * @returns JSX Component
 */
const Acknowledgements = () => {
    return (
        <StaticPageRenderer pageContent={AcknowledgementsContent}></StaticPageRenderer>
    );
};

export default Acknowledgements;