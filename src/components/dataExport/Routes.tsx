/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import DataExport from "./DataExport";


/* Routes associated with the Data Export page */
const routes = [
    <Route key="dataExport" path="/dataExport" element={<DataExport />} />
];

export default routes;