/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KeycloakService from 'keycloak/Keycloak';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getSpecimen, setSpecimen,
    getSpecimenDigitalMedia, setSpecimenDigitalMedia,
    getSpecimenAnnotations, setSpecimenAnnotations
} from 'redux/specimen/SpecimenSlice';
import { getAnnotateTarget, setAnnotateTarget } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Specimen as SpecimenType } from 'global/Types';

/* Import Styles */
import "./specimen.scss";

/* Import Components */
import Header from 'components/general/header/Header';
import SpecimenInfo from './components/specimen/SpecimenInfo';
import SpecimenProperties from './components/specimen/SpecimenProperties';
import SpecimenDigitalMedia from './components/specimen/SpecimenDigitalMedia';
import MidsMeter from './components/mids/MidsMeter';
import AnnotationsOverview from './components/annotate/AnnotationsOverview';
import AnnotateModal from 'components/annotate/modal/AnnotateModal';
import Footer from 'components/general/footer/Footer';

/* Import API */
import GetSpecimen from 'api/specimen/GetSpecimen';
import FilterSpecimen from 'api/specimen/FilterSpecimen';
import GetSpecimenDigitalMedia from 'api/specimen/GetSpecimenDigitalMedia';
import GetSpecimenAnnotations from 'api/specimen/GetSpecimenAnnotations';
import GetSpecimenVersions from 'api/specimen/GetSpecimenVersions';


const Specimen = () => {
    /* Configure Store */
    const dispatch = useAppDispatch();

    /* Hooks */
    const params = useParams();

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const specimenDigitalMedia = useAppSelector(getSpecimenDigitalMedia);
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const [version, setVersion] = useState<number>();
    const [versions, setVersions] = useState<number[]>([]);

    /* Onload / Specimen or Version change: Check for Specimen, otherwise grab (specific version) from database */
    useEffect(() => {
        /* Fetch Specimen if not present or version has changed */
        if (Object.keys(specimen).length === 0 || (version && specimen.version !== version)) {
            /* Get Specimen */
            GetSpecimen(`${params['prefix']}/${params['suffix']}`, version).then((specimen) => {
                if (specimen) {
                    /* Filter data */
                    specimen.filtered = FilterSpecimen(specimen);

                    dispatch(setSpecimen(specimen));

                    /* Check Specimen Details */
                    CheckDetails(specimen);
                }
            });
        } else {
            /* Check Specimen Details */
            CheckDetails(specimen);
        }
    }, [specimen, version]);

    /* Onchange of the Annotation Target's annotations: Check if changes occured */
    useEffect(() => {
        /* Check if the specimen annotations differ from the target annotations */
        if (annotateTarget.annotations.length > 0 &&
            JSON.stringify(specimenAnnotations[annotateTarget.property]) !== JSON.stringify(annotateTarget.annotations)) {
            CheckAnnotations(specimen);
        }
    }, [annotateTarget.annotations]);

    /* Function for checking Specimen Digital Media */
    const CheckDigitalMedia = (specimen: SpecimenType) => {
        GetSpecimenDigitalMedia(specimen.id).then((digitalMedia) => {
            if (digitalMedia) {
                dispatch(setSpecimenDigitalMedia(digitalMedia));
            }
        });
    }

    /* Function for checking Specimen Annotations */
    const CheckAnnotations = (specimen: SpecimenType) => {
        GetSpecimenAnnotations(specimen.id).then((annotations) => {
            if (annotations) {
                dispatch(setSpecimenAnnotations(annotations));
            }
        });
    }

    /* Function for a combined check on Specimen Digital Media, Annotations and Versions */
    const CheckDetails = (specimen: SpecimenType) => {
        /* Check for Digital Media */
        CheckDigitalMedia(specimen);

        /* Check for Annotations */
        CheckAnnotations(specimen);

        /* Set current Specimen version */
        setVersion(specimen.version);

        /* Check for other versions */
        GetSpecimenVersions(specimen.id).then((versions) => {
            if (versions) {
                setVersions(versions);
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
                target: specimen,
                targetType: 'digital_specimen',
                annotations: specimenAnnotations[property]? specimenAnnotations[property] : []
            }));

            setModalToggle(true);
        } else {
            setModalToggle(false);
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100 overflow-hidden">
            <Header />

            {Object.keys(specimen).length > 0 &&
                <Container fluid className="mt-5 specimen_content">
                    <Row className="h-100">
                        <Col md={{ span: 10, offset: 1 }} className="h-100">
                            <Row className="h-100">
                                <Col md={{ span: 8 }} className="h-100 overflow-auto">
                                    <Row>
                                        <Col md={{ span: 12 }}>
                                            <SpecimenInfo versions={versions}
                                                LoadSpecimenVersion={(version: number) => setVersion(version)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-5">
                                        <Col className="mt-4">
                                            <SpecimenProperties
                                                ToggleModal={(property: string) => ToggleModal(property)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col md={{ span: 4 }}>
                                    {(specimenDigitalMedia.length > 0) &&
                                        <Row>
                                            <Col md={{ span: 12 }}>
                                                <SpecimenDigitalMedia />
                                            </Col>
                                        </Row>
                                    }

                                    <Row className="mt-4">
                                        <Col md={{ span: 12 }}>
                                            <MidsMeter />
                                        </Col>
                                    </Row>

                                    <Row className="specimen_annotationsOverview mt-4 overflow-hidden">
                                        <Col className="h-100">
                                            <AnnotationsOverview
                                                ToggleModal={(property: string, motivation: string) => ToggleModal(property, motivation)}
                                            />

                                            {(Object.keys(annotateTarget.target).length > 0 && KeycloakService.IsLoggedIn()) &&
                                                <AnnotateModal modalToggle={modalToggle}
                                                    ToggleModal={() => ToggleModal()}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            }

            <Footer />
        </div>
    );
}

export default Specimen;