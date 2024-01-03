/* Import Dependencies */
import { Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from "app/hooks";
import { getSpecimen } from "redux/specimen/SpecimenSlice";

/* Import Components */
import PropertiesBlock from './PropertiesBlock';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
};


const Assertions = (props: Props) => {
    const { ShowWithAnnotations } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    return (
        <>
            {specimen.digitalSpecimen.assertions?.length ? <>
                {specimen.digitalSpecimen.assertions?.map((assertion, index) => {
                    const key = `assertion${index}`;

                    return <PropertiesBlock key={key}
                        index={index}
                        instanceName='Assertion'
                        instanceLevel='assertions'
                        instanceProperties={assertion}
                        ShowWithAnnotations={(propertyName: string) => ShowWithAnnotations(propertyName, index)}
                    />
                })}
            </>
                : <Card className="h-100 d-flex justify-content-center align-items-center">
                    <p> No assertions present </p>
                </Card>
            }
        </>
    );
}

export default Assertions;