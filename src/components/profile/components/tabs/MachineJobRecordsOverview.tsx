/* Import Dependencies */
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import Moment from 'moment';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Store */


/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import styles from 'components/profile/profile.module.scss';

/* Import Components */
import Paginator from 'components/general/paginator/Paginator';

/* Import API */
import GetUserMachineJobRecords from 'api/user/GetUserMachineJobRecords';


const MachineJobRecordsOverview = () => {
    /* Base variables */
    const [tableData, setTableData] = useState<DataRow[]>([]);
    const pageSize = 25;
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [paginatorLinks, setPaginatorLinks] = useState<Dict>({});

    interface DataRow {
        index: number,
        id: string,
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

    /* Set Datatable columns */
    const tableColumns: TableColumn<DataRow>[] = [{
        name: 'Job ID',
        selector: row => row.id,
        id: 'profile_machinejobrecord_jobid',
        sortable: true,
        wrap: true
    }, {
        name: 'Scheduled',
        selector: row => row.scheduled,
        id: 'profile_machinejobrecord_scheduled',
        sortable: true,
        wrap: true
    }, {
        name: 'Completed',
        selector: row => row.completed,
        id: 'profile_machinejobrecord_completed',
        sortable: true,
        wrap: true
    }, {
        name: 'State',
        selector: row => row.state,
        id: 'profile_machinejobrecord_state',
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

    return (
        <div className="h-100 d-flex flex-column">
            <Row className={`${styles.annotationsTable} flex-grow-1 pb-2`}>
                <Col className="h-100">
                    <div className="h-100 overflow-scroll b-secondary rounded-c">
                        <DataTable
                            columns={tableColumns}
                            data={tableData}
                            customStyles={customStyles}

                            striped
                            highlightOnHover
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