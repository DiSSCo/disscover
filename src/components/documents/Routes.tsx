/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import PrivacyPolicy from "./PrivacyPolicy";


/* Routes for Document pages */
export default [
    <Route key="privacy-policy" path="/privacy-policy" element={<PrivacyPolicy />} />
];