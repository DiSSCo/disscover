/* Import Dependencies */
import { useState } from 'react';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimenAnnotations } from "redux/specimen/SpecimenSlice";

/* Import Types */
import { Annotation } from 'global/Types';


/* Props Typing */
interface Props {
    ToggleModal: Function
};


const AnnotationsOverview = (props: Props) => {
    const { ToggleModal } = props;

    /* Base variables */
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);
    const [activeTab, setActiveTab] = useState<string>('annotations');

    /* ClassName for Annotations Tab */
    const classAnnotationsTab = classNames({
        'specimen_annotationsOverviewTab': true,
        'active': (activeTab === 'annotations')
    });

    /* ClassName for Quality Flags Tab */
    const classQualityFlagsTab = classNames({
        'specimen_annotationsOverviewTab': true,
        'active': (activeTab === 'quality_flaggs')
    });

    /* For each specimen property with annotations, push to content array */
    const overviewAnnotations: Annotation[] = [];
    const qualityFlagAnnotations: Annotation[] = [];

    Object.keys(specimenAnnotations).forEach((property: string) => {
        const propertyAnnotations = specimenAnnotations[property];

        propertyAnnotations.forEach((annotation) => {
            overviewAnnotations.push(annotation);

            if (annotation.motivation === 'quality_flagging') {
                qualityFlagAnnotations.push(annotation);
            }
        });
    });

    return (
        <>
            {specimenAnnotations &&
                <Row className="h-100">
                    <Col md={{ span: 12 }} className="h-100">
                        <Row>
                            <Col md={{ span: 4 }}
                                className={`${classAnnotationsTab} border-t-2-primary-dark border-l-2-primary-dark br-tl pb-1 text-center`}
                                onClick={() => setActiveTab('annotations')}
                            >
                                Annotations
                            </Col>
                            <Col md={{ span: 4 }}
                                className={`${classQualityFlagsTab} border-t-2-primary-dark border-r-2-primary-dark br-tr pb-1 text-center`}
                                onClick={() => setActiveTab('quality_flaggs')}
                            >
                                Quality flags
                            </Col>
                        </Row>
                        <Row className="specimen_annotationsOverviewRow border-1-primary-dark">
                            {(activeTab === 'annotations') ?
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
                                            {(overviewAnnotations.length > 0) ? overviewAnnotations.map((annotation, index) => {
                                                const isoDate: Date = new Date(annotation.created * 1000);
                                                const date: string = `${(isoDate.getMonth() + 1)}-${isoDate.getDate()}-${isoDate.getFullYear()}`;

                                                let even = "even";

                                                if (index % 2) {
                                                    even = "";
                                                }

                                                return (
                                                    <Row key={annotation.id}>
                                                        <Col className={`specimen_annotationsOverviewSectionRow py-1 ${even}`}
                                                            onClick={() => ToggleModal(annotation.target.indvProp, annotation.motivation)}
                                                        >
                                                            <Row>
                                                                <Col md={{ span: 5 }}>
                                                                    {annotation.target.indvProp}
                                                                </Col>
                                                                <Col md={{ span: 4 }}>
                                                                    {annotation.motivation}
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
                                            {(qualityFlagAnnotations.length > 0) ? qualityFlagAnnotations.map((annotation, index) => {
                                                let even = "even";

                                                if (index % 2) {
                                                    even = "";
                                                }

                                                return (
                                                    <Row key={annotation.id}>
                                                        <Col className={`specimen_annotationsOverviewSectionRow py-1 ${even}`}
                                                            onClick={() => ToggleModal(annotation.target.indvProp, annotation.motivation)}
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
                                                : <p> No quality flags yet </p>}
                                        </Col>
                                    </Row>
                                </Col>
                            }
                        </Row>
                    </Col>
                </Row>
            }
        </>
    );
}

export default AnnotationsOverview;