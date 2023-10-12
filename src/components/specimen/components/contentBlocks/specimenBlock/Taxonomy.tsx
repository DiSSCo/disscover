/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Icons */
import { faDiamond } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import BlockTemplate from './BlockTemplate';
import Family from 'components/general/nomenclatural/Family';
import Genus from 'components/general/nomenclatural/Genus';


/* Props Typing */
interface Props {
    ToggleSidePanel: Function
}


const Taxonomy = (props: Props) => {
    const { ToggleSidePanel } = props;
    
    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    /* Main properties */
    const properties = [
        { name: 'Kingdom', value: specimen.data['dwc:kingdom'], property: 'dwc:kingdom' },
        { name: 'Phylum', value: specimen.data['dwc:phylum'], property: 'dwc:phylum' },
        { name: 'Order', value: specimen.data['dwc:order'], property: 'dwc:order' },
        { name: 'Family', value: specimen.data['dwc:family'], property: 'dwc:family', element: <Family specimen={specimen} /> },
        { name: 'Genus', value: specimen.data['dwc:genus'], property: 'dwc:genus', element: <Genus specimen={specimen} /> }
    ];

    return (
        <BlockTemplate title="Taxonomy"
            icon={faDiamond}
            properties={properties}
            ToggleSidePanel={(property: string) => ToggleSidePanel(property)}
        />
    );
}

export default Taxonomy;