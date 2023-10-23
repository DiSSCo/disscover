/* Import Dependencies */
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setCompareMode, getCompareSpecimens, setCompareSpecimens } from 'redux/search/SearchSlice';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';


const CompareBox = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Base variables */
    const compareSpecimens = useAppSelector(getCompareSpecimens);
    let compareText: string = '';

    /* Determine Compare Box text */
    if (compareSpecimens.length === 0) {
        compareText = 'Select 2 or 3 specimens to compare';
    } else if (compareSpecimens.length === 1) {
        compareText = 'Select one more specimen, up to 3';
    } else if (compareSpecimens.length === 2) {
        compareText = 'Select up to 3 specimens';
    }

    /* Function for actioning a Compare with Specimens */
    const CompareSpecimens = () => {
        /* Construct Compare Route */
        let compareRoute = '/search/compare?';

        compareSpecimens.forEach((specimen, index) => {
            if (index === 0) {
                compareRoute = compareRoute.concat(`ds=${specimen.digitalSpecimen['ods:id'].replace('https://doi.org/', '')}`);
            } else {
                compareRoute = compareRoute.concat(`&ds=${specimen.digitalSpecimen['ods:id'].replace('https://doi.org/', '')}`);
            }
        });

        /* Navigate to Compare Page */
        navigate(compareRoute);
    }

    return (
        <Row className={`${styles.compareBox} z-2 fs-4 rounded-c bg-white px-2 py-3`}>
            <Col>
                {/* Selected Specimens */}
                <Row className="pb-4">
                    <Col>
                        {compareText && <p> {compareText} </p>}

                        {compareSpecimens.map((specimen, index) => {
                            return (
                                <Row key={specimen.digitalSpecimen['ods:id']} className="mt-3">
                                    <Col className="col-md-auto pe-0">
                                        <FontAwesomeIcon icon={faCircle} className="c-secondary fs-5" />
                                    </Col>
                                    <Col>
                                        <p className="fw-lightBold"> {`Specimen #${index + 1}`} </p>
                                        {specimen.digitalSpecimen['ods:specimenName']}
                                    </Col>
                                </Row>
                            );
                        })}
                    </Col>
                </Row>
                {/* Action buttons */}
                <Row className="pb-2">
                    <Col>
                        <button type="button"
                            className="primaryButton cancel px-3 py-1"
                            onClick={() => { dispatch(setCompareMode(false)); dispatch(setCompareSpecimens([])); }}
                        >
                            Cancel
                        </button>
                    </Col>
                    {compareSpecimens.length >= 2 &&
                        <Col className="col-md-auto">
                            <button type="button"
                                className="primaryButton px-3 py-1"
                                onClick={() => CompareSpecimens()}
                            >
                                Compare
                            </button>
                        </Col>
                    }
                </Row>
            </Col>
        </Row>
    );
}

export default CompareBox;