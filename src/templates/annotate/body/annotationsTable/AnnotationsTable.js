import { useNavigate } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import { Col } from 'react-bootstrap';


const AnnotationsTable = () => {
    // let searchResults = props.searchResults;

    // let navigate = useNavigate();

    // function RedirectToSpecimenPage(index) {
    //     const specimen = searchResults[index];

    //     navigate(`/ds/${specimen['Meta']['id']['value']}`, {
    //         state: {
    //             specimen: specimen
    //         }
    //     });
    // }

    /* Set table headers */
    const tableHeaders = [{
        dataField: 'index',
        hidden: true
    }, {
        dataField: 'name',
        text: 'Specimen name',
        sort: true
    }, {
        dataField: 'country',
        text: 'Attribute',
        sort: true
    }, {
        dataField: 'specimen_type',
        text: 'Annotation type',
        sort: true
    }, {
        dataField: 'organisation',
        text: 'Datetime',
        sort: true
    }];

    /* Set table data */
    let tableData = [];
    let rowEvents;

    // if (!searchResults || searchResults['length'] === 0) {
    //     searchResults = [];

    //     tableData = [{
    //         'name': 'No specimens were found'
    //     }];
    // } else {
    //     rowEvents = {
    //         onClick: (_e, row, _rowIndex) => {
    //             RedirectToSpecimenPage(row['index'])
    //         }
    //     };

    //     for (const i in searchResults) {
    //         const specimen = searchResults[i];

    //         tableData.push({
    //             'index': i,
    //             'name': specimen['Specimen']['specimenName']['value'],
    //             'country': specimen['Location']['country']['value'],
    //             'specimen_type': specimen['Specimen']['type']['value'],
    //             'organisation': specimen['Organisation']['institutionID']['value']
    //         });
    //     }
    // }

    return (
        <Col className="annotate_resultsTable">
            <BootstrapTable
                keyField='id'
                data={tableData}
                columns={tableHeaders}
                // rowEvents={rowEvents}
                rowClasses='annotate_tableRow'
                headerClasses='annotate_tableHeader'
                bodyClasses='annotate_resultsTableContent'
                classes='annotate_table'
                striped={true}
            />
        </Col>
    );
}

export default AnnotationsTable;