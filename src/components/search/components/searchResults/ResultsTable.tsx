/* Import Dependencies */
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getPhylopicBuild } from 'redux/general/GeneralSlice';
import {
    getSearchResults, getSearchSpecimen, setSearchSpecimen,
    getCompareMode, getCompareSpecimens, setCompareSpecimens
} from 'redux/search/SearchSlice';

/* Import Types */
import { DigitalSpecimen, Dict } from 'app/Types';

/* Import Utilities */
import SearchResultsTableConfig from 'app/tableConfig/SearchResultsTableConfig';

/* Import Webroot */
import Spinner from 'webroot/icons/spinner.svg';

/* Import Components */
import TopicDisciplineIcon from 'components/general/icons/TopicDisciplineIcon';
import DataTable from 'components/general/tables/DataTable';

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

    /* Table configuration */
    const { columns } = SearchResultsTableConfig();

    /* Base variables */
    const searchResults = useAppSelector(getSearchResults);
    const searchSpecimen = useAppSelector(getSearchSpecimen);
    const compareMode = useAppSelector(getCompareMode);
    const compareSpecimens = useAppSelector(getCompareSpecimens);
    const phylopicBuild = useAppSelector(getPhylopicBuild);
    const [tableData, setTableData] = useState<DataRow[]>([]);
    const staticTopicDisciplines = ['Anthropology', 'Astrogeology', 'Geology', 'Ecology', 'Other Biodiversity', 'Other Geodiversity', 'Unclassified'];

    /* Declare type of a table row */
    interface DataRow {
        index: number,
        DOI: string,
        accessionName: string,
        accessionId: string,
        scientificName: string,
        specimenType: string,
        origin: string,
        collected: string,
        holder: string,
        taxonomyIconUrl: string | undefined,
        selected: boolean,
        compareSelected: boolean
    };

    /* Function for when clicked on a table row, continue to specimen page */
    const OnSpecimenSelect = (row: DataRow) => {
        /* Set specimen */
        const specimen: DigitalSpecimen = searchResults[row.index];

        dispatch(setSearchSpecimen(specimen));

        /* Unselect current Row */
        const unselectedRow = tableData.find((tableRow) => (tableRow.selected && tableRow.DOI !== specimen.digitalSpecimen['ods:id']));

        if (unselectedRow) {
            unselectedRow.selected = false;
        }

        /* Select chosen Table Row */
        const selectedRow = tableData.find((tableRow) => tableRow.DOI === specimen.digitalSpecimen['ods:id']);

        if (selectedRow) {
            selectedRow.selected = true;
        }

        const copyTableData = [...tableData];

        setTableData(copyTableData);

        /* Hide Filters */
        HideFilters();
    }

    /* Function for selecting a specimen for comparison */
    const SelectForComparison = (row: DataRow) => {
        /* Update table data and Compare Specimens array*/
        const selectedRow = tableData.find((tableRow) => tableRow.DOI === row.DOI);
        const copyCompareSpecimens = [...compareSpecimens];

        /* If deselected, remove from array */
        if (selectedRow) {
            if (row.compareSelected === true) {
                selectedRow.compareSelected = false;

                const compareSpecimenIndex = compareSpecimens.findIndex((specimen) => specimen.digitalSpecimen['ods:id'] === row.DOI);
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
            const currentRow = tableData.find((tableRow) => tableRow.selected);

            if (currentRow) {
                currentRow.selected = false;
            }
        }

        const copyTableData = [...tableData];

        setTableData(copyTableData);
    }, [searchSpecimen, pageNumber]);

    /* Function to check if selected Specimen is still selected after page change */
    useEffect(() => {
        if (!isEmpty(searchSpecimen)) {
            if (!tableData.find((tableRow) => (tableRow.selected && tableRow.DOI === searchSpecimen.digitalSpecimen['ods:id']))) {
                const currentRow = tableData.find((tableRow) => tableRow.DOI === searchSpecimen.digitalSpecimen['ods:id']);

                if (currentRow) {
                    currentRow.selected = true;

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

    const LoopSearchResults = async (PushToTableData: Function, SetTableData: Function) => {
        const renderedIcons: Dict = {};

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
                PushToTableData(specimen, index, renderedIcons[taxonomyIdentification], true);

                SetTableData(index);
            } else if (taxonomyIdentification && (specimen.digitalSpecimen['ods:topicDiscipline'] && !(staticTopicDisciplines.includes(specimen.digitalSpecimen['ods:topicDiscipline'])))) {
                /* Preset table data with loading icon */
                PushToTableData(specimen, index, Spinner);

                GetPhylopicIcon(phylopicBuild ?? '292', taxonomyIdentification).then((taxonomyIconUrl) => {
                    PushToTableData(specimen, index, taxonomyIconUrl, true);

                    /* Add to rendered icons */
                    renderedIcons[taxonomyIdentification] = taxonomyIconUrl;

                    SetTableData(index);
                }).catch(error => {
                    console.warn(error);

                    PushToTableData(specimen, index, undefined, true);

                    SetTableData(index);
                });
            } else {
                /* Use topic discipline icon */
                PushToTableData(specimen, index, undefined);

                SetTableData(index);
            }
        };
    }

    /* OnChange of Specimen Search Results: update Table Data */
    useEffect(() => {
        /* Construct table data */
        const tableData: DataRow[] = [];

        const PushToTableData = (specimen: DigitalSpecimen, index: number, taxonomyIconUrl?: string, taxonomyIncluded: boolean = false) => {
            /* Check if index exists in table data */
            if (tableData.find(record => record.index === index)) {
                /* Replace record in table data */
                tableData[index].taxonomyIconUrl = taxonomyIncluded ? taxonomyIconUrl : TopicDisciplineIcon(specimen.digitalSpecimen['ods:topicDiscipline'])
            } else {
                /* Push record to table data */
                tableData.push({
                    index: index,
                    DOI: specimen.digitalSpecimen['ods:id'],
                    accessionName: specimen.digitalSpecimen['ods:specimenName'] ?? '',
                    accessionId: specimen.digitalSpecimen['ods:normalisedPhysicalSpecimenId'] ?? '',
                    scientificName: specimen.digitalSpecimen['dwc:identification']?.find((identification) => identification['dwc:identificationVerificationStatus'])?.taxonIdentifications?.[0]['dwc:scientificName'] ?? '',
                    specimenType: specimen.digitalSpecimen['ods:topicDiscipline'] ?? 'Unclassified',
                    origin: specimen.digitalSpecimen.occurrences?.[0]?.location?.['dwc:country'] ?? '',
                    collected: specimen.digitalSpecimen.occurrences?.[0]?.['dwc:eventDate'] ?? '',
                    holder: specimen.digitalSpecimen['dwc:institutionName'] ?? (specimen.digitalSpecimen['dwc:institutionId'] ?? ''),
                    taxonomyIconUrl: taxonomyIncluded ? taxonomyIconUrl : TopicDisciplineIcon(specimen.digitalSpecimen['ods:topicDiscipline']),
                    selected: false,
                    compareSelected: !!compareSpecimens.find((compareSpecimen) => compareSpecimen.digitalSpecimen['ods:id'] === specimen.digitalSpecimen['ods:id'])
                });
            }
        }

        const SetTableData = (index: number) => {
            if ((index + 1) >= pageSize) {
                setTableData(tableData);
            }
        }

        LoopSearchResults(PushToTableData, SetTableData);
    }, [searchResults, compareSpecimens]);

    return (
        <div className="h-100 position-relative b-secondary rounded-c">
            <DataTable columns={columns}
                data={tableData}
                SelectAction={(row: DataRow) => SelectAction(row)}
            />
        </div>
    );
}

export default ResultsTable;