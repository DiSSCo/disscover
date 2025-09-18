/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';

/**
 * Config function that sets up the basic table column template for the user annotation records table on the profile page
 * @returns Table columns
 */
const VirtualCollectionsTableConfig = () => {
    /* User annotation record type */
    type VirtualCollectionRecord = {
        collectionName: string,
        dateCreated: string,
        creator: string,
        type: string,
        identifier: string
    };

    /* Base variables */
    const columnHelper = createColumnHelper<VirtualCollectionRecord>();
    const columnsContent = [
        { columnValue: 'collectionName', columnHeader: 'Name' },
        { columnValue: 'dateCreated', columnHeader: 'Date' },
        { columnValue: 'creator', columnHeader: 'Creator' },
        { columnValue: 'type', columnHeader: 'Type' },
        { columnValue: 'identifier', columnHeader: 'PID' }
    ]

    /* Table columns */
    const columns = columnsContent.map((item) => columnHelper.accessor(item.columnValue as keyof VirtualCollectionRecord, {
        header: item.columnHeader,
        meta: {
            widthInRem: 10,
            pinned: true
        }
    }));

    return { columns };
};

export default VirtualCollectionsTableConfig;