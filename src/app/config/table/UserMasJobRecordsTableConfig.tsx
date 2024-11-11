/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';

/* Import Utilities */
import { MakeJsonPathReadableString } from 'app/utilities/SchemaUtilities';


/**
 * Config function that sets up the basic table column template for the user MAS job records table on the profile page
 * @returns Table columns
 */
const UserMasJobRecordsTableConfig = () => {
    /* User annotation record type */
    type UserMasJobRecord = {
        targetId: string,
        scheduled: string,
        completed: string,
        state: string
    };

    /* Base variables */
    const columnHelper = createColumnHelper<UserMasJobRecord>();

    

    /* Table columns */
    const columns = [
        columnHelper.accessor('targetId', {
            header: 'Target ID',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('scheduled', {
            header: 'Scheduled',
            cell: (info) => format(info.getValue(), 'MMMM dd - yyyy'),
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('completed', {
            header: 'Completed',
            cell: (info) => format(info.getValue(), 'MMMM dd - yyyy'),
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('state', {
            header: 'State',
            meta: {
                widthInRem: 10,
                pinned: true
            }
        })
    ];

    return { columns };
};

export default UserMasJobRecordsTableConfig;