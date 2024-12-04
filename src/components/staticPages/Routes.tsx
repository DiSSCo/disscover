/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import About from "./About";
import Acknowledgements from "./Acknowledgements";


/* Routes associated with the Home page */
const routes = [
    <Route key="about" path="/about" element={<About />} />,
    <Route key="acknowledgements" path="/acknowledgements" element={<Acknowledgements />} />
];

export default routes;