/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import { DigitalMediaOverview } from "pages/DigitalMediaOverview/DigitalMediaOverview";

/* Routes associated with the Digital Media page */
const routes = [
    <Route key="digitalMedia" path="/dm/:prefix/:suffix/:version?" element={<DigitalMediaOverview />} />
];

export default routes;