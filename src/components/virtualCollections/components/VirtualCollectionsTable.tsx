/* Import Dependencies */
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

/* Import Config */
import VirtualCollectionsTableConfig from "app/config/table/VirtualCollectionsTableConfig";

/* Import Hooks */
import { useAppDispatch, usePagination } from "app/Hooks";

/* Import API */
import GetAllVirtualCollections from "api/virtualCollections/GetAllVirtualCollections";

/* Import Store */
import { setSelectedVirtualCollection } from "redux-store/VirtualCollectionSlice";

/* Import Components */
import { Paginator } from "components/elements/Elements";
import { DataTable } from "components/elements/customUI/CustomUI";
import { RetrieveEnvVariable } from "app/Utilities";

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
    /* Hooks */
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    /* Base variables */
    const { columns } = VirtualCollectionsTableConfig();
    const tableData: DataRow[] = [];

    const pagination = usePagination({
        pageSize: 25,
        Method: GetAllVirtualCollections
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

    const selectVirtualCollection = (selectedCollection: any) => {
        const result = pagination.records.find((collection) => {
            return collection.id === selectedCollection.identifier;
        });
        // Dispatch the selected virtual collection to the store
        dispatch(setSelectedVirtualCollection(result));
        
        // Navigate to the virtual collection details
        navigate(`/virtual-collections/${selectedCollection.identifier.replace(RetrieveEnvVariable('HANDLE_URL'), '')}`);
    };

    return (
        <div className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 overflow-hidden">
                <Col>
                    <div className="h-100 bgc-white b-secondary-hard br-corner">
                        <DataTable columns={columns}
                            data={tableData}
                            SelectAction={(e: any) => selectVirtualCollection(e)}
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