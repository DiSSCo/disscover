/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getSpecimen, getSpecimenAnnotations } from 'redux/specimen/SpecimenSlice';
import { setAnnotateTarget, setSidePanelToggle } from 'redux/annotate/AnnotateSlice';

/* Import Components */
import Discovery from './specimenBlock/Discovery';
import GeoReference from './specimenBlock/GeoReference';
import Identification from './specimenBlock/Identification';
import Publisher from './specimenBlock/Publisher';
import References from './specimenBlock/References';


const SpecimenOverview = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);

    /* Function for toggling the Annotate Modal */
    const ToggleSidePanel = (property: string) => {
        if (property) {
            dispatch(setAnnotateTarget({
                targetProperty: {
                    name: property,
                    type: 'field'
                },
                motivation: '',
                target: specimen.digitalSpecimen,
                targetType: 'DigitalSpecimen',
                annotations: specimenAnnotations[property] ? specimenAnnotations[property] : []
            }));
        }

        dispatch(setSidePanelToggle(true));
    }

    return (
        <Row className="h-100">
            <Col className="h-100">
                <Row className="h-100">
                    {/* Discovery */}
                    <Col lg={{ span: 4 }} className="h-50 pb-2">
                        <Discovery ToggleSidePanel={(property: string) => ToggleSidePanel(property)} />
                    </Col>

                    {/* Geo Reference */}
                    <Col lg={{ span: 8 }} className="h-50 pb-2">
                        <GeoReference />
                    </Col>

                    {/* Accepted Identification */}
                    <Col lg={{ span: 4 }} className="h-50 pt-2">
                        <Identification ToggleSidePanel={(property: string) => ToggleSidePanel(property)} />
                    </Col>

                    {/* Publisher */}
                    <Col lg={{ span: 4 }} className="h-50 pt-2">
                        <Publisher ToggleSidePanel={(property: string) => ToggleSidePanel(property)} />
                    </Col>

                    {/* References */}
                    <Col lg={{span: 4}} className="h-50 pt-2">
                        <References />
                    </Col>
                </Row>
            </Col>
        </Row >
    );
}

export default SpecimenOverview;