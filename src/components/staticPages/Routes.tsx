/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import About from "./About";
import Acknowledgements from "./Acknowledgements";
import PrivacyPolicy from "./PrivacyPolicy";
import Terms from "./Terms";


/* Routes associated with the Home page */
const routes = [
    <Route key="about" path="/about" element={<About />} />,
    <Route key="acknowledgements" path="/acknowledgements" element={<Acknowledgements />} />,
    <Route key="privacy" path="/privacy" element={<PrivacyPolicy />} />,
    <Route key="terms" path="/terms" element={<Terms />} />
];

export default routes;