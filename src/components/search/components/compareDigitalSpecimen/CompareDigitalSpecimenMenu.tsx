/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Import Hooks */
import { useAppSelector, useAppDispatch } from 'app/Hooks';

/* Import Store */
import { getCompareDigitalSpecimen, setCompareDigitalSpecimen } from 'redux-store/SearchSlice';

/* Import Icons */
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import { Button } from 'components/elements/customUI/CustomUI';


const CompareDigitalSpecimenMenu = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Base variables */
    const compareDigitalSpecimen = useAppSelector(getCompareDigitalSpecimen);

    return (
        <Card className="py-3 px-3">
            {/* Title text */}
            <p className="fs-4">
                Select two, up to ten specimen to compare
            </p>

            {/* Selected compare digital specimen */}
            {compareDigitalSpecimen?.map((digitalSpecimen, index) => (
                <Row key={digitalSpecimen['@id']}
                    className="mt-2"
                >
                    <Col lg="auto"
                        className="pe-0"
                    >
                        <Button type="button"
                            variant="blank"
                            className="px-0 py-0"
                            OnClick={() => {
                                /* Remove this digital specimen from compare list */
                                const compareDigitalSpecimenArray = [...compareDigitalSpecimen];

                                compareDigitalSpecimenArray.splice(compareDigitalSpecimen.findIndex(
                                    compareDigitalSpecimen => compareDigitalSpecimen['@id'] === digitalSpecimen['@id']
                                ), 1);

                                dispatch(setCompareDigitalSpecimen(compareDigitalSpecimenArray));
                            }}
                        >
                            <FontAwesomeIcon icon={faDotCircle}
                                size="sm"
                                className="tc-secondary"
                            />
                        </Button>
                    </Col>
                    <Col className="fs-4">
                        <p className="fw-lightBold">{`Specimen #${index + 1}`}</p>
                        <p>{digitalSpecimen['ods:specimenName']}</p>
                    </Col>
                </Row>
            ))}

            {/* Cancel and compare buttons */}
            <Row className="mt-4">
                <Col>
                    <Button type="button"
                        variant="grey"
                        OnClick={() => dispatch(setCompareDigitalSpecimen(undefined))}
                    >
                        <p>Cancel</p>
                    </Button>
                </Col>
                <Col lg="auto">
                    <Button type="button"
                        variant="primary"
                        disabled={!compareDigitalSpecimen || compareDigitalSpecimen.length <= 1}
                        OnClick={() => {
                            let route = '/search/compare?';

                            compareDigitalSpecimen?.forEach((digitalSpecimen, index) => {
                                route = route.concat(`${index > 0 ? '&' : ''}ds=${digitalSpecimen['@id'].replace(import.meta.env.VITE_DOI_URL, '')}`)
                            });

                            navigate(route)
                        }
                        }
                    >
                        <p>Compare</p>
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default CompareDigitalSpecimenMenu;