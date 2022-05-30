import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Import Components */
import Header from "../header/Header.js";
import Body from "./body/Body.js";
import Footer from "../footer/Footer.js";

const Search = () => {
    let location = useLocation();
    const [searchResults, setSearchResults] = useState();

    useEffect(() => {
        if (location.state) {
            setSearchResults(location.state.data);
        }
    }, []);

    console.log(searchResults);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Body searchResults={searchResults} />

            <Footer />
        </div>
    );
}



export default Search;