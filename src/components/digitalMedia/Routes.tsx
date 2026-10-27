/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
// import DigitalMedia from "./DigitalMedia";
import { DigitalMediaOverview } from "pages/DigitalMediaOverview/DigitalMediaOverview";


/* Routes associated with the Digital Media page */
const routes = [
    // <Route key="digitalMedia" path="/dm/:prefix/:suffix/:version?" element={<DigitalMedia />} />
    <Route key="digitalMedia" path="/dm/:prefix/:suffix/:version?" element={<DigitalMediaOverview />} />
];

export default routes;