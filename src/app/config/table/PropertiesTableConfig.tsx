/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';


/**
 * Config function that sets up the basic table column template for the search results table on the search page
 * @returns Table columns
 */
const PropertiesTableConfig = () => {
    /* Property key value pair type */
    type PropertyKeyValuePair = {
        key: string,
        value: string | number | boolean
    };

    /* Base variables */
    const columnHelper = createColumnHelper<PropertyKeyValuePair>();

    /* Table columns */
    const columns = [
        columnHelper.accessor('key', {
            header: 'Property',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('value', {
            header: 'Value',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        })
    ];

    return { columns };
};

export default PropertiesTableConfig;