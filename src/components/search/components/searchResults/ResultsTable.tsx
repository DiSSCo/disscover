/* Import Dependencies */
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import DataTable, { TableColumn } from 'react-data-table-component';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getPhylopicBuild } from 'redux/general/GeneralSlice';
import {
    getSearchResults, getSearchSpecimen, setSearchSpecimen,
    getCompareMode, getCompareSpecimens, setCompareSpecimens
} from 'redux/search/SearchSlice';

/* Import Types */
import { DigitalSpecimen, Dict } from 'app/Types';

/* Import Styles */
import styles from 'components/search/search.module.scss';

/* Import Webroot */
import Spinner from 'webroot/icons/spinner.svg';

/* Import Components */
import ColumnLink from './ColumnLink';
import ScientificName from 'components/general/nomenclatural/ScientificName';
import TopicDisciplineIcon from 'components/general/icons/TopicDisciplineIcon';

/* Import API */
import GetPhylopicIcon from 'api/general/GetPhylopicIcon';


/* Props Styling */
interface Props {
    pageNumber: number,
    pageSize: number,
    HideFilters: Function
};


const ResultsTable = (props: Props) => {
    const { pageNumber, pageSize, HideFilters } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const searchResults = useAppSelector(getSearchResults);
    const searchSpecimen = useAppSelector(getSearchSpecimen);
    const compareMode = useAppSelector(getCompareMode);
    const compareSpecimens = useAppSelector(getCompareSpecimens);
    const phylopicBuild = useAppSelector(getPhylopicBuild);
    const [tableData, setTableData] = useState<DataRow[]>([]);

    /* Declare type of a table row */
    interface DataRow {
        index: number,
        id: string,
        taxonomyIconUrl: string,
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
        name: 'Icon',
        selector: row => row.taxonomyIconUrl,
        id: 'search_taxonomyIcon',
        cell: row => <img src={row.taxonomyIconUrl} alt={row.taxonomyIconUrl} className={styles.taxonomyIcon} />,
        maxWidth: '50px'
    }, {
        name: 'Specimen name',
        selector: row => row.specimen_name,
        id: 'search_name',
        cell: row => <div onClick={() => SelectAction(row)}
            onKeyDown={() => SelectAction(row)}
        >
            <ScientificName specimenName={searchResults[row?.index]['digitalSpecimen']['ods:specimenName'] ?? ''} />
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
        tableWrapper: {
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
        /* Construct table data */
        const tableData: DataRow[] = [];
        const renderedIcons: Dict = {};

        const PushToTableData = (specimen: DigitalSpecimen, index: number, taxonomyIconUrl?: string) => {
            /* Check if index exists in table data */
            if (tableData.find(record => record.index === index)) {
                /* Replace record in table data */
                tableData[index].taxonomyIconUrl = taxonomyIconUrl ? taxonomyIconUrl : TopicDisciplineIcon(specimen.digitalSpecimen['ods:topicDiscipline'])
            } else {
                /* Push record to table data */
                tableData.push({
                    index: index,
                    id: specimen.digitalSpecimen['ods:id'],
                    taxonomyIconUrl: taxonomyIconUrl ? taxonomyIconUrl : TopicDisciplineIcon(specimen.digitalSpecimen['ods:topicDiscipline']),
                    specimen_name: specimen.digitalSpecimen['ods:specimenName'] ?? '',
                    country: specimen.digitalSpecimen.occurrences?.[0]?.location?.['dwc:country'] ?? '-',
                    specimen_type: specimen.digitalSpecimen['ods:topicDiscipline'] as string ?? '',
                    organisation: specimen.digitalSpecimen['dwc:institutionName'] ?? specimen.digitalSpecimen['dwc:institutionId'] ?? '',
                    organisationId: specimen.digitalSpecimen['dwc:institutionId'] ?? '',
                    toggleSelected: false,
                    compareSelected: !!compareSpecimens.find((compareSpecimen) => compareSpecimen.digitalSpecimen['ods:id'] === specimen.digitalSpecimen['ods:id'])
                });
            }
        }

        const SetTableData = (index: number) => {
            if ((index + 1) >= pageSize) {
                setTableData(tableData);
            }
        }

        const LoopSearchResults = async () => {
            for (let index = 0; index < searchResults.length; index++) {
                const specimen = searchResults[index];

                /* Try to fetch Taxonomy icon if not fetched yet, otherwise attach topic discipline icon */
                const acceptedIdentification = specimen.digitalSpecimen?.['dwc:identification']?.find((identification) =>
                    identification['dwc:identificationVerificationStatus']
                );
                let taxonomyIdentification: string = '';

                if (acceptedIdentification?.taxonIdentifications?.[0]['dwc:order']) {
                    /* Search icon by order */
                    taxonomyIdentification = acceptedIdentification.taxonIdentifications[0]['dwc:order'];
                } else if (acceptedIdentification?.taxonIdentifications?.[0]['dwc:family']) {
                    /* Search icon by family */
                    taxonomyIdentification = acceptedIdentification?.taxonIdentifications[0]['dwc:family'];
                } else if (acceptedIdentification?.taxonIdentifications?.[0]['dwc:genus']) {
                    /* Search icon by genus */
                    taxonomyIdentification = acceptedIdentification?.taxonIdentifications[0]['dwc:genus'];
                } else if (specimen.digitalSpecimen['ods:specimenName']) {
                    taxonomyIdentification = specimen.digitalSpecimen['ods:specimenName'].split(' ')[0];
                }

                if (taxonomyIdentification && taxonomyIdentification in renderedIcons) {
                    PushToTableData(specimen, index, renderedIcons[taxonomyIdentification]);

                    SetTableData(index);
                } else if (taxonomyIdentification) {
                    /* Preset table data with loading icon */
                    PushToTableData(specimen, index, Spinner)

                    GetPhylopicIcon(phylopicBuild ?? '292', taxonomyIdentification).then((taxonomyIconUrl) => {
                        PushToTableData(specimen, index, taxonomyIconUrl);

                        /* Add to rendered icons */
                        renderedIcons[taxonomyIdentification as string] = taxonomyIconUrl;

                        setTableData(tableData);
                    }).catch(error => {
                        console.warn(error);

                        PushToTableData(specimen, index);

                        SetTableData(index);
                    });
                } else {
                    /* Use topic discipline icon */
                    PushToTableData(specimen, index);

                    SetTableData(index);
                }
            };
        }

        /* First loop search results without icons (due to loading) */
        LoopSearchResults();
    }, [searchResults, compareSpecimens]);

    return (
        <div className="h-100 position-relative b-secondary rounded-c">
            <DataTable
                columns={tableColumns}
                data={tableData}
                className='h-100 overflow-y-scroll z-1'
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