/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/* Import Hooks */
import { useAppSelector } from 'app/Hooks';

/* Import Store */
import { getCompareDigitalSpecimen } from 'redux-store/SearchSlice';


/**
 * Config function that sets up the basic table column template for the search results table on the search page
 * @returns Table columns
 */
const SearchResultsTableConfig = () => {
    /* Search results type */
    type SearchResult = {
        selected: boolean,
        DOI: string,
        specimenName: string,
        physicalSpecimenID: string,
        topicDiscipline: string,
        countryOfOrigin: string,
        dateCollected: string,
        organisation: [string, string]
    };

    /* Base variables */
    const compareDigitalSpecimen = useAppSelector(getCompareDigitalSpecimen);
    const columnHelper = createColumnHelper<SearchResult>();

    /* Table columns */
    const columns = [
        ...(compareDigitalSpecimen ? [columnHelper.accessor('selected', {
            header: '',
            cell: info => <input type="checkbox" defaultChecked={info.getValue()} />,
            meta: {
                widthInRem: 3,
                pinned: true
            }
        })] : []),
        columnHelper.accessor('DOI', {
            cell: info => info.getValue()?.replace(RetrieveEnvVariable('DOI_URL') as string, ''),
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('specimenName', {
            header: 'Specimen Name',
            cell: info => <span dangerouslySetInnerHTML={{__html: info.getValue()}} />,
            meta: {
                widthInRem: 14,
                pinned: true
            }
        }),
        columnHelper.accessor('physicalSpecimenID', {
            header: 'Physical Specimen ID',
            meta: {
                widthInRem: 14
            }
        }),
        columnHelper.accessor('topicDiscipline', {
            header: 'Topic Discipline',
            meta: {
                widthInRem: 10,
                sortable: true
            }
        }),
        columnHelper.accessor('countryOfOrigin', {
            header: 'Country of Origin',
            meta: {
                widthInRem: 10,
                sortable: true
            }
        }),
        columnHelper.accessor('dateCollected', {
            header: 'Date Collected',
            meta: {
                widthInRem: 10,
                sortable: true
            }
        }),
        columnHelper.accessor('organisation', {
            header: 'Organisation',
            cell: info => <a href={info.getValue()[1]}
                target="_blank" rel="noreferer"
                className="c-accent h-underline"
            >
                {info.getValue()?.[0]}
            </a>,
            meta: {
                widthInRem: 12,
                link: true,
                sortable: true
            }
        })
    ];

    return { columns };
};

export default SearchResultsTableConfig;