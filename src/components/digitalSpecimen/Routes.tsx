/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import DigitalSpecimen from "./DigitalSpecimen";


/* Routes associated with the Digital Specimen page */
const routes = [
    <Route key="digitalSpecimen" path="/ds/:prefix/:suffix/:version?" element={<DigitalSpecimen />} />
];

export default routes;