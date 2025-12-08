/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';

/**
 * Config function that sets up the basic table column template for the virtual collection details table
 * @returns Table columns
 */
const VirtualCollectionDetailsTableConfig = () => {
    /* Virtual collection item type */
    type VirtualCollectionItemRecord = {
        name: string,
        doi: string,
        country: string,
        dateCreated: string,
    };

    /* Base variables */
    const columnHelper = createColumnHelper<VirtualCollectionItemRecord>();
    const columnsContent = [
        { columnValue: 'name', columnHeader: 'Name' },
        { columnValue: 'doi', columnHeader: 'DOI' },
        { columnValue: 'country', columnHeader: 'Country' },
        { columnValue: 'dateCreated', columnHeader: 'Date' },
    ]

    /* Table columns */
    const columns = columnsContent.map((item) => columnHelper.accessor(item.columnValue as keyof VirtualCollectionItemRecord, {
        header: item.columnHeader,
        meta: {
            widthInRem: 10,
            pinned: true
        }
    }));

    return { columns };
};

export default VirtualCollectionDetailsTableConfig;