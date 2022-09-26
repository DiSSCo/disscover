import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './main.css';

/* Import Components */
import Home from "templates/home/Home";
import Search from "templates/search/Search";

import Specimen from "templates/specimen/Specimen";
import JSON_Specimen from "templates/specimen/JSON_Specimen";

import Annotate from "templates/annotate/Annotate";

import Profile from "templates/profile/Profile";


const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />

                    <Route path="/ds/:prefix/:suffix" element={<Specimen />} />
                    <Route path="/ds_json/:prefix/:suffix" element={<JSON_Specimen />} />

                    <Route path="/annotate" element={<Annotate />} />

                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;