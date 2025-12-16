/* Import Dependencies */
import { Col, Container, Row } from "react-bootstrap";

/* Import Hooks */
import { useAppDispatch, useAppSelector, useFetch } from "app/Hooks";

/* Import Config */
import VirtualCollectionItemsTable from "./components/VirtualCollectionItemsTable";

/* Import API */
import GetSpecificVirtualCollection from "api/virtualCollections/GetSpecificVirtualCollection";

/* Import Store */
import { getSelectedVirtualCollection, setSelectedVirtualCollection } from "redux-store/VirtualCollectionSlice";

/* Import Components */
import Jumbotron from "./components/Jumbotron";
import { Footer } from "components/elements/Elements";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";


const VirtualCollectionDetails = () => {

    /* Hooks */
    const fetch = useFetch();
    const dispatch = useAppDispatch();

    /* Base variables */
    const selectedVirtualCollection = useAppSelector(getSelectedVirtualCollection);

    /* Onload get selectedVirtualCollection in case of direct navigation to this page*/
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

    return (
        <div className="h-100 d-flex flex-column">
            {/* Virtual Collections page body */}
            <Container fluid className="flex-grow-1 overflow-y-hidden my-5">
                <Row className="h-100 position-relative">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="d-flex flex-column h-100"
                    >
                        {/* Navigation back to virtual collections */}
                        <Row className="mb-4">
                            <Col lg="auto">
                                <Link to="/virtual-collections">
                                    <FontAwesomeIcon icon={faChevronLeft} className="fs-4 tc-secondary fw-lightBold pe-2"/>
                                    <span className="fs-4 tc-secondary fw-lightBold pe-2">Back to virtual collections</span>
                                </Link>
                            </Col>
                        </Row>
                        {selectedVirtualCollection &&
                        <Row>
                            <Col>
                                <Jumbotron virtualCollection={selectedVirtualCollection} />
                            </Col>
                        </Row>
                        }
                        <Row className="flex-grow-1 position-relative overflow-y-hidden mt-3">
                            <Col className="h-100">
                                {/* Digital specimen items */}
                                <VirtualCollectionItemsTable />
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