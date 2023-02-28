/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KeycloakService from 'keycloak/Keycloak';
import { Container, Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getSpecimen, setSpecimen, setSpecimenDigitalMedia,
    getSpecimenAnnotations, setSpecimenAnnotations
} from 'redux/specimen/SpecimenSlice';
import { getAnnotateTarget, setAnnotateTarget } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Specimen as SpecimenType } from 'global/Types';

/* Import Styles */
import styles from './specimen.module.scss';

/* Import Components */
import Header from 'components/general/header/Header';
import IDCard from './components/IDCard/IDCard';
import ContentBlock from './components/contentBlock/ContentBlock';
import AnnotateModal from 'components/annotate/modal/AnnotateModal';
import Footer from 'components/general/footer/Footer';

/* Import API */
import GetSpecimen from 'api/specimen/GetSpecimen';
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
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);
    const annotateTarget = useAppSelector(getAnnotateTarget);
    const [version, setVersion] = useState<number>();
    const [versions, setVersions] = useState<number[]>([]);

    /* Onload / Specimen or Version change: Check for Specimen, otherwise grab (specific version) from database */
    useEffect(() => {
        const specimenId = `${params.prefix}/${params.suffix}`;

        /* Fetch Specimen if not present, not equal to params ID or version has changed */
        if (Object.keys(specimen).length === 0 || specimen.id !== specimenId || (version && specimen.version !== version)) {
            /* Get Specimen */
            GetSpecimen(`${params['prefix']}/${params['suffix']}`, version).then((specimen) => {
                if (specimen) {
                    dispatch(setSpecimen(specimen));
                }
            });
        } else if (Object.keys(specimen).length > 0 && (specimen.version !== version)) {
            /* Check Specimen Details */
            CheckDetails(specimen);
        }
    }, [specimen, version]);

    /* Onchange of the Annotation Target's annotations: Check if changes occured */
    useEffect(() => {
        /* Check if the specimen annotations differ from the target annotations */
        if (Array.isArray(annotateTarget.annotations) &&
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

            {Object.keys(specimen).length > 0 &&
                <Container fluid className={`${styles.specimenContent} mt-5`}>
                    <Row className="h-100">
                        <Col md={{ span: 10, offset: 1 }} className="h-100">
                            <Row className="h-100">
                                <Col md={{ span: 3 }} className="h-100">
                                    <IDCard ToggleModal={(property: string) => ToggleModal(property)} />
                                </Col>
                                <Col md={{ span: 9 }} className="ps-5 h-100">
                                    <ContentBlock versions={versions}
                                        LoadSpecimenVersion={(version: number) => setVersion(version)}
                                    />
                                </Col>

                                {(Object.keys(annotateTarget.target).length > 0 && KeycloakService.IsLoggedIn()) &&
                                    <AnnotateModal modalToggle={modalToggle}
                                        ToggleModal={() => ToggleModal()}
                                    />
                                }
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