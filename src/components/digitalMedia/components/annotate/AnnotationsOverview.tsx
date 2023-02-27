/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMediaAnnotations } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Types */
import { Annotation } from 'global/Types';


/* Props Typing */
interface Props {
    ToggleModal: Function
};


const AnnotationsOverview = (props: Props) => {
    const { ToggleModal } = props;

    /* Base variables */
    const digitalMediaAnnotations = useAppSelector(getDigitalMediaAnnotations);

    if (Object.keys(digitalMediaAnnotations).length > 1) {
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
                            {Object.keys(digitalMediaAnnotations).map((property) => {
                                if (property !== 'observation') {
                                    const propertyAnnotations: Annotation[] = digitalMediaAnnotations[property];
                                    const propertyAnnotationsComponents: React.ReactElement[] = [];

                                    propertyAnnotations.forEach((annotation) => {
                                        propertyAnnotationsComponents.push(
                                            <Row key={annotation.id}>
                                                <Col className="digitalMedia_annotationsBlockRow px-4 py-2 border-b-1-primary-dark"
                                                    onClick={() => ToggleModal(annotation.target.indvProp, annotation.motivation)}
                                                >
                                                    <Row>
                                                        <Col md={{ span: 7 }}>
                                                            {`${annotation.target.indvProp} `}
                                                        </Col>
                                                        <Col md={{ span: 5 }}>
                                                            {`${annotation.motivation}`}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        );
                                    });

                                    return (<span key={property}> {propertyAnnotationsComponents} </span>);
                                } else {
                                    return <span key={property} />
                                }
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

export default AnnotationsOverview;