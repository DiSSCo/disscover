import { Row, Col } from 'react-bootstrap';

/* Import Sources */
import DigitalMediaFilterLayer from 'sources/digitalMediaFilterLayer';


const MediaAnnotaions = (props) => {
    const annotations = props.annotations;

    if (annotations) {
        if (Object.keys(annotations).length > 0) {
            return (
                <Row className="h-100">
                    <Col>
                        <Row>
                            <Col className="digitalMedia_annotationsBlockHeader px-4 py-2 fw-bold">
                                <Row>
                                    <Col md={{ span: 7 }}>
                                        Attribute
                                    </Col>
                                    <Col md={{ span: 5 }}>
                                        Type
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="digitalMedia_annotationsBlock">
                                {Object.keys(annotations).map((group, _i) => {
                                    const annotationGroup = annotations[group];

                                    let annotationView = [];

                                    for (const key in annotationGroup) {
                                        const annotationObjects = annotationGroup[key];

                                        for (const secondKey in annotationGroup[key]) {
                                            const annotationObject = annotationObjects[secondKey];
                                            const propertyObject = DigitalMediaFilterLayer[annotationObject['target']['indvProp']];

                                            annotationView.push(
                                                <Row>
                                                    <Col className="digitalMedia_annotationsBlockRow px-4 py-2 border-b-1-primary-dark"
                                                        onClick={() => props.ToggleModal(propertyObject, annotationObject['target']['indvProp'], annotationObject['motivation'])}
                                                    >
                                                        <Row key={secondKey}>
                                                            <Col md={{ span: 7 }}>
                                                                {`${annotationObject['target']['indvProp']} `}
                                                            </Col>
                                                            <Col md={{ span: 5 }}>
                                                                {`${annotationObject['motivation']}`}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            );
                                        }
                                    }

                                    return annotationView;
                                })}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row>
                    <Col className="digitalMedia_annotationsBlock px-4 py-2">
                        No annotations yet
                    </Col>
                </Row>
            );
        }
    }
}

export default MediaAnnotaions;