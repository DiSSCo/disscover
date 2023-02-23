/* Import Dependencies */
import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import classNames from 'classnames';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimenAnnotations } from "redux/specimen/SpecimenSlice";

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Sources */
import AnnotationMotivations from 'sources/annotationMotivations.json';
import HarmonisedAttributes from 'sources/hamonisedAttributes.json';


const AnnotationsOverview = () => {
    /* Base variables */
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);
    const annotationMotivations: Dict = AnnotationMotivations;
    const harmonisedAttributes: Dict = HarmonisedAttributes;

    interface DataRow {
        index: number,
        property_name: string,
        motivation: string,
        property_value: string,
    };

    /* Function for filtering Annotations */
    const [annotationFilter, setAnnotationFilter] = useState('all');

    const CheckAnnotationFilterClass = (motivation: string) => {
        if (motivation === annotationFilter || (annotationFilter === 'all' && motivation === 'all')) {
            return classNames({
                [`${styles.annotationFilter}`]: true,
                [`${styles.active}`]: true
            });
        } else {
            return classNames({
                [`${styles.annotationFilter}`]: true
            });
        }
    }

    /* Set Datatable columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Property',
        selector: row => row.property_name,
        sortable: true,
        width: '25%'
    }, {
        name: 'Motivation',
        selector: row => row.motivation,
        sortable: true,
        width: '25%'
    }, {
        name: 'Annotation',
        selector: row => row.property_value,
        sortable: false
    }]


    /* Set table data */
    const tableData: DataRow[] = [];

    Object.keys(specimenAnnotations).forEach((property, i) => {
        const propertyAnnotations = specimenAnnotations[property];

        propertyAnnotations.forEach((annotation) => {
            if (annotationFilter === annotation.motivation || annotationFilter === 'all') {
                /* Push to display array */
                const annotationValue = (Array.isArray(annotation.body.value)) ? annotation.body.value.toString() : annotation.body.value;

                tableData.push({
                    index: i,
                    property_name: harmonisedAttributes[property] ? harmonisedAttributes[property].displayName : property,
                    motivation: annotationMotivations[annotation.motivation].displayName,
                    property_value: annotationValue,
                });
            }
        });
    });

    return (
        <Row className="h-100">
            <Col md={{ span: 12 }} className="h-100">
                <Card className="h-100">
                    <Card.Body className="h-100">
                        <Row className="pb-2">
                            <Col>
                                <Card.Title>
                                    Annotations overview
                                </Card.Title>
                            </Col>
                        </Row>

                        <Row className={`${styles.originalDataTable}`}>
                            <Col md={{ span: 2 }} className="pt-3">
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <span className={CheckAnnotationFilterClass('all')}
                                                    onClick={() => setAnnotationFilter('all')}
                                                >
                                                    All Annotations
                                                </span>
                                            </Col>
                                        </Row>

                                        {Object.keys(annotationMotivations).map((motivation: string) => {
                                            return (
                                                <Row key={motivation}>
                                                    <Col>
                                                        <span className={CheckAnnotationFilterClass(motivation)}
                                                            onClick={() => setAnnotationFilter(motivation)}
                                                        >
                                                            {annotationMotivations[motivation].displayNamePlural}
                                                        </span>
                                                    </Col>
                                                </Row>
                                            );
                                        })}
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={{ span: 10 }} className="h-100">
                                <Card className="h-100 overflow-scroll">
                                    <DataTable
                                        columns={tableColumns}
                                        data={tableData}

                                        striped
                                        highlightOnHover
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default AnnotationsOverview;