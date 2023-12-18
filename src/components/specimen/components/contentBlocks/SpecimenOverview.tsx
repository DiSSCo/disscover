/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Components */
import Origin from './specimenBlock/Origin';
import GeoReference from './specimenBlock/GeoReference';
import Identification from './specimenBlock/Identification';
import Publisher from './specimenBlock/Publisher';
import References from './specimenBlock/References';


/* Props Typing */
interface Props {
    ShowWithAnnotations: Function
};


const SpecimenOverview = (props: Props) => {
    const { ShowWithAnnotations } = props;

    return (
        <Row className="h-100">
            <Col className="h-100">
                <Row className="h-100">
                    {/* Origin */}
                    <Col lg={{ span: 4 }} className="h-50 pb-2">
                        <Origin ShowWithAnnotations={(propertyName: string) => ShowWithAnnotations(propertyName)} />
                    </Col>

                    {/* Geo Reference */}
                    <Col lg={{ span: 8 }} className="h-50 pb-2">
                        <GeoReference ShowWithAnnotations={(propertyName: string, propertyType: string) => ShowWithAnnotations(propertyName, propertyType)} />
                    </Col>

                    {/* Accepted Identification */}
                    <Col lg={{ span: 4 }} className="h-50 pt-2">
                        <Identification ShowWithAnnotations={(propertyName: string) => ShowWithAnnotations(propertyName)} />
                    </Col>

                    {/* Publisher */}
                    <Col lg={{ span: 4 }} className="h-50 pt-2">
                        <Publisher ShowWithAnnotations={(propertyName: string) => ShowWithAnnotations(propertyName)} />
                    </Col>

                    {/* References */}
                    <Col lg={{ span: 4 }} className="h-50 pt-2">
                        <References />
                    </Col>
                </Row>
            </Col>
        </Row >
    );
}

export default SpecimenOverview;