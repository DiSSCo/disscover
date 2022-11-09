import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import BootstrapTable from 'react-bootstrap-table-next';
import { Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Import API */
import GetRecentAnnotations from 'api/annotate/GetRecentAnnotations';
import GetCreatorAnnotations from 'api/annotate/GetCreatorAnnotations';


const AnnotationsTable = (props) => {
    const filter = props.filter;

    const [displayAnnotations, setDisplayAnnotations] = useState();

    useEffect(() => {
        if (!filter || filter === 'globalAnnotations') {
            /* Needs pagination and new call */
            GetRecentAnnotations(Process);
        } else if (filter === 'recentAnnotations') {
            GetRecentAnnotations(Process);
        } else if (filter === 'creatorAnnotations') {
            GetCreatorAnnotations(UserService.getToken(), Process);
        }
    }, [filter]);

    function Process(annotations) {
        setDisplayAnnotations(annotations);
    }

    let navigate = useNavigate();

    function RedirectToSpecimenPage(index) {
        const specimen = displayAnnotations[index]['specimen'];

        navigate(`/ds/${specimen['id']}`);
    }

    /* Set table headers */
    const tableHeaders = [{
        dataField: 'index',
        hidden: true
    }, {
        dataField: 'specimen_name',
        text: 'Specimen name',
        sort: true
    }, {
        dataField: 'attribute',
        text: 'Attribute',
        sort: true
    }, {
        dataField: 'annotation_type',
        text: 'Annotation type',
        sort: true
    }, {
        dataField: 'date',
        text: 'Date',
        sort: true
    }];

    /* Set table data */
    let tableData = [];
    let rowEvents;

    if (!displayAnnotations || displayAnnotations['length'] === 0) {
        tableData = [{
            'name': 'No annotations are present'
        }];
    } else {
        rowEvents = {
            onClick: (_e, row, _rowIndex) => {
                RedirectToSpecimenPage(row['index'])
            }
        };

        for (const i in displayAnnotations) {
            const annotation = displayAnnotations[i];

            const isoDate = new Date(Date.parse(annotation['created']));
            const date = Moment(isoDate).format('MM-DD-YYYY');

            tableData.push({
                'index': i,
                'specimen_name': annotation['target']['id'],
                'attribute': annotation['target']['indvProp'],
                'annotation_type': annotation['motivation'],
                'date': date
            });
        }
    }

    return (
        <Col className="annotate_resultsTable ps-4">
            <BootstrapTable
                keyField='id'
                data={tableData}
                columns={tableHeaders}
                rowEvents={rowEvents}
                rowClasses='annotate_tableRow'
                headerClasses='annotate_tableHeader bg-primary-light'
                bodyClasses='annotate_resultsTableContent'
                classes='annotate_table'
                striped={true}
            />
        </Col>
    );

}

export default AnnotationsTable;