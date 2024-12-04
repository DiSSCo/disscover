/* Import Sources */
import aboutSource from 'sources/staticPages/about.json';

/* Import Components */
import StaticPage from './StaticPage';


/**
 * Component that renders the about page
 * @returns JSX Component
 */
const About = () => {
    return (
        <StaticPage sourceMaterial={aboutSource} />
    );
};

export default About;