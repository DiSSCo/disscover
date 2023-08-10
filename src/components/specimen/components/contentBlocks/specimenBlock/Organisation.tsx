/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Icons */
import { faLandmark } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import BlockTemplate from './BlockTemplate';


/* Props Typing */
interface Props {
    ToggleSidePanel: Function
};


const Organisation = (props: Props) => {
    const { ToggleSidePanel } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    /* Main properties */
    const properties = [
        { name: 'Organisation ID', value: specimen.data['ods:organisationId'], property: 'ods:organisationId' },
        { name: 'Organisation Name', value: specimen.data['ods:organisationName'], property: 'ods:organisationName' }
    ];

    return (
        <BlockTemplate title="Organisation"
            icon={faLandmark}
            properties={properties}
            ToggleSidePanel={(property: string) => ToggleSidePanel(property)}
        />
    );
}

export default Organisation;