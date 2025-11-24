/* Import Dependencies */
import { Row, Col } from "react-bootstrap";

/* Import Config */
import VirtualCollectionsTableConfig from "app/config/table/VirtualCollectionsTableConfig";

/* Import Hooks */
import { useAppDispatch, usePagination } from "app/Hooks";

/* Import API */
import getAllVirtualCollections from "api/virtualCollections/getAllVirtualCollections";

/* Import Components */
import { Paginator } from "components/elements/Elements";
import { DataTable } from "components/elements/customUI/CustomUI";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { setAllVirtualCollections, setSelectedVirtualCollection } from "redux-store/VirtualCollectionSlice";

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
        Method: getAllVirtualCollections
    });
    useEffect(() => {
        if (pagination) {
            dispatch(setAllVirtualCollections(pagination.records));
        }
    })

    pagination.records.forEach(virtualCollection => {
        tableData.push({
            collectionName: virtualCollection.attributes['ltc:collectionName'],
            dateCreated: virtualCollection.attributes['schema:dateCreated'],
            creator: virtualCollection.attributes['schema:creator']['schema:name'],
            type: virtualCollection.attributes['ltc:basisOfScheme'],
            identifier: virtualCollection.attributes['@id']
        });
    });

    const doSomething = (e: any) => {
        console.log('something', e);
        console.log(e.identifier);
        const virtualCollectionId = e.identifier.split('/').pop();
        console.log(virtualCollectionId);
        dispatch(setSelectedVirtualCollection(e));
    };
    
    return (
        <div className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 overflow-hidden">
                <Col>
                    <div className="h-100 bgc-white b-secondary-hard br-corner">
                        <DataTable columns={columns}
                            data={tableData}
                            SelectAction={(e: any) => doSomething(e)}
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