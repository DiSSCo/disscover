/* Import Dependencies */
import { Row, Col } from "react-bootstrap";

/* Import Hooks */
import { usePagination } from "app/Hooks";

/* Import Config */
import UserMasJobRecordsTableConfig from "app/config/table/UserMasJobRecordsTableConfig";

/* Import API */
import GetCreatorMasJobRecords from "api/masJobRecord/GetCreatorMasJobRecords";

/* Import Components */
import { Paginator } from "components/elements/Elements";
import { DataTable } from "components/elements/customUI/CustomUI";


/* User annotation record type */
type DataRow = {
    targetId: string,
    scheduled: string,
    completed: string,
    state: string
};


/**
 * Component that renders the user MAS job records table on the profile page
 * @returns JSX Component
 */
const UserMasJobRecordsTable = () => {
    /* Base variables */
    const { columns } = UserMasJobRecordsTableConfig();
    const tableData: DataRow[] = [];

    const pagination = usePagination({
        pageSize: 25,
        resultKey: 'userAnnotations',
        Method: GetCreatorMasJobRecords
    });

    pagination.records.forEach(userMasJobRecord => {
        tableData.push({
            targetId: userMasJobRecord.targetId,
            scheduled: userMasJobRecord.timeStarted,
            completed: userMasJobRecord.timeCompleted,
            state: userMasJobRecord.state
        });
    });

    return (
        <div className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 overflow-hidden">
                <Col>
                    <div className="h-100 bgc-white b-secondary-hard br-corner">
                        <DataTable columns={columns}
                            data={tableData}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="d-flex justify-content-center">
                    <Paginator pagination={pagination} />
                </Col>
            </Row>
        </div>
    );
};

export default UserMasJobRecordsTable;