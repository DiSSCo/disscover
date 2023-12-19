/* Import Dependencies */
import { useEffect, useState } from 'react';
import Moment from 'moment';
import DataTable, { TableColumn } from 'react-data-table-component';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Utilities */
import MachineJobRecordTableConfig from 'app/tableConfig/MachineJobRecordTableConfig';


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

    /* Table Config */
    const { tableColumns, customStyles} = MachineJobRecordTableConfig('MAS');

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