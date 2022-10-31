import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import API */
import GetAnnotations from 'api/annotate/GetAnnotations';

/* Import Sources */
import AnnotationFilterLayer from 'sources/annotationFilterLayer';


const AnnotationsOverview = (props) => {
    const specimen = props.specimen;

    const [tabs, setTabs] = useState({
        annotations: 'active',
        quality_flagging: ''
    });
    const [overviewAnnotations, setOverviewAnnotations] = useState();

    useEffect(() => {
        GetAnnotations(specimen['Meta']['id']['value'], Process);

        function Process(annotations) {
            const newOverviewAnnotations = {
                quality_flags: [],
                annotations: []
            };

            annotations.forEach(annotation => {
                if (annotation['motivation'] === 'quality_flagging') {
                    newOverviewAnnotations['quality_flags'].push(annotation);
                }

                newOverviewAnnotations['annotations'].push(annotation);
            });

            setOverviewAnnotations(newOverviewAnnotations);
        }
    }, [])

    function switchTab(tab) {
        const copyTabs = { ...tabs };

        copyTabs['annotations'] = '';
        copyTabs['quality_flagging'] = '';

        copyTabs[[tab]] = 'active';

        setTabs(copyTabs);
    }

    const Events = (annotation) => {
        const propertyObject = AnnotationFilterLayer[annotation['target']['indvProp']];

        props.ToggleModal(propertyObject, annotation['target']['indvProp'], annotation['motivation'])
    }

    if (overviewAnnotations) {
        return (
            <Row className="h-100">
                <Col md={{ span: 12 }} className="h-100">
                    <Row>
                        <Col md={{ span: 4 }}
                            className={`specimen_annotationsOverviewTab border-t-2-primary-dark border-l-2-primary-dark br-tl 
                                pb-1 text-center ${tabs['annotations']}`}
                            onClick={() => switchTab('annotations')}
                        >
                            Annotations
                        </Col>
                        <Col md={{ span: 4 }}
                            className={`specimen_annotationsOverviewTab border-t-2-primary-dark border-r-2-primary-dark br-tr
                                pb-1 text-center ${tabs['quality_flagging']}`}
                            onClick={() => switchTab('quality_flagging')}
                        >
                            Quality flags
                        </Col>
                    </Row>
                    <Row className="specimen_annotationsOverviewRow border-1-primary-dark">
                        {(tabs['annotations'] === 'active') ?
                            <Col className="h-100">
                                <Row>
                                    <Col className="specimen_annotationsOverviewSectionProps py-1 border-b-1-primary-dark">
                                        <Row>
                                            <Col md={{ span: 5 }}>
                                                Attribute
                                            </Col>
                                            <Col md={{ span: 4 }}>
                                                Type
                                            </Col>
                                            <Col md={{ span: 3 }}>
                                                Created
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="specimen_annotationsOverviewSectionRows overflow-scroll">
                                    <Col>
                                        {(overviewAnnotations['annotations'].length > 0) ? overviewAnnotations['annotations'].map((annotation, i) => {
                                            const isoDate = new Date(Date.parse(annotation['created']));
                                            const date = `${(isoDate.getMonth() + 1)}-${isoDate.getDate()}-${isoDate.getFullYear()}`;

                                            let even = "even";

                                            if (!(i % 2) == 0) {
                                                even = "";
                                            }

                                            return (
                                                <Row key={i}>
                                                    <Col className={`specimen_annotationsOverviewSectionRow py-1 ${even}`}
                                                        onClick={() => { Events(annotation) }}
                                                    >
                                                        <Row>
                                                            <Col md={{ span: 5 }}>
                                                                {annotation['target']['indvProp']}
                                                            </Col>
                                                            <Col md={{ span: 4 }}>
                                                                {annotation['motivation']}
                                                            </Col>
                                                            <Col md={{ span: 3 }}>
                                                                {date}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            );
                                        }) : <p> No annotations yet </p>}
                                    </Col>
                                </Row>
                            </Col>
                            : <Col className="h-100">
                                <Row>
                                    <Col className="specimen_annotationsOverviewSectionProps py-1 border-b-1-primary-dark">
                                        <Row>
                                            <Col md={{ span: 5 }}>
                                                Attribute
                                            </Col>
                                            <Col md={{ span: 7 }}>
                                                Flag
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="specimen_annotationsOverviewSectionRows">
                                    <Col>
                                        {(overviewAnnotations.length > 0) ? overviewAnnotations['quality_flags'].map((annotation, i) => {
                                            let even = "even";

                                            if (!(i % 2) == 0) {
                                                even = "";
                                            }

                                            return (
                                                <Row key={i}>
                                                    <Col className={`specimen_annotationsOverviewSectionRow py-1 ${even}`}
                                                        onClick={() => { Events(annotation) }}
                                                    >
                                                        <Row>
                                                            <Col md={{ span: 5 }}>
                                                                {annotation['target']['indvProp']}
                                                            </Col>
                                                            <Col md={{ span: 7 }}>
                                                                {annotation['body']['value']}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            );
                                        })
                                            : <p> No quality flags yet </p> }
                                    </Col>
                                </Row>
                            </Col>
                        }
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default AnnotationsOverview;