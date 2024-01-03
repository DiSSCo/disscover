/* Import Dependencies */
import { isEmpty, cloneDeep } from 'lodash';
import classNames from 'classnames';
import { Card, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import PropertiesBlock from './PropertiesBlock';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
}


const Identifications = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    let identifications: {
        properties: Dict,
        [taxonIdentification: string]: Dict
    }[] = [];
    const identificationLevels = {
        taxonIdentification: 'taxonIdentifications.',
    };

    /* Craft identifications object to iterate over */
    specimen.digitalSpecimen['dwc:identification']?.forEach((identification, index) => {
        const copyIdentification = cloneDeep(identification);

        /* Push new craft occurrence to array */
        identifications.push({ properties: {} });

        /* Check for Taxon Identifications */
        if (!isEmpty(identification.taxonIdentifications)) {
            identification.taxonIdentifications?.forEach((taxonIdentification, index) => {
                /* Add Taxon Identification to craft identification */
                identifications[index][`taxon Identification #${++index}`] = taxonIdentification;
            });
        }

        /* Remove extensions from core identification object */
        ['taxonIdentifications'].forEach((key) => delete copyIdentification[key]);

        identifications[index].properties = copyIdentification;
    });

    return (
        <>
            {identifications.map((identification, index) => {
                const key = `identification${index}`;

                return <PropertiesBlock key={key}
                    index={index}
                    instanceName='Identification'
                    taxonAcceptedName='Accepted Identification'
                    instanceLevel='identifications'
                    instanceProperties={identification}
                    ShowWithAnnotations={(propertyName: string) => ShowWithAnnotations(propertyName, index)}
                />
            })}
        </>
    );
}

export default Identifications;