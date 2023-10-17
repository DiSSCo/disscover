/* Import Dependencies */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen, getSpecimenMidsProperty } from 'redux/specimen/SpecimenSlice';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import MidsDetails from './MidsDetails';


const MidsMeter = () => {
    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const specimenMidsProperty = useAppSelector(getSpecimenMidsProperty);

    /* Toggling the MIDS details */
    const [midsDetails, setMidsDetails] = useState(false);

    /* ClassName for toggle chevron */
    const classToggleChevron = classNames({
        'specimen_midsMeterChevronDown': true,
        'active': midsDetails
    });

    /* If specimen MIDS property changes, show MIDS details */
    useEffect(() => {
        if (specimenMidsProperty) {
            setMidsDetails(true);
        }
    }, [specimenMidsProperty])

    return (
        <Row>
            <Col>
                <Row>
                    <Col md={{ span: 12 }} className="py-4 border-1-primary-dark">
                        <Row>
                            <Col md={{ span: 8, offset: 1 }}>
                                Completion level (MIDS)
                            </Col>
                            <Col md={{ span: 2 }} className="text-end">
                                <FontAwesomeIcon icon={faChevronDown}
                                    onClick={() => setMidsDetails(!midsDetails)}
                                    className={classToggleChevron}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 10, offset: 1 }} className="specimen_midsMeterBar bg-green text-center fw-bold text-white">
                                Lv {specimen['ods:midsLevel']}.
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <MidsDetails active={midsDetails}
                        specimen={specimen}
                    />
                </Row>
            </Col>
        </Row>
    );
}

export default MidsMeter;