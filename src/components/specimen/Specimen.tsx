/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import KeycloakService from 'keycloak/Keycloak';
import { isEmpty } from 'lodash';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getSpecimen, setSpecimen, setSpecimenVersions,
    setSpecimenDigitalMedia, getSpecimenAnnotations, setSpecimenAnnotations
} from 'redux/specimen/SpecimenSlice';
import { getAnnotateTarget, setAnnotateTarget } from 'redux/annotate/AnnotateSlice';
import { setErrorMessage } from 'redux/general/GeneralSlice';

/* Import Styles */
import styles from './specimen.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import TitleBar from './components/TitleBar';
import IDCard from './components/IDCard/IDCard';
import ContentBlock from './components/contentBlock/ContentBlock';
import AnnotateModal from 'components/annotate/modal/AnnotateModal';
import Footer from 'components/general/footer/Footer';

/* Import API */
import GetSpecimen from 'api/specimen/GetSpecimen';
import GetSpecimenFull from 'api/specimen/GetSpecimenFull';
import GetSpecimenVersions from 'api/specimen/GetSpecimenVersions';
import GetSpecimenAnnotations from 'api/specimen/GetSpecimenAnnotations';


const Specimen = () => {
    /* Configure Store */
    const dispatch = useAppDispatch();

    /* Hooks */
    const params = useParams();
    const navigate = useNavigate();

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);
    const annotateTarget = useAppSelector(getAnnotateTarget);

    /* Onload / Version change: Check for Specimen, otherwise grab full (specific version) from database */
    useEffect(() => {
        const specimenId = `${params.prefix}/${params.suffix}`;

        /* Fetch Full Specimen if not present or not equal to params ID; if version has changed, refetch Specimen with version */
        if (isEmpty(specimen) || specimen.id.replace('https://hdl.handle.net/', '') !== specimenId) {
            /* Check for version in url */
            let version: string = '';

            if (params.version) {
                version = `/${params.version}`;
            }

            /* Get full Specimen */
            GetSpecimenFull(`${params.prefix}/${params.suffix}${version}`).then((fullSpecimen) => {
                if (fullSpecimen) {
                    /* Set Specimen */
                    dispatch(setSpecimen(fullSpecimen.specimen));

                    /* Set Specimen Digital Media */
                    dispatch(setSpecimenDigitalMedia(fullSpecimen.digitalMedia));

                    /* Set Specimen Annotations */
                    dispatch(setSpecimenAnnotations(fullSpecimen.annotations));

                    /* Get Specimen Versions */
                    GetSpecimenVersions(fullSpecimen.specimen.id.replace('https://hdl.handle.net/', '')).then((versions) => {
                        dispatch(setSpecimenVersions(versions));
                    }).catch(error => {
                        console.warn(error);
                    });
                }
            }).catch(error => {
                console.warn(error);
            });
        } else if (params.version && specimen.version.toString() !== params.version) {
            /* Get Specimen with version */
            const originalVersion = specimen.version;

            GetSpecimen(`${params['prefix']}/${params['suffix']}`, params.version).then((specimen) => {
                if (!isEmpty(specimen)) {
                    /* Set Specimen */
                    dispatch(setSpecimen(specimen));
                } else {
                    /* If version fetch failed, reset to original version */
                    navigate(`/ds/${params.prefix}/${params.suffix}/${originalVersion}`)

                    /* Show Error Message */
                    dispatch(setErrorMessage(`The selected version: ${params.version}, of Specimen could not be retrieved.`));
                }
            }).catch(error => {
                console.warn(error);
            });
        }
    }, [specimen, params]);

    /* Onchange of the Annotation Target's annotations: Check if changes occured */
    useEffect(() => {
        /* Check if the specimen annotations differ from the target annotations */
        if (specimen.id && Array.isArray(annotateTarget.annotations)) {
            if (JSON.stringify(specimenAnnotations[annotateTarget.property]) !== JSON.stringify(annotateTarget.annotations)) {
                /* Fetch Specimen Annotations */
                GetSpecimenAnnotations(specimen.id.replace('https://hdl.handle.net/', '')).then((annotations) => {
                    if (annotations) {
                        dispatch(setSpecimenAnnotations(annotations));
                    }
                }).catch(error => {
                    console.warn(error);
                });
            }
        }
    }, [annotateTarget]);

    /* Function for toggling the Annotate Modal */
    const [modalToggle, setModalToggle] = useState(false);

    const ToggleModal = (property?: string, motivation?: string) => {
        if (property) {
            dispatch(setAnnotateTarget({
                property,
                motivation: motivation ? motivation : '',
                target: specimen,
                targetType: 'digital_specimen',
                annotations: specimenAnnotations[property] ? specimenAnnotations[property] : []
            }));

            setModalToggle(true);
        } else {
            setModalToggle(false);
        }
    }

    return (
        <div className="d-flex flex-column min-vh-100 overflow-hidden">
            <Header />

            {(specimen.id && specimen.id.replace('https://hdl.handle.net/', '') === `${params['prefix']}/${params['suffix']}`) &&
                <Container fluid className={`${styles.content} pt-5`}>
                    <Row className="h-100">
                        <Col md={{ span: 10, offset: 1 }} className="h-100">
                            <div className="h-100 d-flex flex-column">
                                <Row className={styles.titleBar}>
                                    <Col>
                                        <TitleBar />
                                    </Col>
                                </Row>
                                <Row className="py-4 flex-grow-1 overflow-hidden">
                                    <Col md={{ span: 3 }} className="h-100">
                                        <IDCard ToggleModal={(property: string) => ToggleModal(property)} />
                                    </Col>
                                    <Col md={{ span: 9 }} className="ps-4 h-100">
                                        <ContentBlock ToggleModal={(property: string) => ToggleModal(property)} />
                                    </Col>

                                    {(Object.keys(annotateTarget.target).length > 0 && KeycloakService.IsLoggedIn()) &&
                                        <AnnotateModal modalToggle={modalToggle}
                                            ToggleModal={() => ToggleModal()}
                                        />
                                    }
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            }

            <Footer />
        </div>
    );
}

export default Specimen;