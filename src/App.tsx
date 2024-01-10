/* Import Dependencies */
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { isEmpty } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import { DetectMobile } from 'app/Utilities';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
  getScreenSize, setScreenSize, setWindowDimensions,
  getOrganisations, setOrganisations, setPhylopicBuild
} from 'redux/general/GeneralSlice';
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
import Demo from 'components/demo/Demo';

import Mobile from 'Mobile';

/* Import Routes */
import SearchRoutes from 'components/search/Routes';
import DocumentRoutes from 'components/documents/Routes';

/* Import API */
import GetUser from 'api/user/GetUser';
import InsertUser from 'api/user/InsertUser';
import GetSpecimenAggregations from 'api/specimen/GetSpecimenAggregations';
import GetPhylopicBuild from 'api/general/GetPhylopicBuild';


const App = () => {
  /* Configue Store */
  const dispatch = useAppDispatch();

  /* Base Variables */
  const screenSize = useAppSelector(getScreenSize);
  const user = useAppSelector(getUser);
  const organisations = useAppSelector(getOrganisations);

  /* Function to regulate PC and Mobile views */
  const UpdateWindowDimensions = () => {
    /* Set screen size */
    if (DetectMobile()) {
      dispatch(setScreenSize('sm'));
    } else if (window.innerWidth <= 992) {
      dispatch(setScreenSize('md'));
    } else {
      dispatch(setScreenSize('lg'));
    }

    /* Set window dimensions */
    dispatch(setWindowDimensions({
      vw: window.innerWidth,
      vh: window.innerHeight
    }))
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
    if (isEmpty(user) && KeycloakService.IsLoggedIn()) {
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

  /* OnLoad: Check if Organisations list is present, otherwise fetch list */
  useEffect(() => {
    if (isEmpty(organisations)) {
      GetSpecimenAggregations().then((aggregations) => {
        if ('organisationName' in aggregations) {
          const organisationList: string[] = [];

          Object.keys(aggregations.organisationName).forEach((organisationName) => {
            organisationList.push(organisationName);
          });

          organisationList.sort((a, b) => a.localeCompare(b));

          dispatch(setOrganisations(organisationList));
        }
      }).catch(error => {
        console.warn(error);
      });
    }
  }, []);

  /* OnLoad: Get latest version of Phylopic API */
  useEffect(() => {
    GetPhylopicBuild().then((build) => {
      dispatch(setPhylopicBuild(build));
    }).catch(error => {
      console.warn(error);
    });
  }, []);

  return (
    <div className="h-100 w-100 position-relative">
      <PromptMessages />

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

            {/* Demo Page */}
            <Route path="/demo" element={<Demo />} />
          </Routes>
        </Router>
        : <Mobile />
      }
    </div>
  );
}

export default App;
