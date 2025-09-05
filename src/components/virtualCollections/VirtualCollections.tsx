/* Import Dependencies */
import { Container, Row, Col } from 'react-bootstrap';

/* Import Components */
import { Footer, Header } from "components/elements/Elements";
import { useFetch } from 'app/Hooks';
import getAllVirtualCollections from 'api/virtualCollections/getAllVirtualCollections';

/**
 * Base component that renders the VirtualCollections page
 * @returns JSX Component
 */
const VirtualCollections = () => {
    /* Hooks */
    const fetch = useFetch();

    /* OnLoad, fetch digital specimen data if the digitalSpecimen data with the current handle is not already in the store*/
    fetch.FetchMultiple({
        callMethods: [
            {
                alias: 'allVirtualCollections',
                params: {},
                Method: getAllVirtualCollections
            },
        ],
        triggers: [],
        Handler: (results: any) => {
            console.log('virtual collections',results)
        }
    });

    return (
        <div className="h-100 d-flex flex-column">
            {/* Render header*/}
            <Header span={10}
                offset={1}
            />

            {/* Search page body */}
            <Container fluid className="flex-grow-1 overflow-y-hidden my-5">
                <Row className="h-100 position-relative">
                    <Col lg={{ span: 10, offset: 1 }}
                        className="h-100 d-flex flex-column"
                    >
                        <Row>
                            <Col>
                                <h2>Virtual Collections</h2>
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

export default VirtualCollections;