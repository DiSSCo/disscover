/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Icons */
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import BlockTemplate from './BlockTemplate';


/* Props Typing */
interface Props {
    ToggleSidePanel: Function  
};


const Location = (props: Props) => {
    const { ToggleSidePanel } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    /* Main properties */
    const properties = [
        { name: 'Country', value: "" /*specimen.data['dwc:country']*/, property: 'dwc:country' },
        { name: 'Locality', value: "" /*specimen.data['dwc:locality']*/, property: 'dwc:locality' },
        { name: 'Contintent', value: "" /*specimen.data['dwc:continent']*/, property: 'dwc:continent' },
        { name: 'Country Code', value: "" /*specimen.data['dwc:countryCode']*/, property: 'dwc:countryCode' },
        { name: 'Island', value: "" /*specimen.data['dwc:island']*/, property: 'dwc:island' },
        { name: 'Island Group', value: "" /*specimen.data['dwc:islandGroup']*/, property: 'dwc:islandGroup' },
        { name: 'State Province', value: "" /*specimen.data['dwc:stateProvince']*/, property: 'dwc:stateProvince' },
        { name: 'Water Body', value: "" /*specimen.data['dwc:waterBody']*/, property: 'dwc:waterBody' }
    ];

    return (
        <BlockTemplate title="Location"
            icon={faLocationDot}
            properties={properties}
            ToggleSidePanel={(property: string) => ToggleSidePanel(property)}
        />
    );
}

export default Location;