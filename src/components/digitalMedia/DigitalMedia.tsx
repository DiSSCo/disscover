/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KeycloakService from 'keycloak/Keycloak';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getDigitalMedia, setDigitalMedia,
    getDigitalMediaAnnotations, setDigitalMediaAnnotations
} from 'redux/digitalMedia/DigitalMediaSlice';
import { getAnnotateTarget, setAnnotateTarget } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { DigitalMedia as DigitalMediaType } from 'global/Types';

/* Import Styles */
import './digitalMedia.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import DigitalMediaList from './components/digitalMedia/DigitalMediaList';
import DigitalMediaFrame from './components/digitalMedia/DigitalMediaFrame';
import DigitalMediaProperties from './components/digitalMedia/DigitalMediaProperties';
import AnnotationsOverview from './components/annotate/AnnotationsOverview';
import ObservationModal from './components/annotate/ObservationModal';
import AnnotateModal from 'components/annotate/modal/AnnotateModal';
import Footer from 'components/general/footer/Footer';

/* Import API */
import GetDigitalMedia from 'api/digitalMedia/GetDigitalMedia';
import FilterDigitalMedia from 'api/digitalMedia/FilterDigitalMedia';
import GetDigitalMediaAnnotations from 'api/digitalMedia/GetDigitalMediaAnnotations';


const DigitalMedia = () => {
    /* Configure Store */
    const dispatch = useAppDispatch();

    /* Hooks */
    const params = useParams();

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);
    const digitalMediaAnnotations = useAppSelector(getDigitalMediaAnnotations);
    const annotateTarget = useAppSelector(getAnnotateTarget);

    /* OnLoad: Check for Digital Media, otherwise grab from database */
    useEffect(() => {
        const digitalMediaId = `${params.prefix}/${params.suffix}`;

        /* Fetch Digital Media if not present */
        if (Object.keys(digitalMedia).length === 0 || digitalMedia.id !== digitalMediaId) {
            GetDigitalMedia(`${params['prefix']}/${params['suffix']}`).then((digitalMedia) => {
                if (digitalMedia) {
                    digitalMedia.filtered = FilterDigitalMedia(digitalMedia);

                    dispatch(setDigitalMedia(digitalMedia));
                }
            });
        } else {
            CheckAnnotations(digitalMedia);
        }
    }, [digitalMedia, params]);

    /* Onchange of the Annotation Target's annotations: Check if changes occured */
    useEffect(() => {
        /* Check if the Digital Media annotations differ from the target annotations */
        if (annotateTarget.annotations.length > 0 &&
            JSON.stringify(digitalMediaAnnotations[annotateTarget.property]) !== JSON.stringify(annotateTarget.annotations)) {
            CheckAnnotations(digitalMedia);
        }
    }, [annotateTarget.annotations]);

    /* Function for checking Digital Media Annotations */
    const CheckAnnotations = (digitalMedia: DigitalMediaType) => {
        GetDigitalMediaAnnotations(digitalMedia.id).then((annotations) => {
            if (annotations) {
                dispatch(setDigitalMediaAnnotations(annotations));
            }
        });
    }

    /* Function for toggling the Annotate Modal */
    const [modalToggle, setModalToggle] = useState(false);

    const ToggleModal = (property?: string, motivation?: string) => {
        if (property) {
            dispatch(setAnnotateTarget({
                property,
                motivation: motivation ? motivation : '',
                target: digitalMedia,
                targetType: 'digital_media',
                annotations: digitalMediaAnnotations[property] ? digitalMediaAnnotations[property] : []
            }));

            setModalToggle(true);
        } else {
            setModalToggle(false);
        }
    }

    /* Function for toggling the Observations Modal */
    const [observationModalToggle, setObservationModalToggle] = useState(false);

    return (
        <div className="h-100">
            <Header />

            {Object.keys(digitalMedia).length > 0 &&
                <Container fluid className="digitalMedia_body mt-4 ">
                    <Row className="digitalMedia_mediaBody">
                        <Col md={{ span: 10, offset: 1 }} className="h-100">
                            <Row className="h-100">
                                <Col md={{ span: 9 }} className="h-100">
                                    <Row className="digitalMedia_titleBlock fw-bold pe-1">
                                        <Col className="bg-primary-blue text-white">
                                            {digitalMedia.id}
                                        </Col>
                                    </Row>
                                    <Row className="digitalMedia_mediaBodyImages">
                                        <Col md={{ span: 3 }}>
                                            <DigitalMediaList />
                                        </Col>

                                        <Col md={{ span: 9 }} className="h-100">
                                            <DigitalMediaFrame />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-md-auto">
                                            <button type="button" onClick={() => setObservationModalToggle(!observationModalToggle)}> 
                                                Observation Annotation
                                            </button>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col md={{ span: 3 }} className="h-100 overflow-hidden">
                                    <Tabs defaultActiveKey="properties">
                                        <Tab eventKey="properties" title="Metadata">
                                            <Row className="digitalMedia_mediaMetaContent overflow-scroll w-100 border border-dark">
                                                <Col>
                                                    <DigitalMediaProperties
                                                        ToggleModal={(property: string) => ToggleModal(property)}
                                                    />
                                                </Col>
                                            </Row>
                                        </Tab>
                                        <Tab eventKey="annotations" title="Annotations">
                                            <Row className="digitalMedia_mediaMetaContent overflow-scroll w-100 border border-dark">
                                                <Col>
                                                    <AnnotationsOverview
                                                        ToggleModal={(property: string, motivation: string) => ToggleModal(property, motivation)}
                                                    />
                                                </Col>
                                            </Row>
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <ObservationModal observationModalToggle={observationModalToggle}
                        ToggleObservationModal={() => setObservationModalToggle(!observationModalToggle)}
                    />

                    {(Object.keys(annotateTarget.target).length > 0 && KeycloakService.IsLoggedIn()) &&
                        <AnnotateModal modalToggle={modalToggle}
                            ToggleModal={() => ToggleModal()}
                        />
                    }
                </Container>
            }

            <Footer />
        </div>
    );
}

export default DigitalMedia;