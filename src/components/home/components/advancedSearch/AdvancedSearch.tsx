/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Import Hooks */
import { useAppSelector, useLoading, useNotification } from 'app/Hooks';

/* Import Store */
import { getOrganisationNames } from 'redux-store/BootSlice';

/* Import Types */
import { SearchFilters } from 'app/Types';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Icons */
import { faXmark } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import GetDigitalSpecimen from 'api/digitalSpecimen/GetDigitalSpecimen';
import GetDigitalSpecimens from 'api/digitalSpecimen/GetDigitalSpecimens';

/* Import Components */
import {
    CollectionFacilitySearch,
    DOISearch,
    PhysicalSpecimenIDSearch,
    VirtualCollectionSearch
} from './AdvancedSearchComponents';
import { Button, Spinner, Tabs } from 'components/elements/customUI/CustomUI';


/**
 * Component that renders the advanced search on the homepage
 * @returns JSX Component
 */
const AdvancedSearch = () => {
    /* Hooks */
    const navigate = useNavigate();
    const loading = useLoading();
    const notification = useNotification();

    /* Base variables */
    const organisationNames = useAppSelector(getOrganisationNames);
    const [advancedSearchToggle, setAdvancedSearchToggle] = useState<boolean>(false);
    const tabs: { [name: string]: JSX.Element } = {
        digitalSpecimenID: <DOISearch />,
        physicalSpecimenID: <PhysicalSpecimenIDSearch />,
        collectionFacility: <CollectionFacilitySearch />,
        virtualCollection: <VirtualCollectionSearch />
    };
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const initialFormValues: {
        doi: string,
        physicalSpecimenIdType: 'global' | 'local' | 'resolvable',
        normalisedPhysicalSpecimenId: string,
        organisationName: string,
        collectionFacilityIdType: 'local'
    } = {
        doi: '',
        physicalSpecimenIdType: 'global',
        normalisedPhysicalSpecimenId: '',
        organisationName: Object.values(organisationNames)[0],
        collectionFacilityIdType: 'local'
    };

    /**
     * Function to search for a digital specimen by DOI
     * @param doi The provided DOI
     */
    const SearchByDOI = async (doi: string) => {
        const handle = doi.replace(import.meta.env.VITE_DOI_URL as string, '');

        /* Try to fetch digital specimen by DOI */
        GetDigitalSpecimen({ handle }).then(() => {
            navigate(`/ds/${handle}`);
        }).catch(error => {
            console.error(error);

            /* Push as error notifications */
            notification.Push({
                key: `${handle}-${Math.random()}`,
                message: error,
                template: 'error'
            });
        }).finally(() => {
            loading.End();
        });
    };

    /**
     * Function to search for a digital specimen by physical specimen id
     * @param type The physical specimen id type
     * @param physicalSpecimenId The physical specimen id
     * @param organisationName The name of the hosting organisation
     */
    const SearchByPhysicalSpecimenId = (type: 'global' | 'local' | 'resolvable', physicalSpecimenId: string, organisationName?: string) => {
        /* Base search filters on physcial specimen id type */
        let searchFilters: SearchFilters = {
            physicalSpecimenId: [physicalSpecimenId]
        };

        if (type === 'local' && organisationName) {
            /* For local physical specimen id, add organisation name */
            searchFilters.organisationName = [organisationName];
        };

        GetDigitalSpecimens({ searchFilters, pageSize: 1 }).then(({ digitalSpecimens }) => {
            /* If a hit is found, navigate to the digital specimen page */
            navigate(`/ds/${digitalSpecimens[0]['ods:ID'].replace(import.meta.env.VITE_DOI_URL as string, '')}`);
        }).catch(error => {
            console.error(error);

            /* Push as error notification */
            notification.Push({
                key: `${physicalSpecimenId}-${Math.random()}`,
                message: error,
                template: 'error'
            });
        }).finally(() => {
            loading.End();
        });
    };

    /* Class Names */
    const advancedSearchClass = classNames({
        'mb-0': advancedSearchToggle
    });

    return (
        <div>
            <Formik initialValues={initialFormValues}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    /* Check to execute which search */
                    switch (selectedTabIndex) {
                        case 0:
                            /* Start loading */
                            loading.Start();

                            /* Search by DOI */
                            SearchByDOI(values.doi);

                            break;
                        case 1:
                            /* Start loading */
                            loading.Start();

                            SearchByPhysicalSpecimenId(values.physicalSpecimenIdType, values.normalisedPhysicalSpecimenId, values.organisationName);

                            break;
                        case 2:
                            navigate(`/search?organisationName=${values.organisationName}`);

                            break;
                    };
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        {/* Advanced search trigger */}
                        <Row>
                            <Col>
                                <Button type="button"
                                    variant="blank"
                                    className="tc-accent py-0"
                                    OnClick={() => setAdvancedSearchToggle(true)}
                                >
                                    Search by ID or collection
                                </Button>
                            </Col>
                        </Row>
                        {/* Advanced search window, absolute to relative column in Home.tsx */}
                        <div className={`${styles.advancedSearch} ${advancedSearchClass} position-absolute h-100 w-50 pe-5 ps-5 end-0 bottom-0 pt-5 bgc-default`}>
                            {/* Title and close icon */}
                            <Row>
                                <Col>
                                    <p className="fs-3 fw-lightBold">Search by ID or collection</p>
                                </Col>
                                <Col lg="auto">
                                    <Button type="button"
                                        variant="blank"
                                        OnClick={() => {
                                            setAdvancedSearchToggle(false);
                                            setSelectedTabIndex(0);
                                            loading.End();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faXmark}
                                            className="tc-primary fs-2"
                                        />
                                    </Button>
                                </Col>
                            </Row>
                            {/* Relative div to host the content and absolute loading screen */}
                            <div className="position-relative">
                                {/* Tabs with options: digital specimen ID, Physical specimen ID, collection facility and virtual collection */}
                                <Row className="mt-3">
                                    <Col>
                                        <Tabs tabs={tabs}
                                            selectedIndex={selectedTabIndex}
                                            tabProps={{
                                                formValues: values,
                                                SetFieldValue: (field: string, value: string | number | boolean) => setFieldValue(field, value)
                                            }}
                                            tabPanelClassName='pt-3'
                                            SetSelectedIndex={(index: number) => setSelectedTabIndex(index)}
                                        />
                                    </Col>
                                </Row>
                                {/* Submit button */}
                                {selectedTabIndex !== 3 &&
                                    <Row className="flex-row-reverse mt-4">
                                        <Col className="">
                                            <Button type="submit"
                                                variant="primary"
                                            >
                                                Search
                                            </Button>
                                        </Col>
                                    </Row>
                                }
                                {/* Loading screen */}
                                {loading.loading &&
                                    <div className="position-absolute w-100 h-100 start-0 top-0 bgc-secondary-soft-transparent">
                                        {/* Spinner */}
                                        <Row className="h-100">
                                            <Col className="d-flex flex-column justify-content-center align-items-center">
                                                <Spinner className="fs-1" />
                                            </Col>
                                        </Row>
                                    </div>
                                }

                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    );
};

export default AdvancedSearch;