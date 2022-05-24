import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import './body.css';

/* Import components */
import SearchBar from "./searchMenu/SearchBar";

class Body extends React.Component {
    render() {
        return(
            <>
                <Container fluid>
                    <Row>
                        <Col md="2" className="filterMenu">
                            <SearchBar />
                        </Col>
                        <Col md="10">

                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Body;