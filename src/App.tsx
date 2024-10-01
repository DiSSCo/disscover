/* Import Dependencies */
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { useState } from 'react';

/* Import Utilities */
import { MobileCheck } from 'app/Utilities';

/* Import Routes */
import AppRoutes from 'app/Routes';

/* Import Hooks */
import { useTrigger } from 'app/Hooks';

/* Import Styles */
import './App.css';

/* Import Boot file */
import Boot from 'app/Boot';

/* Import Components */
import Loading from 'components/Loading';
import Notifications from 'components/elements/notifications/Notifications';
import Mobile from './Mobile';


/**
 * Function to render the application body and its routes
 * @returns JSX component
 */
const App = () => {
  /* Hooks */
  const trigger = useTrigger();

  /* Base variables */
  const [isMobile, setIsMobile] = useState<boolean>(false);

  /* Boot application */
  const booted = Boot();

  /* Check if device being used is mobile */
  trigger.SetTrigger(() => {
    const CheckForMobileDevice = () => {
      setIsMobile(MobileCheck());
    };

    window.addEventListener("resize", CheckForMobileDevice);

    return () => window.removeEventListener("resize", CheckForMobileDevice);
  }, []);

  /* If booted: return routes for application, otherwise show loading screen */
  if (booted && !isMobile) {
    return (
      <div className="h-100 w-100">
        <Router>
          <Routes>
            {AppRoutes}
          </Routes>
        </Router>

        <Notifications />
      </div>
    );
  } else if (isMobile) {
    return (
      <Mobile />
    );
  } else {
    return (
      <Loading />
    );
  }
};

export default App;