/* Import Components */
import StaticPageRenderer from 'components/staticPageRenderer/StaticPageRenderer';
import AboutContent from 'sources/staticPages/about.md?raw';

/**
 * Component that renders the about page
 * @returns JSX Component
 */
const About = () => {
    return (
        <StaticPageRenderer pageContent={AboutContent}></StaticPageRenderer>
    );
};

export default About;