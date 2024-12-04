/* Import Sources */
import acknowledgementsSource from 'sources/staticPages/acknowledgements.json';

/* Import Components */
import StaticPage from './StaticPage';


/**
 * Component that renders the acknowledgements page
 * @returns JSX Component
 */
const Acknowledgements = () => {
    return (
        <StaticPage sourceMaterial={acknowledgementsSource} />
    );
};

export default Acknowledgements;