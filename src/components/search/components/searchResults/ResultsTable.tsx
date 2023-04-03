/* Import Dependencies */
import { useNavigate } from 'react-router-dom';
import DataTable, { TableColumn } from 'react-data-table-component';

/* Import Types */
import { Specimen } from 'global/Types';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSpecimenSearchResults } from "redux/search/SearchSlice";
import { setSpecimen } from 'redux/specimen/SpecimenSlice';


const ResultsTable = () => {
    /* Configure Store */
    const dispatch = useAppDispatch();

    /* Hooks */
    let navigate = useNavigate();

    /* Base variables */
    const specimenSearchResults = useAppSelector(getSpecimenSearchResults);

    interface DataRow {
        index: number,
        id: string,
        specimen_name: string,
        country: string,
        specimen_type: string,
        organisation: string
    };

    /* Function for when clicked on a table row, continue to specimen page */
    const OnSpecimenSelect = (row: DataRow) => {
        /* Set specimen */
        const specimen: Specimen = specimenSearchResults[row.index];

        dispatch(setSpecimen(specimen));

        /* Navigate to specimen page, row.id equals specimen identifier */
        navigate(`/ds/${row.id}`);
    }

    /* Set Datatable columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Specimen name',
        selector: row => row.specimen_name,
        sortable: true
    }, {
        name: 'Country',
        selector: row => row.country,
        sortable: true
    }, {
        name: 'Specimen type',
        selector: row => row.specimen_type,
        sortable: true
    }, {
        name: 'organisation',
        selector: row => row.organisation,
        sortable: true
    }];

    /* Set table data */
    const tableData: DataRow[] = [];

    specimenSearchResults.forEach((specimen, i) => {
        tableData.push({
            index: i,
            id: specimen.id,
            specimen_name: specimen.specimenName,
            country: 'Country',
            specimen_type: specimen.type,
            organisation: specimen.organisationId
        });
    });

    return (
        <div className="ps-4 h-100 overflow-auto">
            <DataTable
                columns={tableColumns}
                data={tableData}
                onRowClicked={(row) => OnSpecimenSelect(row)}

                striped
                highlightOnHover
                pointerOnHover
            />
        </div>
    );
}

export default ResultsTable;