/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import About from "./About";


/* Routes associated with the Home page */
const routes = [
    <Route key="about" path="/about" element={<About />} />,
];

export default routes;