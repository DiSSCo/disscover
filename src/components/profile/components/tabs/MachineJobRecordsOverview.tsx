/* Import Dependencies */
import { useEffect, useState } from 'react';
import Moment from 'moment';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Dict } from 'app/Types';

/* Import Components */
import Paginator from 'components/general/paginator/Paginator';

/* Import Utilities */
import MachineJobRecordTableConfig from 'app/config/tables/MachineJobRecordTableConfig';

/* Import Components */
import DataTable from 'components/general/tables/DataTable';

/* Import API */
import GetUserMachineJobRecords from 'api/user/GetUserMachineJobRecords';
import GetMAS from 'api/mas/GetMAS';
import { isEmpty } from 'lodash';


const MachineJobRecordsOverview = () => {
    /* Base variables */
    const [tableData, setTableData] = useState<DataRow[]>([]);
    const [paginatorLinks, setPaginatorLinks] = useState<Dict>({});
    const [pageNumber, setPageNumber] = useState<number>(1);
    const pageSize = 25;

    interface DataRow {
        index: number,
        id: string,
        name: string,
        targetId: string,
        scheduled: string,
        completed: string,
        state: string
    };

    /* Function to link Machine Job Records with the respective MAS data */
    const ConnectMASData = (machineJobRecord: Dict, index: number, PushToArray: Function) => {
        GetMAS(machineJobRecord.attributes.masId).then((MAS) => {
            if (!isEmpty) {
                PushToArray({
                    index: index,
                    id: machineJobRecord.id,
                    name: MAS.attributes.name,
                    targetId: machineJobRecord.attributes.targetId,
                    scheduled: Moment(machineJobRecord.attributes.timeStarted).format('MMMM DD - YYYY'),
                    completed: Moment(machineJobRecord.attributes.timeCompleted).format('MMMM DD - YYYY') ?? '--',
                    state: machineJobRecord.attributes.state
                });
            } else {
                throw(new Error("No MAS found for given MAS ID"));
            }
        }).catch(error => {
            console.warn(error);

            PushToArray({
                index: index,
                id: machineJobRecord.id,
                name: '',
                targetId: machineJobRecord.attributes.targetId,
                scheduled: Moment(machineJobRecord.attributes.timeStarted).format('MMMM DD - YYYY'),
                completed: Moment(machineJobRecord.attributes.timeCompleted).format('MMMM DD - YYYY') ?? '--',
                state: machineJobRecord.attributes.state
            });
        });
    };

    /* OnChange of Pagination Range: try to fetch User Annotations by new range */
    useEffect(() => {
        GetUserMachineJobRecords(KeycloakService.GetToken(), pageSize, pageNumber).then(({ machineJobRecords, links }) => {
            /* Construct and set table data */
            const tableData: DataRow[] = [];

            const PushToTableData = (tableRecord: DataRow) => tableData.push(tableRecord);

            machineJobRecords.forEach((machineJobRecord: Dict, index: number) => {
                ConnectMASData(machineJobRecord, index, PushToTableData);
            });

            setTableData(tableData);

            /* Set Paginator links */
            setPaginatorLinks(links);
        }).catch(error => {
            console.warn(error);
        });
    }, [pageNumber]);

    /* Table Config */
    const { columns } = MachineJobRecordTableConfig(false);

    return (
        <div className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 pb-2">
                <Col className="h-100">
                    <div className="h-100 overflow-scroll b-secondary rounded-c">
                        <DataTable columns={columns}
                            data={tableData}
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

export default MachineJobRecordsOverview;