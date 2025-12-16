/* Import Dependencies */
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { useState } from 'react';

/* Import Utilities */
import { MobileCheck } from 'app/Utilities';

/* Import Routes */
import AppRoutes from 'app/Routes';

/* Import Hooks */
import { useAppDispatch, useTrigger } from 'app/Hooks';

/* Import Store */
import { setBootState } from "redux-store/BootSlice";

/* Import Types */
import { Dict } from 'app/Types';

/* Import Styles */
import './App.css';
import './Main.scss';

/* Import Components */
import Notifications from 'components/elements/notifications/Notifications';
import Mobile from './Mobile';
import { Header } from 'components/elements/header/Header';

/* Props type */
type Props = {
  bootState: {
    aggregations: Dict,
  }
};


/**
 * Function to render the application body and its routes
 * @returns JSX component
 */
const App = (props: Props) => {
  const { bootState } = props;

  /* Hooks */
  const dispatch = useAppDispatch();
  const trigger = useTrigger();

  /* Base variables */
  const [isMobile, setIsMobile] = useState<boolean>(MobileCheck());

  /* Set boot state to global state and check if device being used is mobile */
  /* Set boot state to global state */
  trigger.SetTrigger(() => {
    /* Set global boot state */
    dispatch(setBootState(bootState));

    /* Check for mobile device */
    const CheckForMobileDevice = () => {
      setIsMobile(MobileCheck());
    };

    window.addEventListener("resize", CheckForMobileDevice);

    return () => window.removeEventListener("resize", CheckForMobileDevice);
  }, []);

  /* If booted: return routes for application, otherwise show loading screen */
  if (!isMobile) {
    return (
      <div className="h-full w-full">
        <Router>
          <Header />
          <Routes>
            {AppRoutes}
          </Routes>
        </Router>

        <Notifications />
      </div>
    );
  } else {
    return (
      <Mobile />
    );
  }
};

export default App;