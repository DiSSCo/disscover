/* Import Dependencies */
import { ReactElement, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setSearchSpecimen, setCompareMode, getCompareSpecimens, setCompareSpecimens } from 'redux/search/SearchSlice';

/* Import Types */
import { DigitalSpecimen } from 'app/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import BreadCrumbs from 'components/general/breadCrumbs/BreadCrumbs';
import IDCard from '../IDCard/IDCard';
import LocationExt from '../IDCard/LocationExt';
import TaxonomyExt from '../IDCard/TaxonomyExt';
import OrganisationExt from '../IDCard/OrganisationExt';
import CollectionExt from '../IDCard/CollectionExt';
import Footer from 'components/general/footer/Footer';

/* Import API */
import GetSpecimen from 'api/specimen/GetSpecimen';


const Compare = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    /* Base variables */
    const compareSpecimens = useAppSelector(getCompareSpecimens);

    /* OnLoad: Check if Compare Specimens are present, otherwise check params */
    useEffect(() => {
        if (compareSpecimens.length !== searchParams.getAll('ds').length && compareSpecimens.length !== 1) {
            if (searchParams.getAll('ds').length > 0) {
                const compareSpecimens: DigitalSpecimen[] = [];

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
        /* Remove from Compare Specimens */
        const copyCompareSpecimens = [...compareSpecimens];

        copyCompareSpecimens.splice(compareSpecimens.findIndex((specimen) => specimen.digitalSpecimen.id === specimenId), 1);

        dispatch(setCompareSpecimens(copyCompareSpecimens));

        /* Remove specimen id from Search Params */
        const newParams = searchParams.getAll('ds').filter((paramSpecimenId: string) => paramSpecimenId !== specimenId.replace('https://doi.org/', ''));

        searchParams.delete('ds');

        newParams.forEach((specimenId: string) => {
            searchParams.append('ds', specimenId);
        });

        setSearchParams(searchParams);
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
                                    /* Constructing ID Card Extensions */
                                    const extensions: ReactElement[] = [
                                        <LocationExt key='location' specimen={specimen.digitalSpecimen} />,
                                        <TaxonomyExt key='taxonomy' specimen={specimen.digitalSpecimen} />,
                                        <OrganisationExt key='organisation' specimen={specimen.digitalSpecimen} />,
                                        <CollectionExt key='collection' specimen={specimen.digitalSpecimen} />
                                    ];

                                    return (
                                        <Col key={specimen.digitalSpecimen['ods:id']}>
                                            <IDCard specimen={specimen}
                                                extensions={extensions}
                                                OnClose={(specimenId: string) => RemoveFromComparison(specimenId)}
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