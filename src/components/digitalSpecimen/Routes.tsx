/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import DigitalSpecimenOverview from "pages/DigitalSpecimenOverview/DigitalSpecimenOverview";


/* Routes associated with the Digital Specimen page */
const routes = [
    <Route key="digitalSpecimen" path="/ds/:prefix/:suffix/:version?" element={<DigitalSpecimenOverview />} />

];

export default routes;