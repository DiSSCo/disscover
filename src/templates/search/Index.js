import {
    Routes,
    Route
} from "react-router-dom";

/* Import Components */
import Search from "./Search.js";
import SpecimenPage from "./specimenPage/SpecimenPage.js";

const SearchIndex = () => {
    return (
        <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/specimen/:specimenId" element={<SpecimenPage />} />
        </Routes>
    );
}

export default SearchIndex;