import React, { useState, useEffect } from "react";

/* Import Components */
import Header from "../header/Header.js";
import Body from "./body/Body.js";
import Footer from "../footer/Footer.js";

const Search = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Body />

            <Footer />
        </div>
    );
}



export default Search;