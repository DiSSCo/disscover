/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import VirtualCollections from "./VirtualCollections";
import VirtualCollectionDetails from "./VirtualCollectionDetails";


/* Routes associated with the Virtual Collections page */
const routes = [
    <Route key="virtualCollections" path="/virtual-collections" element={<VirtualCollections />} />,
    <Route key="virtualCollectionDetails" path="/virtual-collections/:id" element={<VirtualCollectionDetails />} />,
];

export default routes;