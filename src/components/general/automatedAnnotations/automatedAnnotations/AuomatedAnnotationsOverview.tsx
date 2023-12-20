/* Import Dependencies */
import { useEffect, useState } from 'react';
import Moment from 'moment';
import DataTable from 'react-data-table-component';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Utilities */
import MachineJobRecordTableConfig from 'app/tableConfig/MachineJobRecordTableConfig';

/* Import Components */
import Paginator from 'components/general/paginator/Paginator';


/* Props Typing */
interface Props {
    targetId: string,
    GetMachineJobRecords: (targetId: string, pageSize: number, pageNumber: number) => Promise<{machineJobRecords: Dict[], links: Dict}>
};


const AutomatedAnnotationsOverview = (props: Props) => {
    const { targetId, GetMachineJobRecords } = props;

    /* Declare type of a table row */
    interface DataRow {
        index: number,
        id: string,
        targetId: string,
        scheduled: string,
        completed: string,
        state: string
    };

    /* Base variables */
    const [tableData, setTableData] = useState<DataRow[]>([]);
    const [paginatorLinks, setPaginatorLinks] = useState<Dict>({});
    const [pageNumber, setPageNumber] = useState<number>(1);
    const pageSize = 10;

    /* OnLoad: Fetch Machine Job Records */
    useEffect(() => {
        GetMachineJobRecords(targetId, pageSize, pageNumber).then(({ machineJobRecords, links }) => {
            /* Construct table data */
            const tableData: DataRow[] = [];

            machineJobRecords.forEach((machineJobRecord, index) => {
                tableData.push({
                    index: index,
                    id: machineJobRecord.id,
                    targetId: machineJobRecord.attributes.targetId,
                    scheduled: Moment(machineJobRecord.attributes.timeStarted).format('MMMM DD - YYYY'),
                    completed: Moment(machineJobRecord.attributes.timeCompleted).format('MMMM DD - YYYY') ?? '--',
                    state: machineJobRecord.attributes.state
                });
            });

            setTableData(tableData);
            setPaginatorLinks(links);
        }).catch(error => {
            console.warn(error);
        });
    }, []);

    /* Table Config */
    const { tableColumns, customStyles } = MachineJobRecordTableConfig('MAS');

    return (
        <div className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 pb-2">
                <Col className="h-100">
                    <div className="h-100 overflow-scroll b-secondary rounded-c">
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
                    </div>
                </Col>
            </Row>
            <Row className={`justify-content-center`}>
                <Col className="col-md-auto">
                    <Paginator pageNumber={pageNumber}
                        links={paginatorLinks}

                        SetPageNumber={(pageNumber: number) => setPageNumber(pageNumber)}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default AutomatedAnnotationsOverview;