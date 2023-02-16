/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from "redux/specimen/SpecimenSlice";

/* Import Types */
import { Dict } from 'global/Types';

/* Import Components */
import SpecimenGroup from './SpecimenGroup';


/* Props Typing */
interface Props {
    ToggleModal: Function
};


const SpecimenProperties = (props: Props) => {
    const { ToggleModal } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    /* Handling active property groups */
    const [propertyGroups, setPropertyGroups] = useState<Dict>({ Meta: true });

    const TogglePropertyGroup = (propertyGroup: string) => {
        const newPropertyGroups = { ...propertyGroups }

        if (!(propertyGroup in propertyGroups)) {
            newPropertyGroups[propertyGroup] = 'active';
        } else {
            delete newPropertyGroups[propertyGroup];
        }

        setPropertyGroups(newPropertyGroups);
    }

    return (
        <div>
            <Row className="mt-5">
                <Col md={{ span: 11 }}>
                    {Object.keys(specimen.filtered).map((propertyGroup: string, _i) => {
                        return (
                            <SpecimenGroup
                                key={propertyGroup}
                                propertyGroup={propertyGroup}
                                properties={specimen.filtered[propertyGroup]}
                                active={(propertyGroup in propertyGroups)}

                                TogglePropertyGroup={(propertyGroup: string) => TogglePropertyGroup(propertyGroup)}
                                ToggleModal={(property: string) => ToggleModal(property)}
                            />
                        );
                    })}
                </Col>
            </Row>
        </div >
    );
}

export default SpecimenProperties;