/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getDigitalSpecimen } from 'redux-store/DigitalSpecimenSlice';


const IdCard = () => {
    /* Base variables */
    const digitalSpecimen = useAppSelector(getDigitalSpecimen);

    return (
        <div className="h-100 py-2 bgc-white b-grey br-corner">
            {/* Title and close icon */}
            <Row>
                <Col>
                    <p>{digitalSpecimen?.digitalSpecimen['ods:specimenName']}</p>
                </Col>
            </Row>
        </div>
    );
};

export default IdCard;