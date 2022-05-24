import React from "react";

/* Import Components */
import Header from "../header/Header.js";
import Body from "./body/Body.js";
import Footer from "../footer/Footer.js";

class Search extends React.Component {
    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />

                <Body />

                <Footer />
            </div>
        );
    }
}

export default Search;