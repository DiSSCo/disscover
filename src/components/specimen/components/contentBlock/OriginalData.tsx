/* Import Dependencies */
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { isEmpty } from 'lodash';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Types */
import { SourceSystem } from 'global/Types';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import API */
import GetSourceSystem from 'api/sourceSystem/GetSourceSystem';


const OriginalData = () => {
    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const [sourceSystem, setSourceSystem] = useState<SourceSystem>();

    interface DataRow {
        index: number,
        property_name: string,
        property_value: string,
    };

    /* OnLoad: Fetch Source System */
    useEffect(() => {
        GetSourceSystem(specimen.sourceSystemId.replace('https://hdl.handle.net/', '')).then((sourceSystem) => {
            if (sourceSystem) {
                setSourceSystem(sourceSystem);
            }
        });
    }, [specimen]);

    /* Set Datatable columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Property',
        selector: row => row.property_name,
        sortable: true
    }, {
        name: 'Value',
        selector: row => row.property_value,
        sortable: true
    }]


    /* Set table data */
    const tableData: DataRow[] = [];

    Object.keys(specimen.originalData).forEach((property, i) => {
        if (property !== 'extensions') {
            const propertyValue = specimen.originalData[property];

            tableData.push({
                index: i,
                property_name: property,
                property_value: propertyValue,
            });
        }
    });

    return (
        <Row className="h-100">
            <Col className="h-100">
                <Card className="h-100">
                    <Card.Body className="h-100">
                        <Row className="pb-2">
                            <Col>
                                <Card.Title>
                                    Original data from source
                                </Card.Title>
                            </Col>
                        </Row>

                        <Row className={`${styles.originalData}`}>
                            <Col className="h-100">
                                <div className="h-100 d-flex flex-column">
                                    {!isEmpty(sourceSystem) &&
                                        <Row className="pb-3">
                                            <Col>
                                                <p>Source URL: {sourceSystem.endpoint}</p>
                                            </Col>
                                        </Row>
                                    }
                                    <Row className="flex-grow-1 overflow-hidden">
                                        <Col className="h-100">
                                            <Card className="h-100">
                                                <div className="overflow-auto">
                                                    <DataTable
                                                        columns={tableColumns}
                                                        data={tableData}

                                                        striped
                                                        highlightOnHover
                                                    />
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default OriginalData;