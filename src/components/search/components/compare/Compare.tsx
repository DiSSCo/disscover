/* Import Dependencies */
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setSearchSpecimen, setCompareMode, getCompareSpecimens, setCompareSpecimens } from 'redux/search/SearchSlice';

/* Import Types */
import { Specimen } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import BreadCrumbs from 'components/general/breadCrumbs/BreadCrumbs';
import CompareCard from './CompareCard';
import Footer from 'components/general/footer/Footer';

/* Import API */
import GetSpecimen from 'api/specimen/GetSpecimen';


const Compare = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    /* Base variables */
    const compareSpecimens = useAppSelector(getCompareSpecimens);

    /* OnLoad: Check if Compare Specimens are present, otherwise check params */
    useEffect(() => {
        if (compareSpecimens.length === 0) {
            if (searchParams.getAll('ds').length > 0) {
                const compareSpecimens: Specimen[] = [];

                searchParams.getAll('ds').forEach((specimenId) => {
                    GetSpecimen(specimenId).then((specimen) => {
                        compareSpecimens.push(specimen);

                        if (compareSpecimens.length === searchParams.getAll('ds').length) {
                            dispatch(setCompareSpecimens(compareSpecimens));
                        }
                    }).catch(error => {
                        console.warn(error);
                    });
                });
            } else {
                navigate('/search');
            }
        } else if (compareSpecimens.length === 1) {
            /* If there is only one Specimen for Comparison, return to default ID Card */
            dispatch(setSearchSpecimen(compareSpecimens[0]));
            dispatch(setCompareMode(false));

            navigate('/search');
        }
    }, [searchParams, compareSpecimens]);

    /* Function for removing a Specimen from Comparison */
    const RemoveFromComparison = (specimenId: string) => {
        const copyCompareSpecimens = [...compareSpecimens];

        copyCompareSpecimens.splice(compareSpecimens.findIndex((specimen) => specimen.id === specimenId), 1);

        dispatch(setCompareSpecimens(copyCompareSpecimens));
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container fluid className={`${styles.content} pt-5 pb-4`}>
                <Row className="h-100">
                    <Col md={{ span: 10, offset: 1 }} className="h-100">
                        <div className="h-100 d-flex flex-column">
                            <Row>
                                <Col>
                                    <BreadCrumbs />
                                </Col>
                            </Row>

                            {/* ID Cards for comparison */}
                            <Row className="flex-grow-1 overflow-scroll mt-4">
                                {compareSpecimens.map((specimen) => {
                                    return (
                                        <Col key={specimen.id}>
                                            <CompareCard specimen={specimen}
                                                RemoveFromComparison={(specimenId: string) => RemoveFromComparison(specimenId)}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Compare;