/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import VirtualCollectionsOverview from "pages/VirtualCollectionOverview/VirtualCollectionsOverview";
import VirtualCollectionDetails from "pages/VirtualCollectionDetails/VirtualCollectionDetails";


/* Routes associated with the Virtual Collections page */
const routes = [
    <Route key="virtualCollections" path="/virtual-collections" element={<VirtualCollectionsOverview />} />,
    <Route key="virtualCollectionDetails" path="/virtual-collections/:prefix/:suffix" element={<VirtualCollectionDetails />} />,
];

export default routes;