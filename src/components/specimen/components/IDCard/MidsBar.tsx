/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from "redux/specimen/SpecimenSlice";


const MidsBar = () => {
    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    return (
        <Row>
            <Col>
                {/* MIDS Bar Title */}
                <Row>
                    <Col>
                        <h6> MIDS Level </h6>
                    </Col>
                </Row>
                {/* MIDS Bar */}
                <Row>
                    <Col>
                        <div className="specimen_midsBar border-2-primary-dark text-center rounded-c">
                            {`Lv. ${specimen.midsLevel}`}
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default MidsBar