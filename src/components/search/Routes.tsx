/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Search from "./Search";


/* Routes associated with the Search page */
const routes = [
    <Route key="search" path="/search" element={<Search />} />
];

export default routes;