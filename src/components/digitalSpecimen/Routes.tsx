/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import DigitalSpecimenDetails from "pages/DigitalSpecimenDetails/DigitalSpecimenDetails";


/* Routes associated with the Digital Specimen page */
const routes = [
    <Route key="digitalSpecimen" path="/ds/:prefix/:suffix/:version?" element={<DigitalSpecimenDetails />} />
];

export default routes;