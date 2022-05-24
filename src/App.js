import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

/* Import Components */
import Home from "./templates/home/Home.js";
import Search from "./templates/search/Search.js";

class App extends React.Component {
    render() {
        return (
            <Router>

                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Search />} />
                </Routes>
            </Router>
        );
    }
}

export default App;