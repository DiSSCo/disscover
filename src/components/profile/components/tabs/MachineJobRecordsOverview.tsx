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


const MachineJobRecordsOverview = () => {
    /* Base variables */
    const [tableData, setTableData] = useState<DataRow[]>([]);
    const [paginatorLinks, setPaginatorLinks] = useState<Dict>({});
    const [pageNumber, setPageNumber] = useState<number>(1);
    const pageSize = 25;

    interface DataRow {
        index: number,
        id: string,
        targetId: string,
        scheduled: string,
        completed: string,
        state: string
    };

    /* OnChange of Pagination Range: try to fetch User Annotations by new range */
    useEffect(() => {
        GetUserMachineJobRecords(KeycloakService.GetToken(), pageSize, pageNumber).then(({ machineJobRecords, links }) => {
            /* Construct and set table data */
            const tableData: DataRow[] = [];

            machineJobRecords.forEach((machineJobRecord: Dict, index: number) => {
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