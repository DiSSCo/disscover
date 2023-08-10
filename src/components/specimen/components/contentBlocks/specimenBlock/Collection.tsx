/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Icons */
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import BlockTemplate from './BlockTemplate';


/* Props Typing */
interface Props {
    ToggleSidePanel: Function
};


const Collection = (props: Props) => {
    const { ToggleSidePanel } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    /* Main properties */
    const properties = [
        { name: 'Collecting Number', value: specimen.data['ods:collectingNumber'], property: 'ods:collectingNumber' },
        { name: 'Date Collected', value: specimen.data['ods:dateCollected'], property: 'ods:dateCollected' },
        { name: 'Collector', value: specimen.data['ods:collector'], property: 'ods:collector' },
        { name: 'Individual Count', value: specimen.data['dwc:individualCount'], property: 'dwc:individualCount' }
    ];

    return (
        <BlockTemplate title="Collection"
            icon={faBoxArchive}
            properties={properties}
            ToggleSidePanel={(property: string) => ToggleSidePanel(property)}
        />
    );
}

export default Collection;