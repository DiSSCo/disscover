/* Import Dependencies */
import DataTable, { TableColumn } from 'react-data-table-component';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen } from "redux/specimen/SpecimenSlice";

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';


const OriginalData = () => {
    /* Base variables */
    const specimen = useAppSelector(getSpecimen);

    interface DataRow {
        index: number,
        property_name: string,
        property_value: string,
    };

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

                        <Row className={`${styles.originalDataTable}`}>
                            <Col md={{ span: 9 }} className="h-100">
                                <Card className="h-100 overflow-scroll">
                                    <DataTable
                                        columns={tableColumns}
                                        data={tableData}

                                        striped
                                        highlightOnHover
                                    />
                                </Card>
                            </Col>
                            <Col md={{ span: 3 }}>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                Harvested from:
                                                {specimen.sourceSystemId}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Row>
                                            <Col>
                                                Data standard: Coming Soon
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default OriginalData;