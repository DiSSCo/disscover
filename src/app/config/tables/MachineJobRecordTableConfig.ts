/* Import Dependencies */
import { createColumnHelper } from '@tanstack/react-table';


const MachineJobRecordTableConfig = (showTargetId: boolean = true) => {
    interface MachineJobRecord {
        index: number,
        id: string,
        name: string,
        targetId: string
        scheduled: string,
        completed: string,
        state: string
    };

    /* Base variables */
    const columnHelper = createColumnHelper<MachineJobRecord>();

    const columns = [
        ...(showTargetId ? [columnHelper.accessor('id', {
            header: 'Job ID',
            meta: {
                widthInRem: 14
            }
        })] : []),
        columnHelper.accessor('targetId', {
            header: 'Target ID',
            meta: {
                widthInRem: 14,
            }
        }),
        columnHelper.accessor('name', {
            header: 'Name',
            meta: {
                widthInRem: 14,
            }
        }),
        columnHelper.accessor('scheduled', {
            header: 'Scheduled',
            meta: {
                widthInRem: 14
            }
        }),
        columnHelper.accessor('completed', {
            header: 'Completed',
            meta: {
                widthInRem: 14,
                sortable: true
            }
        }),
        columnHelper.accessor('state', {
            header: 'State',
            meta: {
                widthInRem: 10,
                sortable: true
            }
        })
    ];

    return {
        columns: columns
    };
}

export default MachineJobRecordTableConfig;