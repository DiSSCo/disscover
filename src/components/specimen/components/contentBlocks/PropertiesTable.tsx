/* Import Dependencies */
import DataTable, { TableColumn } from 'react-data-table-component';
import { Capitalize } from 'app/Utilities';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSpecimen, getSpecimenAnnotations } from 'redux/specimen/SpecimenSlice';
import { setAnnotateTarget } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';


/* Props Typing */
interface Props {
    title: string,
    properties: Dict,
    ShowWithAnnotations: Function
}


const PropertiesTable = (props: Props) => {
    const { title, properties, ShowWithAnnotations } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);

    /* Declare type of a table row */
    interface DataRow {
        index: number,
        property: string,
        value: string | number | boolean
    };

    /* Set Datatable columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Property',
        selector: row => row.property,
        id: 'properties_property',
        sortable: true
    }, {
        name: 'Value',
        selector: row => row.value,
        id: 'propertiesvalue',
        sortable: true
    }];

    /* Custom styles for Data Table */
    const customStyles = {
        head: {
            style: {
                color: 'white',
                fontSize: '0.875rem'
            }
        },
        headRow: {
            style: {
                backgroundColor: '#A1D8CA'
            }
        },
        rows: {
            style: {
                minHeight: '40px'
            },
            highlightOnHoverStyle: {
                backgroundColor: '#98cdbf',
            },
            stripedStyle: {
                backgroundColor: '#eef7f4'
            }
        }
    };

    /* Set Table data */
    const tableData: DataRow[] = [];
    let counter: number = 0;

    for (const property in properties) {
        tableData.push({
            index: counter,
            property: property,
            value: properties[property]
        });

        counter++;
    };

    return (
        <Row>
            <Col>
                {/* Title */}
                <Row className="mt-2">
                    <Col>
                        <p className="fs-3"> {Capitalize(title)} </p>
                    </Col>
                </Row>
                {/* Table Body */}
                <Row className="mt-2">
                    <Col>
                        <div className={`${styles.propertiesTable} h-100 overflow-auto position-relative rounded-c}`}>
                            <DataTable
                                columns={tableColumns}
                                data={tableData}
                                customStyles={customStyles}
                                onRowClicked={(row) => ShowWithAnnotations(row.property)}

                                striped
                                highlightOnHover
                                pointerOnHover
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default PropertiesTable;