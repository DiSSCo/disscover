/* Import Dependencies */
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { isEmpty } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import { DetectMobile } from 'global/Utilities';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getScreenSize, setScreenSize } from 'redux/general/GeneralSlice';
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
import PromptMessages from 'components/general/promptMessage/PromptMessages';

import Mobile from 'Mobile';

/* Import Routes */
import SearchRoutes from 'components/search/Routes';
import DocumentRoutes from 'components/documents/Routes';

/* Import API */
import GetUser from 'api/user/GetUser';
import InsertUser from 'api/user/InsertUser';


const App = () => {
  /* Configue Store */
  const dispatch = useAppDispatch();

  /* Base Variables */
  const screenSize = useAppSelector(getScreenSize);
  const user = useAppSelector(getUser);

  /* Function to regulate PC and Mobile views */
  const UpdateWindowDimensions = () => {
    if (DetectMobile()) {
      dispatch(setScreenSize('sm'));
    } else if (window.innerWidth <= 992) {
      dispatch(setScreenSize('md'));
    } else {
      dispatch(setScreenSize('lg'));
    }
  };

  useEffect(() => {
    /* Check new size of window */
    UpdateWindowDimensions();

    window.addEventListener("resize", UpdateWindowDimensions);

    return () => window.removeEventListener("resize", UpdateWindowDimensions);
  }, []);

  /* OnLoad: Check if user is present in database, otherwise add basic record */
  useEffect(() => {
    /* Check if user is not present in User state but is logged in */
    if (Object.keys(user).length === 0 && KeycloakService.IsLoggedIn()) {
      GetUser(KeycloakService.GetSubject(), KeycloakService.GetToken()).then((user) => {
        if (isEmpty(user)) {
          /* If User does not exist, add user to database */
          InsertUser(KeycloakService.GetSubject(), KeycloakService.GetToken(), KeycloakService.GetParsedToken()).then((user) => {
            if (user) {
              dispatch(setUser(user));
            }
          }).catch(error => {
            console.warn(error);
          });
        } else {
          /* Set User state */
          dispatch(setUser(user));
        }
      });
    }
  }, []);

  return (
    <div className="h-100 w-100 position-relative">
      {(screenSize != 'sm') ?
        <Router>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Search Page */}
            <Route path="/search" element={<Search />} />
            {SearchRoutes}

            {/* Specimen Page */}
            <Route path="/ds/:prefix/:suffix/:version?" element={<Specimen />} />

            {/* Digital Media Page */}
            <Route path="/dm/:prefix/:suffix/:version?" element={<DigitalMedia />} />

            {/* Annotations Page */}
            <Route path="/annotate" element={<Annotate />} />

            {/* Profile Page */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<Profile />} />

            {/* Document Routes */}
            {DocumentRoutes}
          </Routes>

          <PromptMessages />
        </Router>
        : <Mobile />
      }
    </div>
  );
}

export default App;
