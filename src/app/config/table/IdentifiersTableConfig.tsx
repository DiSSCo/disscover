/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';

/**
 * Config function that sets up the basic table column template for the identifiers tab on the Digital Specimen page
 * @returns Table columns
 */
const IdentifiersTableConfig = () => {
    /* Identifier key value pair type */
    type IdentifierKeyValuePair = {
        key: string | undefined,
        value: string | undefined
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