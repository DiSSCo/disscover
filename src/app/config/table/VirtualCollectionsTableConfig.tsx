/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';

/* Import Utilities */
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';


/**
 * Config function that sets up the basic table column template for the user annotation records table on the profile page
 * @returns Table columns
 */
const VirtualCollectionsTableConfig = () => {
    /* User annotation record type */
    type VirtualCollectionRecord = {
        collectionName: string,
        description: string,
        dateCreated: string,
        creator: string,
        type: string,
        identifier: string
    };

    /* Base variables */
    const columnHelper = createColumnHelper<VirtualCollectionRecord>();

    /* Table columns */
    const columns = [
        columnHelper.accessor('collectionName', {
            header: 'Name',
            cell: info => MakeJsonPathReadableString(info.getValue()),
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('description', {
            header: 'Description',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('dateCreated', {
            header: 'Date',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('creator', {
            header: 'Creator',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('type', {
            header: 'Type',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('identifier', {
            header: 'PID',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        })
    ];

    return { columns };
};

export default VirtualCollectionsTableConfig;