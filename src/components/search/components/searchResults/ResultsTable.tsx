/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isEmpty, cloneDeep } from 'lodash';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getPhylopicBuild } from 'redux/general/GeneralSlice';
import {
    getSearchResults, getSearchSpecimen, setSearchSpecimen,
    getCompareMode, getCompareSpecimens, setCompareSpecimens
} from 'redux/search/SearchSlice';

/* Import Types */
import { DigitalSpecimen, Dict } from 'app/Types';

/* Import Config */
import SearchResultsTableConfig from 'app/config/tables/SearchResultsTableConfig';

/* Import Components */
import TopicDisciplineIcon from 'components/general/icons/TopicDisciplineIcon';
import DataTable from 'components/general/tables/DataTable';

/* Import API */
import GetPhylopicIcon from 'api/general/GetPhylopicIcon';


/* Props Styling */
interface Props {
    pageNumber: number,
    HideFilters: Function
};


const ResultsTable = (props: Props) => {
    const { pageNumber, HideFilters } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    /* Table configuration */
    const { columns } = SearchResultsTableConfig();

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
        DOI: string,
        accessionName: string | undefined,
        accessionId: string | undefined,
        scientificName: string | undefined,
        specimenType: string | undefined,
        origin: string | undefined,
        collected: string | undefined,
        holder: [string | undefined, string | undefined],
        topicDiscipline: string | undefined,
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

    /* Function to determine icon based upon taxonomy or topic discipline */
    const DetermineIcons = async (tableData: DataRow[], specimens: DigitalSpecimen[]) => {
        const copyTableData: DataRow[] = cloneDeep(tableData);
        const topicDisciplineWithoutTaxonomy: string[] = [
            'Anthropology', 'Other Geodiversity', 'Other Biodiversity', 'Ecology', 'Geology', 'Astrogeology', 'Unclassified'
        ]
        const renderedIcons: Dict = {};

        /* Function for checking if icon is in rendered icons */
        const CheckRenderedIcons = async (taxonomyIdentification: string, index: number) => {
            if (taxonomyIdentification in renderedIcons) {
                copyTableData[index].taxonomyIconUrl = renderedIcons[taxonomyIdentification];
            } else {
                await GetPhylopicIcon(phylopicBuild ?? '292', taxonomyIdentification).then((taxonomyIconUrl) => {
                    copyTableData[index].taxonomyIconUrl = taxonomyIconUrl ?? '';

                    /* Add to rendered icons */
                    renderedIcons[taxonomyIdentification] = taxonomyIconUrl;
                }).catch(error => {
                    console.warn(error);
                });
            }
        }

        for (let index = 0; index < tableData.length; index++) {
            const tableRecord = tableData[index];

            const specimen = specimens[index];

            /* If no filter for topic discipline is present, or topic discipline specimens do not own a taxonomy, always use the topic discipline icon */
            if (!searchParams.getAll('topicDiscipline').length || (tableRecord.topicDiscipline && topicDisciplineWithoutTaxonomy.includes(tableRecord.topicDiscipline))) {
                /* Add topic discipline icon to table record */
                copyTableData[index].taxonomyIconUrl = tableRecord.topicDiscipline ? TopicDisciplineIcon(tableRecord.topicDiscipline) : '';
            } else {
                /* Try to fetch a taxonomy based icon from Phylopic and add it to the table record */
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

                await CheckRenderedIcons(taxonomyIdentification, index);
            }
        }

        setTableData(copyTableData);;
    }

    /* OnChange of Specimen Search Results: update Table Data */
    useEffect(() => {
        /* Construct table data */
        const tableData: DataRow[] = [];

        const PushToTableData = (specimen: DigitalSpecimen, index: number) => {
            /* Determine Scientific Name */
            let scientificName: string = '';

            if (specimen.digitalSpecimen['dwc:identification']?.find((identification) => identification['dwc:identificationVerificationStatus'])) {
                scientificName = specimen.digitalSpecimen['dwc:identification']?.find((identification) => identification['dwc:identificationVerificationStatus'])?.taxonIdentifications?.[0]['dwc:scientificName'] ??
                    specimen.digitalSpecimen['dwc:identification']?.[0]?.taxonIdentifications?.[0]['dwc:scientificName'] ?? '';
            } else {
                scientificName = specimen.digitalSpecimen['dwc:identification']?.[0]?.taxonIdentifications?.[0]['dwc:scientificName'] ?? '';
            }

            /* Push record to table data */
            const tableRecord: DataRow = {
                index: index,
                DOI: specimen.digitalSpecimen['ods:id'],
                accessionName: specimen.digitalSpecimen['ods:specimenName'],
                accessionId: specimen.digitalSpecimen['ods:normalisedPhysicalSpecimenId'],
                scientificName: scientificName,
                specimenType: specimen.digitalSpecimen['ods:topicDiscipline'],
                origin: specimen.digitalSpecimen.occurrences?.[0]?.location?.['dwc:country'],
                collected: specimen.digitalSpecimen.occurrences?.[0]?.['dwc:eventDate'],
                holder: specimen.digitalSpecimen['dwc:institutionName'] ?
                    [specimen.digitalSpecimen['dwc:institutionName'], specimen.digitalSpecimen['dwc:institutionId']]
                    : [specimen.digitalSpecimen['dwc:institutionId'], specimen.digitalSpecimen['dwc:institutionId']],
                topicDiscipline: specimen.digitalSpecimen['ods:topicDiscipline'],
                taxonomyIconUrl: '',
                selected: false,
                compareSelected: !!compareSpecimens.find((compareSpecimen) => compareSpecimen.digitalSpecimen['ods:id'] === specimen.digitalSpecimen['ods:id'])
            };

            /* Push to table data */
            tableData.push(tableRecord);

            /* Return the record for the icon check */
            return tableRecord;
        }

        if (searchResults.length) {
            /* Loop over search results and push initial record to array */
            const specimens: DigitalSpecimen[] = [];

            for (let index = 0; index < searchResults.length; index++) {
                const specimen = searchResults[index];

                PushToTableData(specimen, index);
                specimens.push(specimen);
            }

            /* Shove initial records into the search table */
            setTableData(tableData);

            /* Determine the icons of the records */
            DetermineIcons(tableData, specimens);
        } else {
            setTableData(tableData);
        }
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