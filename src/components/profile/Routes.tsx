/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Profile from "./Profile";


/* Routes associated with the Profile page */
const routes = [
    <Route key="profile" path="/profile/:userId?" element={<Profile />} />
];

export default routes;