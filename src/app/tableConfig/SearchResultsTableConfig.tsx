/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getCompareMode } from 'redux/search/SearchSlice';


const SearchResultsTableConfig = () => {
    /* Type interface */
    interface SearchResult {
        compareSelected: boolean,
        DOI: string,
        taxonomyIconUrl: string,
        accessionName: string,
        accessionId: string,
        scientificName: string,
        specimenType: string,
        origin: string,
        collected: string,
        holder: string
    };

    /* Base variables */
    const compareMode = useAppSelector(getCompareMode);
    const columnHelper = createColumnHelper<SearchResult>();

    const columns = [
        ...(compareMode ? [columnHelper.accessor('compareSelected', {
            header: '',
            cell: info => <input type="checkbox" defaultChecked={info.getValue()} />,
            meta: {
                widthInRem: 3,
                pinned: true
            }
        })] : []),
        columnHelper.accessor('taxonomyIconUrl', {
            header: '',
            cell: info => <img src={info.getValue()}
                alt={info.getValue()}
                className="w-100"
            />,
            meta: {
                widthInRem: 4,
                pinned: true
            }
        }),
        columnHelper.accessor('DOI', {
            cell: info => info.getValue().replace(process.env.REACT_APP_DOI_URL as string, ''),
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('accessionName', {
            header: 'Accession Name',
            meta: {
                widthInRem: 14,
                pinned: true
            }
        }),
        columnHelper.accessor('accessionId', {
            header: 'Accession ID',
            meta: {
                widthInRem: 14
            }
        }),
        columnHelper.accessor('scientificName', {
            header: 'Scientific Name',
            meta: {
                widthInRem: 14,
                sortable: true
            }
        }),
        columnHelper.accessor('specimenType', {
            header: 'Specimen Type',
            meta: {
                widthInRem: 10,
                sortable: true
            }
        }),
        columnHelper.accessor('origin', {
            header: 'Origin',
            meta: {
                widthInRem: 10,
                sortable: true
            }
        }),
        columnHelper.accessor('collected', {
            header: 'Collected',
            meta: {
                widthInRem: 10,
                sortable: true
            }
        }),
        columnHelper.accessor('holder', {
            header: 'Holder',
            meta: {
                widthInRem: 12,
                sortable: true
            }
        })
    ];

    return { columns };
}

export default SearchResultsTableConfig;