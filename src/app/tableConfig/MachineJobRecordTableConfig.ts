/* Import Dependencies */
import { TableColumn } from "react-data-table-component";


const MachineJobRecordTableConfig = (idPrefix: string) => {
    interface DataRow {
        index: number,
        id: string,
        scheduled: string,
        completed: string,
        state: string
    };

    /* Set Datatable columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Job ID',
        selector: row => row.id,
        id: `${idPrefix}_machinejobrecord_jobid`,
        sortable: true,
        wrap: true
    }, {
        name: 'Scheduled',
        selector: row => row.scheduled,
        id: `${idPrefix}_machinejobrecord_scheduled`,
        sortable: true,
        wrap: true
    }, {
        name: 'Completed',
        selector: row => row.completed,
        id: `${idPrefix}_machinejobrecord_completed`,
        sortable: true,
        wrap: true
    }, {
        name: 'State',
        selector: row => row.state,
        id: `${idPrefix}_machinejobrecord_state`,
        sortable: true,
        wrap: true
    }];

    /* Custom styles for Data Table */
    const customStyles = {
        head: {
            style: {
                color: 'white',
                fontSize: '14px'
            }
        },
        headRow: {
            style: {
                backgroundColor: '#51a993'
            }
        },
        rows: {
            style: {
                minHeight: '40px'
            },
            highlightOnHoverStyle: {
                backgroundColor: '#98cdbf',
            },
            stripedStyle: {
                backgroundColor: '#eef7f4'
            }
        }
    };

    return {
        tableColumns: tableColumns,
        customStyles: customStyles
    };
}

export default MachineJobRecordTableConfig;