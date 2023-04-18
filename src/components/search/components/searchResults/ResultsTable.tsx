/* Import Dependencies */
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import DataTable, { TableColumn } from 'react-data-table-component';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSearchResults, getSearchSpecimen, setSearchSpecimen } from "redux/search/SearchSlice";

/* Import Types */
import { Specimen } from 'global/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


/* Props Styling */
interface Props {
    pageNumber: number
};


const ResultsTable = (props: Props) => {
    const { pageNumber } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const searchResults = useAppSelector(getSearchResults);
    const searchSpecimen = useAppSelector(getSearchSpecimen);
    const [tableData, setTableData] = useState<DataRow[]>([]);

    interface DataRow {
        index: number,
        id: string,
        specimen_name: string,
        country: string,
        specimen_type: string,
        organisation: string,
        toggleSelected: boolean
    };

    /* Function for when clicked on a table row, continue to specimen page */
    const OnSpecimenSelect = (row: DataRow) => {
        /* Set specimen */
        const specimen: Specimen = searchResults[row.index];

        dispatch(setSearchSpecimen(specimen));

        /* Unselect current Row */
        const unselectedRow = tableData.find((tableRow) => (tableRow.toggleSelected && tableRow.id !== specimen.id));

        if (unselectedRow) {
            unselectedRow.toggleSelected = false;
        }

        /* Select chosen Table Row */
        const selectedRow = tableData.find((tableRow) => tableRow.id === specimen.id);

        if (selectedRow) {
            selectedRow.toggleSelected = true;
        }

        const copyTableData = [...tableData];

        setTableData(copyTableData);
    }

    /* Function to reset chosen Table Row on close */
    useEffect(() => {
        if (isEmpty(searchSpecimen)) {
            /* Unselect current Row */
            const currentRow = tableData.find((tableRow) => tableRow.toggleSelected);

            if (currentRow) {
                currentRow.toggleSelected = false;
            }
        }

        const copyTableData = [...tableData];

        setTableData(copyTableData);
    }, [searchSpecimen, pageNumber]);

    /* Function to check if selected Specimen is still selected after page change */
    useEffect(() => {
        if (!isEmpty(searchSpecimen)) {
            if (!tableData.find((tableRow) => (tableRow.toggleSelected && tableRow.id === searchSpecimen.id))) {
                const currentRow = tableData.find((tableRow) => tableRow.id === searchSpecimen.id);

                if (currentRow) {
                    currentRow.toggleSelected = true;

                    const copyTableData = [...tableData];

                    setTableData(copyTableData);
                }
            }
        }
    }, [tableData]);

    /* Set Datatable columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Specimen name',
        selector: row => row.specimen_name,
        id: 'search_name',
        sortable: true
    }, {
        name: 'Country',
        selector: row => row.country,
        id: 'search_country',
        sortable: true
    }, {
        name: 'Specimen type',
        selector: row => row.specimen_type,
        id: 'search_type',
        sortable: true
    }, {
        name: 'Organisation',
        selector: row => row.organisation,
        id: 'search_organisation',
        sortable: true
    }];

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

    const conditionalRowStyles = [{
        when: (row: any) => row.toggleSelected,
        style: {
            backgroundColor: "#98cdbf",
            userSelect: "none"
        }
    }];

    /* OnChange of Specimen Search Results: update Table Data */
    useEffect(() => {
        const tableData: DataRow[] = [];

        searchResults.forEach((specimen, i) => {
            tableData.push({
                index: i,
                id: specimen.id,
                specimen_name: specimen.specimenName,
                country: specimen.data['dwc:country'] ? specimen.data['dwc:country'] : '-',
                specimen_type: specimen.type,
                organisation: specimen.organisationId,
                toggleSelected: false
            });
        });

        setTableData(tableData);
    }, [searchResults]);

    return (
        <>
            {!isEmpty(searchSpecimen) &&
                <button type="button" className={`${styles.returnButton} position-absolute px-3 pt-0`}
                    onClick={() => dispatch(setSearchSpecimen({} as Specimen))}
                >
                    <FontAwesomeIcon icon={faChevronLeft} /> Return
                </button>
            }

            <div className={`${styles.table} h-100 overflow-auto position-relative`}>
                <DataTable
                    columns={tableColumns}
                    data={tableData}
                    customStyles={customStyles}
                    onRowClicked={(row) => OnSpecimenSelect(row)}
                    conditionalRowStyles={conditionalRowStyles}

                    striped
                    highlightOnHover
                    pointerOnHover
                />
            </div>
        </>
    );
}

export default ResultsTable;