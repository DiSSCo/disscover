/* Import Dependencies */
import { Row, Col } from "react-bootstrap";

/* Import Config */
import VirtualCollectionsTableConfig from "app/config/table/VirtualCollectionsTableConfig";

/* Import Hooks */
import { usePagination } from "app/Hooks";

/* Import API */
import getAllVirtualCollections from "api/virtualCollections/getAllVirtualCollections";

/* Import Components */
import { Paginator } from "components/elements/Elements";
import { DataTable } from "components/elements/customUI/CustomUI";

/* User annotation record type */
type DataRow = {
    collectionName: string,
    dateCreated: string,
    creator: string,
    type: string,
    identifier: string
};


/**
 * Component that renders the user annotation records table on the profile page
 * @returns JSX Component
 */
const VirtualCollectionsTable = () => {
    /* Base variables */
    const { columns } = VirtualCollectionsTableConfig();
    const tableData: DataRow[] = [];

    const pagination = usePagination({
        pageSize: 25,
        Method: getAllVirtualCollections
    });

    pagination.records.forEach(virtualCollection => {
        tableData.push({
            collectionName: virtualCollection.attributes['ltc:collectionName'],
            dateCreated: virtualCollection.attributes['schema:dateCreated'],
            creator: virtualCollection.attributes['schema:creator']['schema:name'],
            type: virtualCollection.attributes['ltc:basisOfScheme'],
            identifier: virtualCollection.attributes['@id']
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

export default VirtualCollectionsTable;