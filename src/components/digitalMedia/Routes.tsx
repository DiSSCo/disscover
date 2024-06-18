/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import DigitalMedia from "./DigitalMedia";


/* Routes associated with the Digital Media page */
const routes = [
    <Route key="digitalMedia" path="/dm/:prefix/:suffix/:version?" element={<DigitalMedia />} />
];

export default routes;