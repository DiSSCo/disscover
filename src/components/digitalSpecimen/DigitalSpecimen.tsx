/* Import Dependencies */
import classNames from 'classnames';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

/* Import Hooks */
import { useAppSelector, useAppDispatch, useFetch } from 'app/Hooks';

/* Import Store */
import { getDigitalSpecimen, setDigitalSpecimen } from 'redux-store/DigitalSpecimenSlice';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { DigitalSpecimen as DigitalSpecimenType } from 'app/types/DigitalSpecimen';

/* Import Sources */
import DigitalSpecimenSchema from 'sources/dataModel/digitalSpecimen.json';

/* Import API */
import GetDigitalSpecimen from 'api/digitalSpecimen/GetDigitalSpecimen';
import GetDigitalSpecimenDigitalMedia from 'api/digitalSpecimen/GetDigitalSpecimenDigitalMedia';
import GetDigitalSpecimenAnnotations from 'api/digitalSpecimen/GetDigitalSpecimenAnnotations';

/* Import Components */
import { ContentBlock, IdCard, TopBar } from './components/DigitalSpecimenComponents';
import { AnnotationSidePanel, BreadCrumbs, Header, Footer } from 'components/elements/Elements';
import { LoadingScreen } from 'components/elements/customUI/CustomUI';


/**
 * Component that renders the digital specimen page
 * @returns JSX Component
 */
const DigitalSpecimen = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const fetch = useFetch();

    /* Base variables */
    const digitalSpecimen = useAppSelector(getDigitalSpecimen);
    const [digitalSpecimenDigitalMedia, setDigitalSpecimenDigitalMedia] = useState<DigitalMedia[] | undefined>();
    const [annotationMode, setAnnotationMode] = useState<boolean>(false);

    /* OnLoad: fetch digital specimen data */
    fetch.FetchMultiple({
        callMethods: [
            {
                alias: 'digitalSpecimen',
                params: {
                    handle: `${params.prefix}/${params.suffix}`
                },
                Method: GetDigitalSpecimen

            },
            {
                alias: 'digitalMedia',
                params: {
                    handle: `${params.prefix}/${params.suffix}`
                },
                Method: GetDigitalSpecimenDigitalMedia
            }
        ],
        Handler: (results: {
            digitalSpecimen: DigitalSpecimenType | undefined,
            digitalMedia: DigitalMedia[]
        }) => {
            /* Dispatch digital specimen */
            dispatch(setDigitalSpecimen(results.digitalSpecimen));

            /* Set digital media */
            setDigitalSpecimenDigitalMedia(results.digitalMedia);
        }
    });

    /* Class Names */
    const digitalSpecimenBodyClass = classNames({
        'col-lg-12': !annotationMode,
        'col-lg-8': annotationMode
    });

    const digitalSpecimenContentClass = classNames({
        'col-lg-10 offset-lg-1': !annotationMode,
        'col-lg-12 px-5': annotationMode
    });

    const annotationSidePanelClass = classNames({
        'w-0': !annotationMode,
        'col-lg-4 pe-0': annotationMode
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Main container, acting as the body for the digital specimen page and additionally, the annotation side panel */}
            <Container fluid className="h-100 overflow-y-hidden">
                <Row className="h-100">
                    <Col className={`${digitalSpecimenBodyClass} h-100 tr-smooth`}>
                        <div className={`${digitalSpecimenContentClass} h-100 d-flex flex-column tr-smooth`}>
                            {/* Render header*/}
                            <Header />

                            {/* Digital specimen page body */}
                            <Container fluid className="flex-grow-1 overflow-hidden my-5">
                                <Row className="h-100">
                                    <Col
                                        className={`h-100 d-flex flex-column position-relative`}
                                    >
                                        {(!fetch.loading && digitalSpecimen) &&
                                            <>
                                                {/* Bread crumbs */}
                                                <Row>
                                                    <Col>
                                                        <BreadCrumbs />
                                                    </Col>
                                                </Row>
                                                {/* Top bar */}
                                                <Row className="mt-2">
                                                    <Col>
                                                        <TopBar digitalSpecimen={digitalSpecimen}
                                                            annotationMode={annotationMode}
                                                            ToggleAnnotationSidePanel={() => setAnnotationMode(!annotationMode)}
                                                        />
                                                    </Col>
                                                </Row>
                                                {/* ID card and content block */}
                                                <Row className="flex-grow-1 overflow-hidden mt-4">
                                                    {/* ID card */}
                                                    <Col lg={{ span: 3 }}
                                                        className="h-100"
                                                    >
                                                        <IdCard digitalSpecimen={digitalSpecimen}
                                                            digitalSpecimenDigitalMedia={digitalSpecimenDigitalMedia}
                                                        />
                                                    </Col>
                                                    {/* Content block */}
                                                    <Col lg={{ span: 9 }}
                                                        className="h-100"
                                                    >
                                                        <ContentBlock digitalSpecimen={digitalSpecimen}
                                                            digitalSpecimenDigitalMedia={digitalSpecimenDigitalMedia}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        }

                                        {/* Loading screen if digital specimen is being fetched */}
                                        <LoadingScreen visible={fetch.loading}
                                            displaySpinner={true}
                                            text="Loading Digital Specimen"
                                            className="bgc-default"
                                        />
                                    </Col>
                                </Row>
                            </Container>

                            <Footer />
                        </div>
                    </Col>
                    <div className={`${annotationSidePanelClass} tr-smooth`}>
                        <AnnotationSidePanel superClass={digitalSpecimen}
                            schema={DigitalSpecimenSchema}
                            GetAnnotations={GetDigitalSpecimenAnnotations}
                            HideAnnotationSidePanel={() => setAnnotationMode(false)}
                        />
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default DigitalSpecimen;