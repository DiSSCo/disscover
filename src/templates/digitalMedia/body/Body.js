import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Import Components */
import MediaList from './mediaList/MediaList';
import MediaFrame from './mediaFrame/MediaFrame';
import MediaData from './mediaData/MediaData';
import MediaAnnotaions from './mediaAnnotations/MediaAnnotations';

import MediaModal from './mediaModal/MediaModal';
import AnnotateModal from 'templates/specimen/body/annotate/AnnotateModal';

/* Import API */
import GetAnnotations from 'api/annotate/GetAnnotations';


const Body = (props) => {
    const digitalMediaItem = props.digitalMediaItem;

    const [chosenDigitalMediaTab, setChosenDigitalMediaTab] = useState({ meta: 'active' });
    const [mediaModalToggle, setMediaModalToggle] = useState(false);

    function ToggleMediaModal() {
        setMediaModalToggle(!mediaModalToggle);
    }

    const [modalToggle, setModalToggle] = useState(false);
    const [modalProperty, setModalProperty] = useState({ 'property': '' });
    const [annotationType, setAnnotationType] = useState({});
    const [modalAnnotations, setModalAnnotations] = useState();

    function SetAnnotationType(type, form = false) {
        const copyAnnotationType = { ...annotationType }

        copyAnnotationType['type'] = type;
        copyAnnotationType['form'] = form;

        setAnnotationType(copyAnnotationType);
    }

    useEffect(() => {
        function SetAnnotations() {
            /* Search for annotations data and put into view */
            GetAnnotations(digitalMediaItem['MediaMeta']['id']['value'], Process);

            function Process(annotations) {
                const annotationsForModal = {};

                for (const i in annotations) {
                    const annotation = annotations[i];

                    if (!annotationsForModal[annotation['target']['indvProp']]) {
                        annotationsForModal[annotation['target']['indvProp']] = { [annotation['motivation']]: { [annotation['creator']]: annotation } };
                    } else if (!annotationsForModal[annotation['target']['indvProp']][annotation['motivation']]) {
                        annotationsForModal[annotation['target']['indvProp']][annotation['motivation']] = { [annotation['creator']]: annotation };
                    } else {
                        annotationsForModal[annotation['target']['indvProp']][annotation['motivation']][annotation['creator']] = annotation;
                    }
                }

                setModalAnnotations(annotationsForModal);
            }
        }

        SetAnnotations();
    }, [digitalMediaItem]);

    function ToggleModal(propertyObject, property = null, type = null) {
        if (UserService.isLoggedIn()) {
            setModalToggle(!modalToggle);

            if (!modalToggle) {
                if (type) {
                    SetAnnotationType(type);
                }
            }

            if (property && property !== modalProperty['property']) {
                let copyModalProperty = { ...modalProperty };

                copyModalProperty['property'] = property;
                copyModalProperty['displayName'] = propertyObject['displayName'];
                copyModalProperty['currentValue'] = propertyObject['value'];

                setModalProperty(copyModalProperty);
            }
        }
    }

    return (
        <Container fluid className="digitalMedia_body mt-4 ">
            <Row className="digitalMedia_mediaBody">
                <Col md={{ span: 10, offset: 1 }} className="h-100">
                    <Row className="h-100">
                        <Col md={{ span: 9 }} className="h-100">
                            <Row className="digitalMedia_titleBlock fw-bold pe-1">
                                <Col className="bg-primary-blue text-white">
                                    {digitalMediaItem['MediaMeta']['digitalSpecimenId']['value']}
                                </Col>
                            </Row>
                            <Row className="digitalMedia_mediaBodyImages">
                                <Col md={{ span: 3 }}>
                                    <MediaList digitalMediaItem={digitalMediaItem} />
                                </Col>

                                <Col md={{ span: 9 }} className="h-100">
                                    <MediaFrame digitalMediaItem={digitalMediaItem} />
                                </Col>
                            </Row>
                        </Col>

                        <Col md={{ span: 3 }} className="h-100 overflow-hidden">
                            <Row>
                                <Col className={`digitalMedia_mediaBodyTab ${chosenDigitalMediaTab['meta']} col-md-auto border border-bottom-0 border-dark`}
                                    onClick={() => setChosenDigitalMediaTab({ 'meta': 'active' })}
                                >
                                    Metadata
                                </Col>
                                <Col className={`digitalMedia_mediaBodyTab ${chosenDigitalMediaTab['annotate']} col-md-auto border border-bottom-0 border-dark`}
                                    onClick={() => setChosenDigitalMediaTab({ 'annotate': 'active' })}
                                >
                                    Annotations
                                </Col>
                            </Row>
                            <Row className="digitalMedia_mediaMetaContent overflow-scroll w-100 border border-dark">
                                <Col className={`digitalMedia_mediaBodyContent ${chosenDigitalMediaTab['meta']}`}>
                                    <MediaData digitalMediaItem={digitalMediaItem}
                                        ToggleMediaModal={() => ToggleMediaModal()}
                                        ToggleModal={(propertyObject, property) => ToggleModal(propertyObject, property)}
                                    />
                                </Col>
                                <Col className={`digitalMedia_mediaBodyContent ${chosenDigitalMediaTab['annotate']}`}>
                                    <MediaAnnotaions annotations={modalAnnotations}
                                        ToggleModal={(propertyObject, property, motivation) => ToggleModal(propertyObject, property, motivation)}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <MediaModal
                digitalMediaItem={digitalMediaItem}
                mediaModalToggle={mediaModalToggle}

                ToggleMediaModal={() => ToggleMediaModal()}
            />

            <AnnotateModal
                targetId={digitalMediaItem['MediaMeta']['id']['value']}
                targetType={'digital_media'}

                modalToggle={modalToggle}
                modalProperty={modalProperty}
                modalAnnotations={modalAnnotations}
                annotationType={annotationType}

                ToggleModal={(propertyObject, property) => ToggleModal(propertyObject, property)}
                SetAnnotationType={(type, form) => SetAnnotationType(type, form)}
                SetModalAnnotations={(modalAnnotations) => setModalAnnotations(modalAnnotations)}
            />
        </Container>
    );
}

export default Body;