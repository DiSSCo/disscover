/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';


const SearchResultsTableConfig = () => {
    /* Type interface */
    interface SearchResult {
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
    const columnHelper = createColumnHelper<SearchResult>();

    const columns = [
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
                widthInRem: 14
            }
        }),
        columnHelper.accessor('specimenType', {
            header: 'Specimen Type',
            meta: {
                widthInRem: 10
            }
        }),
        columnHelper.accessor('origin', {
            header: 'Origin',
            meta: {
                widthInRem: 10
            }
        }),
        columnHelper.accessor('collected', {
            header: 'Collected',
            meta: {
                widthInRem: 10
            }
        }),
        columnHelper.accessor('holder', {
            header: 'Holder',
            meta: {
                widthInRem: 12
            }
        })
    ];

    /* Define pinned columns */
    const pinnedColumns = ['DOI', 'accessionName'];

    return { columns, pinnedColumns };
}

export default SearchResultsTableConfig;