/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getSpecimen, getSpecimenAnnotations } from 'redux/specimen/SpecimenSlice';
import { setAnnotateTarget, setSidePanelToggle } from 'redux/annotate/AnnotateSlice';

/* Import Components */
import Location from './specimenBlock/Location';
import GeoReference from './specimenBlock/GeoReference';
import Taxonomy from './specimenBlock/Taxonomy';
import Organisation from './specimenBlock/Organisation';
import OrganisationLogo from './specimenBlock/OrganisationLogo';
import Collection from './specimenBlock/Collection';


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
                property,
                motivation: '',
                target: specimen,
                targetType: 'digital_specimen',
                annotations: specimenAnnotations[property] ? specimenAnnotations[property] : []
            }));
        }

        dispatch(setSidePanelToggle(true));
    }

    return (
        <Row className="h-100 overflow-scroll">
            <Col className="h-100">
                <Row className="h-100">
                    {/* Location */}
                    <Col lg={{ span: 4 }} className="h-50 pb-2">
                        <Location ToggleSidePanel={(property: string) => ToggleSidePanel(property)} />
                    </Col>

                    {/* Geo Reference */}
                    <Col lg={{ span: 8 }} className="h-50 pb-2">
                        <GeoReference />
                    </Col>

                    {/* Taxonomy */}
                    <Col lg={{ span: 4 }} className="h-50 pt-2 mb-2">
                        <Taxonomy ToggleSidePanel={(property: string) => ToggleSidePanel(property)} />
                    </Col>

                    {/* Organisation */}
                    <Col lg={{ span: 5 }} className="h-50 pt-2">
                        <Organisation ToggleSidePanel={(property: string) => ToggleSidePanel(property)} />
                    </Col>

                    {/* Organisation Logo */}
                    <Col lg={{ span: 3 }} className="h-50 pt-2 d-none d-lg-block">
                        <OrganisationLogo />
                    </Col>

                    {/* Collection */}
                    <Col lg={{ span: 4 }} className="h-50 pt-2">
                        <Collection ToggleSidePanel={(property: string) => ToggleSidePanel(property)} />
                    </Col>
                </Row>
            </Col>
        </Row >
    );
}

export default SpecimenOverview;