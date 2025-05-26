/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';

/**
 * Function to help deal with the date as a string or undefined
 * @param date The time data either a string or undefined
 * @returns Either an empty string or the formatted date
 */
function formatDate(date: string | undefined) {
    return date === undefined ? '' : format(date, 'MMMM dd - yyyy');
}

/**
 * Config function that sets up the basic table column template for the user MAS job records table on the profile page
 * @returns Table columns
 */
const UserMasJobRecordsTableConfig = () => {
    /* User annotation record type */
    type UserMasJobRecord = {
        targetId: string,
        scheduled: string,
        completed?: string | undefined,
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
            cell: (info) => formatDate(info.getValue()),
            meta: {
                widthInRem: 10,
                pinned: true
            }
        }),
        columnHelper.accessor('completed', {
            header: 'Completed',
            cell: (info) => formatDate(info.getValue()),
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