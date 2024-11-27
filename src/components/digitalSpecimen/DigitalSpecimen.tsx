/* Import Dependencies */
import classNames from 'classnames';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

/* Import Hooks */
import { useAppSelector, useAppDispatch, useFetch } from 'app/Hooks';

/* Import Store */
import { getDigitalSpecimen, setDigitalSpecimen } from 'redux-store/DigitalSpecimenSlice';
import { setAnnotationTarget } from 'redux-store/AnnotateSlice';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { DigitalSpecimen as DigitalSpecimenType } from 'app/types/DigitalSpecimen';
import { TourTopic } from 'app/Types';

/* Import Sources */
import DigitalSpecimenSchema from 'sources/dataModel/digitalSpecimen.json';
import DigitalSpecimenAnnotationCases from 'sources/annotationCases/DigitalSpecimenAnnotationCases.json';

/* Import API */
import GetDigitalSpecimen from 'api/digitalSpecimen/GetDigitalSpecimen';
import GetDigitalSpecimenDigitalMedia from 'api/digitalSpecimen/GetDigitalSpecimenDigitalMedia';
import GetDigitalSpecimenAnnotations from 'api/digitalSpecimen/GetDigitalSpecimenAnnotations';
import GetDigitalSpecimenMas from 'api/digitalSpecimen/GetDigitalSpecimenMas';
import GetDigitalSpecimenMasJobRecords from 'api/digitalSpecimen/GetDigitalSpecimenMasJobRecords';
import ScheduleDigitalSpecimenMas from "api/digitalSpecimen/ScheduleDigitalSpecimenMas";

/* Import Components */
import AnnotateTourSteps from './tourSteps/AnnotateTourSteps';
import DigitalSpecimenTourSteps from './tourSteps/DigitalSpecimenTourSteps';
import MasTourSteps from './tourSteps/masTourSteps';
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
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
    const tourTopics: TourTopic[] = [
        {
            name: 'digitalSpecimen',
            title: 'About This Page'
        },
        {
            name: 'annotate',
            title: 'Using Annotations'
        },
        {
            name: 'mas',
            title: 'Machine Annotation Services'
        }
    ];

    /* OnLoad, fetch digital specimen data */
    fetch.FetchMultiple({
        callMethods: [
            {
                alias: 'digitalSpecimen',
                params: {
                    handle: `${params.prefix}/${params.suffix}`,
                    version: params.version
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
        triggers: [params.version],
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

    /**
     * Function to set the annotation target state
     * @param annotationTargetType The type of the annotation target, either class or term
     * @param jsonPath The JSON path that targets the class or term
     */
    const SetAnnotationTarget = (annotationTargetType: 'class' | 'term', jsonPath: string) => {
       dispatch(setAnnotationTarget({
            type: annotationTargetType,
            jsonPath
       }));
    };

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
            <Container fluid className="h-100 overflow-hidden">
                <Row className="h-100">
                    <Col className={`${digitalSpecimenBodyClass} h-100 tr-smooth`}>
                        <div className={`${digitalSpecimenContentClass} h-100 d-flex flex-column tr-smooth`}>
                            {/* Render header*/}
                            <Header tourTopics={tourTopics} />

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
                                                <Row className="tourDigitalSpecimen2 mt-2">
                                                    <Col>
                                                        <TopBar digitalSpecimen={digitalSpecimen}
                                                            annotationMode={annotationMode}
                                                            ToggleAnnotationMode={() => setAnnotationMode(!annotationMode)}
                                                        />
                                                    </Col>
                                                </Row>
                                                {/* ID card and content block */}
                                                <Row className="flex-grow-1 overflow-hidden mt-4">
                                                    {/* ID card */}
                                                    <Col lg={{ span: 3 }}
                                                        className="tourDigitalSpecimen5 h-100"
                                                    >
                                                        <IdCard digitalSpecimen={digitalSpecimen}
                                                            digitalSpecimenDigitalMedia={digitalSpecimenDigitalMedia}
                                                            annotationMode={annotationMode}
                                                            SetAnnotationTarget={SetAnnotationTarget}
                                                        />
                                                    </Col>
                                                    {/* Content block */}
                                                    <Col lg={{ span: 9 }}
                                                        className="tourDigitalSpecimen6 tourDigitalSpecimen7 tourDigitalSpecimen8 tourDigitalSpecimen9 tourDigitalSpecimen10
                                                        tourDigitalSpecimen11 tourDigitalSpecimen12 h-100"
                                                    >
                                                        <ContentBlock digitalSpecimen={digitalSpecimen}
                                                            digitalSpecimenDigitalMedia={digitalSpecimenDigitalMedia}
                                                            selectedTabIndex={selectedTabIndex}
                                                            SetSelectedTabIndex={setSelectedTabIndex}
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
                    {digitalSpecimen &&
                        <div className={`${annotationSidePanelClass} h-100 tr-smooth`}>
                            <AnnotationSidePanel superClass={digitalSpecimen}
                                schema={DigitalSpecimenSchema}
                                annotationCases={DigitalSpecimenAnnotationCases.annotationCases}
                                GetAnnotations={GetDigitalSpecimenAnnotations}
                                GetMas={GetDigitalSpecimenMas}
                                GetMasJobRecords={GetDigitalSpecimenMasJobRecords}
                                ScheduleMas={ScheduleDigitalSpecimenMas}
                                HideAnnotationSidePanel={() => setAnnotationMode(false)}
                            />
                        </div>
                    }
                </Row>
            </Container>

            <DigitalSpecimenTourSteps SetSelectedTabIndex={setSelectedTabIndex} />
            <AnnotateTourSteps SetAnnotationMode={setAnnotationMode} />
            <MasTourSteps annotationMode={annotationMode}
                SetAnnotationMode={setAnnotationMode}
            />
        </div>
    );
};

export default DigitalSpecimen;