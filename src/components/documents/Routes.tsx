/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import PrivacyPolicy from "./PrivacyPolicy";
import Terms from "./Terms";


/* Routes for Document pages */
const routes = [
    <Route key="privacy" path="/privacy" element={<PrivacyPolicy />} />,
    <Route key="terms" path="/terms" element={<Terms />} />
];

export default routes;