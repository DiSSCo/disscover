/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable, { TableColumn } from 'react-data-table-component';
import Moment from 'moment';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getOverviewAnnotations } from 'redux/annotate/AnnotateSlice';


const AnnotationsTable = () => {
    /* Hooks */
    let navigate = useNavigate();

    /* Base variables */
    const annotations = useAppSelector(getOverviewAnnotations);
    const [tableData, setTableData] = useState<DataRow[]>([]);

    interface DataRow {
        index: number,
        specimen_id: string,
        specimen_name: string,
        property: string,
        motivation: string,
        date: string
    };

    /* OnChange of Annotations: update Table Data */
    useEffect(() => {
        const tableData: DataRow[] = [];

        annotations.forEach((annotation, i) => {
            tableData.push({
                index: i,
                specimen_id: annotation['oa:target']['ods:id'],
                specimen_name: annotation['oa:target']['ods:id'],
                property: annotation['oa:target']['oa:selector']?.['ods:field'] as string ?? '',
                motivation: annotation['oa:motivation'],
                date: Moment(annotation['dcterms:created']).format('MM-DD-YYYY')
            });
        });

        setTableData(tableData);
    }, [annotations]);

    /* Set Datatable columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Specimen name',
        selector: row => row.specimen_name,
        id: 'annotate_name',
        sortable: true
    }, {
        name: 'Property',
        selector: row => row.property,
        id: 'annotate_property',
        sortable: true
    }, {
        name: 'Motivation',
        selector: row => row.motivation,
        id: 'annotate_motivation',
        sortable: true
    }, {
        name: 'Date',
        selector: row => row.date,
        id: 'annotate_data',
        sortable: true
    }];

    /* Function for when clicked on a table row, redirect to Annotation on Specimen page */
    const OnAnnotationSelect = (row: DataRow) => {
        navigate(`/ds/${row.specimen_id.replace(process.env.REACT_APP_DOI_URL as string, '')}`);
    }

    /* Custom styles for Data Table */
    const customStyles = {
        head: {
            style: {
                color: 'white',
                fontSize: '14px'
            }
        },
        headRow: {
            style: {
                backgroundColor: '#51a993'
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

    return (
        <div className="h-100 overflow-auto position-relative b-secondary rounded-c">
            <DataTable
                columns={tableColumns}
                data={tableData}
                customStyles={customStyles}
                onRowClicked={(row) => OnAnnotationSelect(row)}

                striped
                highlightOnHover
                pointerOnHover
            />
        </div>
    );

}

export default AnnotationsTable;