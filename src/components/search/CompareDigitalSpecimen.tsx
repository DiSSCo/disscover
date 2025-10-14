/* Import Dependencies */
import { isEmpty } from "lodash";
import jp from 'jsonpath';
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Import Hooks */
import { useAppDispatch, useFetch, useSearchFilters } from "app/Hooks";

/* Import Store */
import { setSearchDigitalSpecimen, setCompareDigitalSpecimen } from "redux-store/SearchSlice";

/* Import Types */
import { DigitalSpecimen } from "app/types/DigitalSpecimen";
import { Dict } from "app/Types";

/* Import Sources */
import DigitalSpecimenCompareFields from 'sources/compareFields/DigitalSpecimenCompareFields.json';

/* Import API */
import GetDigitalSpecimenComplete from "api/digitalSpecimen/GetDigitalSpecimenComplete";

/* Import Components */
import { CompareMatrix } from "./components/SearchComponents";
import { TopBar } from "./components/compareDigitalSpecimen/CompareDigitalSpecimenComponents";
import { Header, Footer } from "components/elements/Elements";
import { LoadingScreen } from 'components/elements/customUI/CustomUI';

/**
 * Component that renders the compare digital specimen page
 * @returns JSX Component
 */
const CompareDigitalSpecimen = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const fetch = useFetch();
    const searchFilters = useSearchFilters();

    /* Base variables */
    const digitalSpecimenIDs = searchParams.getAll('ds');
    const [digitalSpecimen, setDigitalSpecimen] = useState<DigitalSpecimen[] | undefined>(undefined);
    const [matrixData, setMatrixData] = useState<{
        [collection: string]: {
            [field: string]: string[][]
        }
    }>({});

    /* Fetch compare digital specimen data */
    fetch.FetchMultiple({
        callMethods: digitalSpecimenIDs.map(digitalSpecimenID => ({
            alias: digitalSpecimenID,
            params: {
                handle: digitalSpecimenID
            },
            Method: GetDigitalSpecimenComplete
        })),
        triggers: [searchParams],
        Handler: (results: Dict) => {
            /* If results is not empty, start crafting matrix data for each digital specimen, otherwise return to search page */
            if (!isEmpty(results)) {
                let digitalSpecimenArray: DigitalSpecimen[] = [];
                let matrixData: {
                    [collection: string]: {
                        [field: string]: string[][]
                    }
                } = {};

                Object.values(results).forEach((digitalSpecimen) => {
                    digitalSpecimenArray.push(digitalSpecimen.digitalSpecimen);
                    ConstructMatrixData(matrixData, digitalSpecimen.digitalSpecimen);
                });

                setDigitalSpecimen(digitalSpecimenArray);
                setMatrixData(matrixData);
            };

            /* Reset compare digital specimen state */
            dispatch(setCompareDigitalSpecimen(undefined));
        }
    });

    /**
     * Function to construct matrix data
     * @param matrixData The matrix data variable to write to
     * @param digitalSpecimen The digital specimen selected for comparison
     */
    const ConstructMatrixData = (matrixData: {
        [collection: string]: {
            [field: string]: (string | number | boolean)[][]
        }
    }, digitalSpecimen: DigitalSpecimen) => {
        /* For each collection of fields, iterate over the fields and push to compare matrix data */
        Object.entries(DigitalSpecimenCompareFields.compareFields).forEach(([collectionKey, fieldCollection]) => {
            if (!(collectionKey in matrixData)) {
                matrixData[collectionKey] = {};
            };

            Object.entries(fieldCollection).forEach(([fieldName, jsonPath]) => {
                const value = jp.query(digitalSpecimen, jsonPath);

                try {
                    matrixData[collectionKey][fieldName].push(value);
                } catch {
                    matrixData[collectionKey][fieldName] = [value];
                };
            });
        });
    };

    /**
     * Function to remove this digital specimen from the comparison
     * @param digitalSpecimenId The identifier of the digital specimen
     */
    const RemoveFromComparison = (digitalSpecimenId: string) => {
        const compareDigitalSpecimenIds = searchParams.getAll('ds');
        
        setMatrixData({});

        /* If only one digital specimen reamins after removal, instead reroute to search with the remaining digital specimen active in the ID card */
        if (compareDigitalSpecimenIds.length <= 2) {
            /* Set search digital specimen to remaining compare digital specimen */
            dispatch(setSearchDigitalSpecimen(digitalSpecimen?.find(digitalSpecimen => digitalSpecimen['@id'] !== digitalSpecimenId)));

            navigate('/search');
        } else {
            const searchFiltersObject: { ds: string[] } = {
                ds: []
            };

            compareDigitalSpecimenIds.filter(id => id !== digitalSpecimenId.replace(RetrieveEnvVariable('DOI_URL'), '')).forEach(digitalSpecimenId => {
                searchFiltersObject.ds.push(digitalSpecimenId);
            });

            searchFilters.SetSearchFilters(searchFiltersObject);
        };
    };

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render header*/}
            <Header span={10}
                offset={1}
            />

            {/* Search page body */}
            <Container fluid className="flex-grow-1 overflow-y-hidden overflow-x-hidden my-5">
                <Row className="h-100">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="h-100 d-flex flex-column position-relative"
                    >
                        {/* Top bar */}
                        <Row className="mt-2">
                            <Col>
                                <TopBar compareDigitalSpecimen={digitalSpecimen} />
                            </Col>
                        </Row>

                        {/* Compare matrix */}
                        <Row className="flex-grow-1 overflow-hidden mt-3">
                            <Col className="h-100">
                                <CompareMatrix matrixData={matrixData}
                                    RemoveFromComparison={RemoveFromComparison}
                                />
                            </Col>
                        </Row>

                        {/* Display loading screen when loading digital specimen data */}
                        <LoadingScreen visible={isEmpty(matrixData) || fetch.loading}
                            className="bgc-default"
                            text={'Loading comparison'}
                            displaySpinner={fetch.loading}
                        />
                    </Col>
                </Row>
            </Container>

            {/* Render Footer */}
            <Footer span={10}
                offset={1}
            />
        </div >
    );
};

export default CompareDigitalSpecimen;