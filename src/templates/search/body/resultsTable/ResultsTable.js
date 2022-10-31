import { useNavigate } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';


const ResultsTable = (props) => {
    let searchResults = props.searchResults;

    let navigate = useNavigate();

    function RedirectToSpecimenPage(index) {
        const specimen = searchResults[index];

        navigate(`/ds/${specimen['Meta']['id']['value']}`, {
            state: {
                specimen: specimen
            }
        });
    }

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
        text: 'Country',
        sort: true
    }, {
        dataField: 'specimen_type',
        text: 'Specimen Type',
        sort: true
    }, {
        dataField: 'organisation',
        text: 'Organisation',
        sort: true
    }];

    /* Set table data */
    let tableData = [];
    let rowEvents;

    if (!searchResults || searchResults['length'] === 0) {
        searchResults = [];

        tableData = [{
            'name': 'No specimens were found'
        }];
    } else {
        rowEvents = {
            onClick: (_e, row, _rowIndex) => {
                RedirectToSpecimenPage(row['index'])
            }
        };

        for (const i in searchResults) {
            const specimen = searchResults[i];

            tableData.push({
                'index': i,
                'name': specimen['Specimen']['specimenName']['value'],
                'country': specimen['Location']['country']['value'],
                'specimen_type': specimen['Specimen']['type']['value'],
                'organisation': specimen['Organisation']['institutionID']['value']
            });
        }
    }

    return (
        <div className="ps-4 h-100 overflow-auto">
            <BootstrapTable
                keyField='id'
                data={tableData}
                columns={tableHeaders}
                rowEvents={rowEvents}
                rowClasses='search_tableRow'
                headerClasses='search_tableHeader position-sticky bg-primary-light'
                bodyClasses='search_resultsTableContent'
                classes='search_table'
                striped={true}
            />
        </div>
    );
}

export default ResultsTable;