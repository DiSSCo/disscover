/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import VirtualCollections from "./VirtualCollections";


/* Routes associated with the Virtual Collections page */
const routes = [
    <Route key="virtualCollections" path="/virtual-collections" element={<VirtualCollections />} />,
];

export default routes;