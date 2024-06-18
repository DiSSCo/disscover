/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Home from "./Home";


/* Routes associated with the Home page */
const routes = [
    <Route key="home" path="/" element={<Home />} />
];

export default routes;