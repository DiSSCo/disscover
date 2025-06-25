/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';


/**
 * Config function that sets up the basic table column template for the search results table on the search page
 * @returns Table columns
 */
const IdentifiersTableConfig = () => {
    /* Property key value pair type */
    type IdentifierKeyValuePair = {
        key: string,
        value: string
    };

    /* Base variables */
    const columnHelper = createColumnHelper<IdentifierKeyValuePair>();

    /* Table columns */
    const columns = [
        columnHelper.accessor('key', {
            header: 'Identifier type',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('value', {
            header: 'Identifier value',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        })
    ];

    return { columns };
};

export default IdentifiersTableConfig;