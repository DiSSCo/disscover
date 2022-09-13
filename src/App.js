import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

/* Import Components */
import Home from "./templates/home/Home.js";
import Search from "./templates/search/Search.js";
import Specimen from "./templates/specimen/Specimen.js";

/* Import Main.css */
import './main.css';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/specimen/*" element={<Specimen />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;