/* Import Depencencies */
import classNames from "classnames";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

/* Import Hooks */
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch, useFetch } from "app/Hooks";

/* Import Store */
import { getDigitalMedia, setDigitalMedia } from "redux-store/DigitalMediaSlice";
import { setAnnotationTarget } from "redux-store/AnnotateSlice";

/* Import Types */
import { DigitalMedia as DigitalMediaType } from "app/types/DigitalMedia";

/* Import Sources */
import DigitalMediaSchema from 'sources/dataModel/digitalMedia.json';
import DigitalMediaAnnotationCases from 'sources/annotationCases/DigitalMediaAnnotationCases.json';

/* Import API */
import GetDigitalMedia from "api/digitalMedia/GetDigitalMedia";
import GetDigitalMediaAnnotations from "api/digitalMedia/GetDigitalMediaAnnotations";
import GetDigitalMediaMas from "api/digitalMedia/GetDigitalMediaMas";
import GetDigitalMediaMasJobRecords from "api/digitalMedia/GetDigitalMediaMasJobRecords";
import ScheduleDigitalMediaMas from "api/digitalMedia/ScheduleDigitalMediaMas";

/* Import Components */
import { ContentBlock, IdCard, TopBar } from "./components/DigitalMediaComponents";
import { AnnotationSidePanel, ContentNavigation } from "components/elements/Elements";
import { LoadingScreen } from "components/elements/customUI/CustomUI";


/**
 * Component that renders the digital media page
 * @returns JSX Component
 */
const DigitalMedia = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const params = useParams();
    const fetch = useFetch();

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    const [annotationMode, setAnnotationMode] = useState<boolean>(false);
    const [annotoriousMode, setAnnotoriousMode] = useState<string>('move');
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    /* OnLoad, fetch digital media data */
    fetch.Fetch({
        params: {
            handle: `${params.prefix}/${params.suffix}`,
            version: params.version
        },
        triggers: [params.suffix, params.version],
        Method: GetDigitalMedia,
        Handler: (digitalMedia: DigitalMediaType) => dispatch(setDigitalMedia(digitalMedia))
    });

    /**
     * Function to set the annotation target state
     * @param annotationTargetType The type of the annotation target, either class or term
     * @param jsonPath The JSON path that targets the class or term
     */
    const SetAnnotationTarget = (annotationTargetType: 'class' | 'term', jsonPath: string) => {
        dispatch(setAnnotationTarget({
            type: annotationTargetType,
            jsonPath,
            directPath: true
        }));
    };

    /* Class Names */
    const digitalMediaBodyClass = classNames({
        'col-lg-12': !annotationMode,
        'col-lg-8': annotationMode
    });

    const digitalMediaContentClass = classNames({
        'col-lg-10 offset-lg-1': !annotationMode,
        'col-lg-12 px-5': annotationMode
    });

    const annotationSidePanelClass = classNames({
        'w-0': !annotationMode,
        'col-lg-4 pe-0': annotationMode
    });

    return (
        <div className="h-90 d-flex flex-column">
            {/* Main container, acting as the body for the digital specimen page and additionally, the annotation side panel */}
            <Container fluid className="h-100 overflow-hidden">
                <Row className="h-100">
                    <Col className={`${digitalMediaBodyClass} h-100 tr-smooth`}>
                        <div className={`${digitalMediaContentClass} h-100 d-flex flex-column tr-smooth`}>
                            {/* Digital specimen page body */}
                            <Container fluid className="flex-grow-1 overflow-hidden my-5">
                                <Row className="h-100">
                                    <Col
                                        className={`h-100 d-flex flex-column position-relative`}
                                    >
                                        {(!fetch.loading && digitalMedia) &&
                                            <>
                                                {/* ContentNavigation */}
                                                <Row>
                                                    <Col>
                                                        <ContentNavigation />
                                                    </Col>
                                                </Row>
                                                {/* Top bar */}
                                                <Row className="mt-2">
                                                    <Col>
                                                        <TopBar digitalMedia={digitalMedia}
                                                            annotationMode={annotationMode}
                                                            annotoriousMode={annotoriousMode}
                                                            selectedTabIndex={selectedTabIndex}
                                                            ToggleAnnotationMode={() => setAnnotationMode(!annotationMode)}
                                                            SetAnnotoriousMode={(mode: string) => setAnnotoriousMode(mode)}
                                                        />
                                                    </Col>
                                                </Row>
                                                {/* ID card and content block */}
                                                <Row className="flex-grow-1 overflow-hidden mt-4">
                                                    {/* ID card */}
                                                    <Col lg={{ span: 3 }}
                                                        className="h-100"
                                                    >
                                                        <IdCard digitalMedia={digitalMedia} />
                                                    </Col>
                                                    {/* Content block */}
                                                    <Col lg={{ span: 9 }}
                                                        className="h-100"
                                                    >
                                                        <ContentBlock digitalMedia={digitalMedia}
                                                            annotoriousMode={annotoriousMode}
                                                            selectedTabIndex={selectedTabIndex}
                                                            annotationMode={annotationMode}
                                                            SetAnnotationTarget={SetAnnotationTarget}
                                                            SetAnnotoriousMode={(mode: string) => setAnnotoriousMode(mode)}
                                                            SetSelectedTabIndex={setSelectedTabIndex}
                                                        />
                                                    </Col>
                                                </Row>
                                            </>
                                        }

                                        {/* Loading screen if digital specimen is being fetched */}
                                        <LoadingScreen visible={fetch.loading}
                                            displaySpinner={true}
                                            text="Loading Digital Media"
                                            className="bgc-default"
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    {digitalMedia &&
                        <div className={`${annotationSidePanelClass} h-100 tr-smooth`}>
                            <AnnotationSidePanel superClass={digitalMedia}
                                schema={DigitalMediaSchema}
                                annotationCases={DigitalMediaAnnotationCases.annotationCases}
                                GetAnnotations={GetDigitalMediaAnnotations}
                                GetMas={GetDigitalMediaMas}
                                GetMasJobRecords={GetDigitalMediaMasJobRecords}
                                ScheduleMas={ScheduleDigitalMediaMas}
                                HideAnnotationSidePanel={() => setAnnotationMode(false)}
                            />
                        </div>
                    }
                </Row>
            </Container>
        </div>
    );
};

export default DigitalMedia;