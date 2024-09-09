/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Demo from "./Demo";


/* Routes associated with the Home page */
const routes = [
    <Route key="demo" path="/demo" element={<Demo />} />
];

export default routes;