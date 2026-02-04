/* Import Dependencies */
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

/* Import Config */
import VirtualCollectionsTableConfig from "app/config/table/VirtualCollectionsTableConfig";

/* Import Hooks */
import { useAppDispatch } from "app/Hooks";
import { useVirtualCollections } from "hooks/useVirtualCollections";

/* Import Store */
import { setSelectedVirtualCollection } from "redux-store/VirtualCollectionSlice";

/* Import Components */
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

    /* Use query hook to retrieve Virtual Collections */
    const { data, isLoading, isError } = useVirtualCollections();

    /* WIP: Handle loading and error state */
    if (isLoading) return <main><p>Retrieving the Virtual Collections...</p></main>;
    if (isError) return <main><p>Something went wrong with fetching the Virtual Collections. Please try again later.</p></main>;

    /* Set tableData */
    const tableData: DataRow[] = data.map((virtualCollection: { attributes: { [x: string]: any; }; }) => ({
        collectionName: virtualCollection.attributes['ltc:collectionName'],
        dateCreated: virtualCollection.attributes['schema:dateCreated'],
        creator: virtualCollection.attributes['schema:creator']['schema:name'],
        type: virtualCollection.attributes['ltc:basisOfScheme'],
        identifier: virtualCollection.attributes['@id']
    }));

    const selectVirtualCollection = (selectedCollection: any) => {
        const result = data.find((collection: { id: any; }) => {
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
        </div>
    );
};

export default VirtualCollectionsTable;