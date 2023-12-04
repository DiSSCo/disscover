/* Import Dependencies */
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import DataTable, { TableColumn } from 'react-data-table-component';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
    getSearchResults, getSearchSpecimen, setSearchSpecimen,
    getCompareMode, getCompareSpecimens, setCompareSpecimens
} from 'redux/search/SearchSlice';

/* Import Types */
import { DigitalSpecimen } from 'app/Types';

/* Import Components */
import ColumnLink from './ColumnLink';
import ScientificName from 'components/general/nomenclatural/ScientificName';


/* Props Styling */
interface Props {
    pageNumber: number,
    HideFilters: Function
};


const ResultsTable = (props: Props) => {
    const { pageNumber, HideFilters } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const searchResults = useAppSelector(getSearchResults);
    const searchSpecimen = useAppSelector(getSearchSpecimen);
    const [tableData, setTableData] = useState<DataRow[]>([]);
    const compareMode = useAppSelector(getCompareMode);
    const compareSpecimens = useAppSelector(getCompareSpecimens);

    /* Declare type of a table row */
    interface DataRow {
        index: number,
        id: string,
        specimen_name: string,
        country: string,
        specimen_type: string,
        organisation: string,
        organisationId: string,
        toggleSelected: boolean,
        compareSelected: boolean
    };

    /* Function for when clicked on a table row, continue to specimen page */
    const OnSpecimenSelect = (row: DataRow) => {
        /* Set specimen */
        const specimen: DigitalSpecimen = searchResults[row.index];

        dispatch(setSearchSpecimen(specimen));

        /* Unselect current Row */
        const unselectedRow = tableData.find((tableRow) => (tableRow.toggleSelected && tableRow.id !== specimen.digitalSpecimen['ods:id']));

        if (unselectedRow) {
            unselectedRow.toggleSelected = false;
        }

        /* Select chosen Table Row */
        const selectedRow = tableData.find((tableRow) => tableRow.id === specimen.digitalSpecimen['ods:id']);

        if (selectedRow) {
            selectedRow.toggleSelected = true;
        }

        const copyTableData = [...tableData];

        setTableData(copyTableData);

        /* Hide Filters */
        HideFilters();
    }

    /* Function for selecting a specimen for comparison */
    const SelectForComparison = (row: DataRow) => {
        /* Update table data and Compare Specimens array*/
        const selectedRow = tableData.find((tableRow) => tableRow.id === row.id);
        const copyCompareSpecimens = [...compareSpecimens];

        /* If deselected, remove from array */
        if (selectedRow) {
            if (row.compareSelected === true) {
                selectedRow.compareSelected = false;

                const compareSpecimenIndex = compareSpecimens.findIndex((specimen) => specimen.digitalSpecimen['ods:id'] === row.id);
                copyCompareSpecimens.splice(compareSpecimenIndex, 1);
            } else if (compareSpecimens.length < 3) {
                selectedRow.compareSelected = true;

                copyCompareSpecimens.push(searchResults[row.index]);
            }
        }

        dispatch(setCompareSpecimens(copyCompareSpecimens));
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
            if (!tableData.find((tableRow) => (tableRow.toggleSelected && tableRow.id === searchSpecimen.digitalSpecimen['ods:id']))) {
                const currentRow = tableData.find((tableRow) => tableRow.id === searchSpecimen.digitalSpecimen['ods:id']);

                if (currentRow) {
                    currentRow.toggleSelected = true;

                    const copyTableData = [...tableData];

                    setTableData(copyTableData);
                }
            }
        }
    }, [tableData]);

    /* Set Datatable columns */
    const SelectAction = (row: DataRow) => {
        if (compareMode) {
            SelectForComparison(row);
        } else {
            OnSpecimenSelect(row);
        }
    }

    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Specimen name',
        selector: row => row.specimen_name,
        id: 'search_name',
        cell: row => <div onClick={() => SelectAction(row)}
            onKeyDown={() => SelectAction(row)}
        >
            <ScientificName specimenName={searchResults[row.index]['digitalSpecimen']['ods:specimenName'] ?? ''} />
        </div>,
        sortable: true
    }, {
        name: 'Country',
        selector: row => row.country,
        id: 'search_country',
        sortable: true
    }, {
        name: 'Specimen type',
        selector: row => row.specimen_type,
        id: 'search_specimen_type',
        sortable: true
    }, {
        name: 'Organisation',
        selector: row => row.organisation,
        id: 'search_organisation',
        cell: row => <ColumnLink link={row.organisationId} text={row.organisation} />,
        ignoreRowClick: true,
        style: {
            color: "#28bacb"
        },
        sortable: true
    }];

    if (compareMode) {
        tableColumns.unshift({
            selector: row => row.id,
            id: 'search_compareCheckbox',
            cell: row => <input type="checkbox" checked={row.compareSelected} onChange={() => SelectForComparison(row)} />,
            width: '40px',
            ignoreRowClick: true
        });
    }

    /* Custom styles for Data Table */
    const customStyles = {
        table: {
            style: {
                height: '100%'
            }
        },
        tableWrapper : {
            style: {
                height: '100%',
                backgroundColor: 'white'
            }
        },
        responsiveWrapper: {
            style: {
                height: '100%'
            }
        },
        head: {
            style: {
                color: 'white',
                fontSize: '0.875rem !important'
            }
        },
        headRow: {
            style: {
                backgroundColor: '#51a993'
            }
        },
        rows: {
            style: {
                minHeight: '40px',
                fontSize: '0.875rem !important'
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
            backgroundColor: '#98cdbf',
            userSelect: 'none'
        }
    }];

    /* OnChange of Specimen Search Results: update Table Data */
    useEffect(() => {
        const tableData: DataRow[] = [];

        searchResults.forEach((specimen, i) => {
            tableData.push({
                index: i,
                id: specimen.digitalSpecimen['ods:id'],
                specimen_name: specimen.digitalSpecimen['ods:specimenName'] ?? '',
                country: specimen.digitalSpecimen.occurrences?.[0]?.location?.['dwc:country'] ?? '-',
                specimen_type: specimen.digitalSpecimen['ods:topicDiscipline'] as string ?? '',
                organisation: specimen.digitalSpecimen['dwc:institutionName'] ?? specimen.digitalSpecimen['dwc:institutionId'] ?? '',
                organisationId: specimen.digitalSpecimen['dwc:institutionId'] ?? '',
                toggleSelected: false,
                compareSelected: !!compareSpecimens.find((compareSpecimen) => compareSpecimen.digitalSpecimen['ods:id'] === specimen.digitalSpecimen['ods:id'])
            });
        });

        setTableData(tableData);
    }, [searchResults, compareSpecimens]);

    return (
        <div className="h-100 overflow-auto position-relative b-secondary rounded-c">
            <DataTable
                columns={tableColumns}
                data={tableData}
                className='h-100'
                customStyles={customStyles}
                onRowClicked={(row) => {
                    if (compareMode) {
                        SelectForComparison(row);
                    } else {
                        OnSpecimenSelect(row);
                    }
                }}
                conditionalRowStyles={conditionalRowStyles}

                striped
                highlightOnHover
                pointerOnHover
            />
        </div>
    );
}

export default ResultsTable;