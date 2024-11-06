/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Home from "./Home";
import NotFound404 from 'components/elements/notFound404/NotFound404';


/* Routes associated with the Home page */
const routes = [
    <Route key="home" path="/" element={<Home />} />,
    <Route key="404" path="*" element={<NotFound404 />} />
];

export default routes;