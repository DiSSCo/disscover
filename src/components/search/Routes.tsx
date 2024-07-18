/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Search from "./Search";
import CompareDigitalSpecimen from "./CompareDigitalSpecimen";


/* Routes associated with the Search page */
const routes = [
    <Route key="search" path="/search" element={<Search />} />,
    <Route key="compareDigitalSpecimen" path="/search/compare" element={<CompareDigitalSpecimen />} />
];

export default routes;