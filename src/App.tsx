/* Import Dependencies */
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import KeycloakService from 'keycloak/Keycloak';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getUser, setUser } from 'redux/user/UserSlice';

/* Import Styles */
import './App.css';

/* Import Components */
import Home from 'components/home/Home';
import Search from 'components/search/Search';
import Specimen from 'components/specimen/Specimen';
import DigitalMedia from 'components/digitalMedia/DigitalMedia';
import Annotate from 'components/annotate/Annotate';
import Profile from 'components/profile/Profile';
import ErrorMessage from 'components/general/errorMessage/ErrorMessage';

/* Import Routes */
import DocumentRoutes from 'components/documents/Routes';

/* Import API */
import GetUser from 'api/user/GetUser';
import InsertUser from 'api/user/InsertUser';


const App = () => {
  /* Configue Store */
  const dispatch = useAppDispatch();

  /* Base Variables */
  const user = useAppSelector(getUser);

  /* OnLoad: Check if user is present in database, otherwise add basic record */
  useEffect(() => {
    /* Check if user is not present in User state but is logged in */
    if (Object.keys(user).length === 0 && KeycloakService.IsLoggedIn()) {
      GetUser(KeycloakService.GetSubject(), KeycloakService.GetToken()).then((user) => {
        if (!user) {
          /* If User does not exist, add user to database */
          InsertUser(KeycloakService.GetSubject(), KeycloakService.GetToken(), KeycloakService.GetParsedToken()).then((user) => {
            if (user) {
              dispatch(setUser(user));
            }
          });

        } else {
          /* Set User state */
          dispatch(setUser(user));
        }
      });
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Search Page */}
        <Route path="/search" element={<Search />} />

        {/* Specimen Page */}
        <Route path="/ds/:prefix/:suffix" element={<Specimen />} />

        {/* Digital Media Page */}
        <Route path="/dm/:prefix/:suffix" element={<DigitalMedia />} />

        {/* Annotations Page */}
        <Route path="/annotate" element={<Annotate />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<Profile />} />

        {/* Document Routes */}
        {DocumentRoutes}
      </Routes>

      <ErrorMessage />
    </Router>
  );
}

export default App;
