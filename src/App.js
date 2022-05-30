import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

/* Import Components */
import Home from "./templates/home/Home.js";
import SearchIndex from "./templates/search/Index.js";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search/*" element={<SearchIndex />} />
            </Routes>
        </Router>
    );
}

export default App;