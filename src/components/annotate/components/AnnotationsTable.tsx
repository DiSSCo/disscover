/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable, { TableColumn } from 'react-data-table-component';
import Moment from 'moment';
import KeycloakService from 'keycloak/Keycloak';
import { Col } from 'react-bootstrap';

/* Import Types */
import { Annotation } from 'global/Types';

/* Import API */
import GetRecentAnnotations from 'api/annotate/GetRecentAnnotations';
import GetUserAnnotations from 'api/user/GetUserAnnotations';


/* Props Typing */
interface Props {
    filter: string
};


const AnnotationsTable = (props: Props) => {
    const { filter } = props;

    /* Hooks */
    let navigate = useNavigate();

    /* Base variables */
    interface DataRow {
        index: number,
        specimen_id: string,
        specimen_name: string,
        property: string,
        motivation: string,
        date: string
    };

    /* Based on filter, search for annotations to be displayed */
    const [displayAnnotations, setDisplayAnnotations] = useState<Annotation[]>([]);

    useEffect(() => {
        if (!filter || filter === 'globalAnnotations') {
            /* TODO: Needs pagination and new call */
            GetRecentAnnotations().then((annotations) => {
                setDisplayAnnotations(annotations);
            });
        } else if (filter === 'recentAnnotations') {
            GetRecentAnnotations().then((annotations) => {
                setDisplayAnnotations(annotations);
            });
        } else if (filter === 'creatorAnnotations') {
            GetUserAnnotations(KeycloakService.GetToken()).then((annotations) => {
                if (annotations) {
                    setDisplayAnnotations(annotations);
                }
            });
        }
    }, [filter]);

    /* Function for when clicked on a table row, continue to Annotation on Specimen page */
    const OnAnnotationSelect = (row: DataRow) => {
        /* Navigate to specimen page, row.specimen_id equals specimen identifier */
        navigate(`/ds/${row.specimen_id.replace('https://hdl.handle.net/', '')}`);
    }

    /* Set Datatable columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Specimen name',
        selector: row => row.specimen_name,
        sortable: true
    }, {
        name: 'Property',
        selector: row => row.property,
        sortable: true
    }, {
        name: 'Motivation',
        selector: row => row.motivation,
        sortable: true
    }, {
        name: 'Date',
        selector: row => row.date,
        sortable: true
    }];

    /* Set table data */
    const tableData: DataRow[] = [];

    displayAnnotations.forEach((annotation, i) => {
        tableData.push({
            index: i,
            specimen_id: annotation.target.id,
            specimen_name: annotation.specimen ? annotation.specimen.specimenName : annotation.target.id,
            property: annotation.target.indvProp,
            motivation: annotation.motivation,
            date: Moment(annotation.created).format('MM-DD-YYYY')
        });
    });

    return (
        <Col className="annotate_resultsTable ps-4">
            <DataTable
                columns={tableColumns}
                data={tableData}
                onRowClicked={(row) => OnAnnotationSelect(row)}

                striped
                highlightOnHover
                pointerOnHover
            />
        </Col>
    );

}

export default AnnotationsTable;