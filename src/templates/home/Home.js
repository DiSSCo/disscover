import React from "react";

/* Import Components */
import Header from "../header/Header.js";
import Body from "./body/Body.js";
import Footer from "../footer/Footer.js";

class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />

                <Body />

                <Footer />
            </div>
        );
    }
}

export default Home;