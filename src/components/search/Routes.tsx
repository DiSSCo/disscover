/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Compare from "./components/compare/Compare";


/* Routes for Document pages */
const routes = [
    <Route key="compare" path="/search/compare" element={<Compare />} />
];

export default routes;