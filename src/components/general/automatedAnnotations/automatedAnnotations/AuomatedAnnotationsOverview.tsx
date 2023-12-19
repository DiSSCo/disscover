/* Import Dependencies */
import { useEffect, useState } from 'react';
import Moment from 'moment';
import DataTable, { TableColumn } from 'react-data-table-component';

/* Import Types */
import { Dict } from 'app/Types';


/* Props Typing */
interface Props {
    targetId: string,
    GetMachineJobRecords: (subString: string) => Promise<Dict[]>
};


const AutomatedAnnotationsOverview = (props: Props) => {
    const { targetId, GetMachineJobRecords } = props;

    /* Declare type of a table row */
    interface DataRow {
        index: number,
        id: string,
        scheduled: string,
        completed: string,
        state: string
    };

    /* Base variables */
    const [tableData, setTableData] = useState<DataRow[]>([]);

    /* OnLoad: Fetch Machine Job Records */
    useEffect(() => {
        GetMachineJobRecords(targetId).then((machineJobRecords) => {
            /* Construct table data */
            const tableData: DataRow[] = [];

            machineJobRecords.forEach((machineJobRecord, index) => {
                tableData.push({
                    index: index,
                    id: machineJobRecord.id,
                    scheduled: Moment(machineJobRecord.attributes.timeStarted).format('MMMM DD - YYYY'),
                    completed: Moment(machineJobRecord.attributes.timeCompleted).format('MMMM DD - YYYY') ?? '--',
                    state: machineJobRecord.attributes.state
                });
            });

            setTableData(tableData);
        }).catch(error => {
            console.warn(error);
        });
    }, []);

    /* Construct table columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Job ID',
        selector: row => row.id,
        id: 'mas_job_record_id',
        sortable: true,
        wrap: true
    }, {
        name: 'Scheduled',
        selector: row => row.scheduled,
        id: 'mas_job_record_scheduled',
        sortable: true,
        wrap: true
    }, {
        name: 'Completed',
        selector: row => row.completed,
        id: 'mas_job_record_completed',
        sortable: true,
        wrap: true
    }, {
        name: 'State',
        selector: row => row.state,
        id: 'mas_job_record_state',
        sortable: true,
        wrap: true
    }];

    /* Custom styles for Data Table */
    const customStyles = {
        table: {
            style: {
                width: '100%',
                height: '100%'
            }
        },
        tableWrapper: {
            style: {
                width: '100%',
                height: '100%',
                backgroundColor: 'white'
            }
        },
        responsiveWrapper: {
            style: {
                width: '100%',
                height: '100%'
            }
        },
        head: {
            style: {
                fontSize: '0.875rem !important'
            }
        },
        headRow: {
            style: {
                backgroundColor: '#51a993'
            }
        },
        rows: {
            style: {
                minHeight: '40px',
                fontSize: '0.875rem !important'
            },
            highlightOnHoverStyle: {
                backgroundColor: '#98cdbf',
            },
            stripedStyle: {
                backgroundColor: '#eef7f4'
            }
        }
    };

    return (
        <DataTable
            columns={tableColumns}
            noDataComponent="No Machine Annotation job records found for this specimen"
            data={tableData}
            className='h-100 overflow-y-scroll z-1'
            customStyles={customStyles}

            striped
            highlightOnHover
            pointerOnHover
        />
    );
}

export default AutomatedAnnotationsOverview;