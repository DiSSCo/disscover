/* Import Dependencies */
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { isEmpty } from 'lodash';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from 'redux/specimen/SpecimenSlice';

/* Import Types */
import { SourceSystem } from 'app/Types';

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
        GetSourceSystem(specimen.digitalSpecimen['ods:sourceSystem'].replace(process.env.REACT_APP_HANDLE_URL as string, '')).then((sourceSystem) => {
            if (sourceSystem) {
                setSourceSystem(sourceSystem);
            }
        });
    }, [specimen]);

    /* Set Datatable columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Property',
        selector: row => row.property_name,
        sortable: true,
        wrap: true
    }, {
        name: 'Value',
        selector: row => row.property_value,
        sortable: true,
        wrap: true
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

    /* Custom styles for Data Table */
    const customStyles = {
        table: {
            style: {
                height: '100%',
                width: '100%'
            }
        },
        tableWrapper : {
            style: {
                height: '100%',
                width: '100%',
                backgroundColor: 'white'
            }
        },
        responsiveWrapper: {
            style: {
                height: '100%',
                width: '100%'
            }
        },
        head: {
            style: {
                fontSize: '0.875rem !important'
            }
        },
        // rows: {
        //     style: {
        //         minHeight: '40px',
        //         fontSize: '0.875rem !important'
        //     },
        //     highlightOnHoverStyle: {
        //         backgroundColor: '#98cdbf',
        //     },
        //     stripedStyle: {
        //         backgroundColor: '#eef7f4'
        //     }
        // }
    };

    return (
        <Row className="h-100">
            <Col className="h-100">
                <Card className="h-100">
                    <Card.Body className="h-100 d-flex flex-column">
                        <Row className="pb-2">
                            <Col>
                                <Card.Title>
                                    Original data from source
                                </Card.Title>
                            </Col>
                        </Row>

                        <Row className="flex-grow-1 overflow-hidden">
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
                                                <div className="h-100 w-100">
                                                    <DataTable
                                                        columns={tableColumns}
                                                        data={tableData}
                                                        className="h-100 w-100 overflow-y-auto"
                                                        customStyles={customStyles}

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