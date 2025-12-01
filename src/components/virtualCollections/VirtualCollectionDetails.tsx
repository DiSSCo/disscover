/* Import Dependencies */
import { Col, Container, Row } from "react-bootstrap";

/* Import Hooks */
import { useAppDispatch, useAppSelector, useFetch, usePagination } from "app/Hooks";

/* Import Config */
import VirtualCollectionItemsTable from "./components/VirtualCollectionItemsTable";

/* Import API */
import GetSpecificVirtualCollection from "api/virtualCollections/GetSpecificVirtualCollection";
import GetAllVirtualCollectionItems from "api/virtualCollections/GetAllVirtualCollectionItems";

/* Import Store */
import { getSelectedVirtualCollection, setSelectedVirtualCollection } from "redux-store/VirtualCollectionSlice";

/* Import Components */
import Jumbotron from "./components/Jumbotron";
import { Footer, Header } from "components/elements/Elements";


const VirtualCollectionDetails = () => {

    /* Hooks */
    const fetch = useFetch();
    const dispatch = useAppDispatch();

    /* Base variables */
    const selectedVirtualCollection = useAppSelector(getSelectedVirtualCollection);

    /* Onload get selectedVirtualCollection if virtual collection is not retrieved yet */
    fetch.Fetch({
        Method: GetSpecificVirtualCollection,
        params: {
            identifier: location.pathname.replace('/virtual-collections/', '')
        },
        Handler: ((results: any) => {
            if (results) {
                /* Dispatch digital specimen */
                dispatch(dispatch(setSelectedVirtualCollection(results)));
            }
        })
    });

    const pagination = usePagination({
        pageSize: 25,
        params: {
            virtualCollectionID: location.pathname.replace('/virtual-collections/', ''),
        },
        Method: GetAllVirtualCollectionItems
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render header*/}
            <Header span={10}
                offset={1}
            />
            
            {/* Virtual Collections page body */}
            <Container fluid className="flex-grow-1 overflow-y-hidden my-5">
                <Row className="h-100 position-relative">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="d-flex flex-column h-100"
                    >
                        <Row>
                            <Col>
                                <Jumbotron virtualCollection={selectedVirtualCollection} />
                            </Col>
                        </Row>
                        <Row className="flex-grow-1 position-relative overflow-y-hidden mt-3">
                            <Col className="h-100">
                                {/* Digital specimen items */}
                                <VirtualCollectionItemsTable pagination={pagination} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
    
            {/* Render footer */}
            <Footer span={10}
                offset={1}
            />
        </div>
    );
};

export default VirtualCollectionDetails;