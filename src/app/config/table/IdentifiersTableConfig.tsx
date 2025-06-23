/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';

/* Import Utilities */
import { RetrieveEnvVariable } from 'app/Utilities';

/**
 * Config function that sets up the basic table column template for the search results table on the search page
 * @returns Table columns
 */
const IdentifiersTableConfig = () => {
    /* Search results type */
    type Identifiers = {
        DOI: string,
    };

    /* Base variables */
    const columnHelper = createColumnHelper<Identifiers>();

    /* Table columns */
    const columns = [
        columnHelper.accessor('DOI', {
            cell: info => info.getValue()?.replace(RetrieveEnvVariable('DOI_URL') as string, ''),
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
    ];

    return { columns };
};

export default IdentifiersTableConfig;