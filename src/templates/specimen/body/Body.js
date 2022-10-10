import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/* Import API */
import GetAnnotations from 'api/annotate/GetAnnotations';

/* Import Components */
import SpecimenInfo from './specimenInfo/SpecimenInfo';
import AnnotateSection from './annotate/AnnotateSection';
import MidsMeter from './midsMeter/MidsMeter';
import SpecimenMedia from './specimenMedia/SpecimenMedia';
import AnnotationsOverview from './annotationsOverview/AnnotationsOverview';


const Body = (props) => {
    const specimen = props.specimen;

    const [midsDetailsVisibility, setMidsDetailsVisibility] = useState('hidden');

    function ToggleMidsDetails() {
        if (midsDetailsVisibility) {
            setMidsDetailsVisibility('');
        } else {
            setMidsDetailsVisibility('hidden');
        }
    }

    const [scrollToMids, setScrollToMids] = useState();

    function UpdateScrollToMids(midsHandle) {
        if (midsDetailsVisibility) {
            ToggleMidsDetails();
        }

        setTimeout(function () {
            setScrollToMids(midsHandle);
        }, 400);
    }

    const [modalToggle, setModalToggle] = useState(false);
    const [modalProperty, setModalProperty] = useState({ 'property': '' });
    const [annotationType, setAnnotationType] = useState('');
    const [modalAnnotations, setModalAnnotations] = useState();

    useEffect(() => {
        SetAnnotations();
    }, []);

    function SetAnnotations() {
        /* Search for annotations data and put into view */
        GetAnnotations(specimen['Meta']['id']['value'], Process);

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

    function ToggleModal(property = null, propertyObject, type = null) {
        setModalToggle(!modalToggle);

        if (!modalToggle) {
            if (type) {
                setAnnotationType(type);
            }
        }

        if (property && property !== modalProperty['property']) {
            let copyModalProperty = { ...modalProperty };

            copyModalProperty['property'] = property;
            copyModalProperty['displayName'] = propertyObject['displayName'];
            copyModalProperty['currentValue'] = propertyObject['value'];

            if (propertyObject['multiple']) {
                copyModalProperty['multiple'] = propertyObject['multiple'];
            }

            if (propertyObject['options']) {
                copyModalProperty['options'] = propertyObject['options']
            }

            setModalProperty(copyModalProperty);
        }
    }

    return (
        <Container fluid className="mt-5 specimen_content">
            <Row className="h-100">
                <Col md={{ span: 10, offset: 1 }} className="h-100">
                    <Row className="h-100">
                        <Col md={{ span: 8 }} className="h-100 specimen_contentScroll">
                            <Row>
                                <Col md={{ span: 12 }}>
                                    <SpecimenInfo specimen={specimen} LoadSpecimenVersion={(handle, version) => props.LoadSpecimenVersion(handle, version)} />
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col>
                                    <AnnotateSection
                                        specimen={specimen}
                                        modalToggle={modalToggle}
                                        modalProperty={modalProperty}
                                        modalAnnotations={modalAnnotations}
                                        annotationType={annotationType}

                                        UpdateScrollToMids={(midsHandle) => UpdateScrollToMids(midsHandle)}
                                        ToggleMidsDetails={() => ToggleMidsDetails()}
                                        ToggleModal={(property, propertyObject) => ToggleModal(property, propertyObject)}
                                        SetAnnotationType={(type) => setAnnotationType(type)}
                                        SetModalAnnotations={(copyModalAnnotations) => setModalAnnotations(copyModalAnnotations)}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={{ span: 4 }}>
                            {(Array.isArray(specimen['media'])) &&
                                <Row>
                                    <Col md={{ span: 12 }}>
                                        {specimen['media'].length > 0 && <SpecimenMedia specimenMedia={specimen['media']} />}
                                    </Col>
                                </Row>
                            }

                            <Row className="mt-4">
                                <Col md={{ span: 12 }}>
                                    <MidsMeter
                                        specimen={specimen} mode='annotate'
                                        midsDetailsVisibility={midsDetailsVisibility}
                                        scrollToMids={scrollToMids}

                                        UpdateScrollToMids={(midsHandle) => UpdateScrollToMids(midsHandle)}
                                        ToggleMidsDetails={() => ToggleMidsDetails()}
                                    />
                                </Col>
                            </Row>

                            <Row className="mt-4 specimen_annotationsOverview">
                                <Col className="h-100">
                                    <AnnotationsOverview specimen={specimen}

                                        ToggleModal={(property, propertyObject, type) => ToggleModal(property, propertyObject, type)}
                                        SetAnnotationType={(type) => setAnnotationType(type)}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Body;