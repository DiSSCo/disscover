/* Import Dependencies */
import { BrowserRouter as Router, Routes } from 'react-router-dom';

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

/* Import Components */
import Notifications from 'components/elements/notifications/Notifications';


/* Props type */
type Props = {
  bootState: {
    aggregations: Dict,
    phylopicBuild: number
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

  /* Set boot state to global state and check if device being used is mobile */
  trigger.SetTrigger(() => {
    /* Set global boot state */
    dispatch(setBootState(bootState));
  }, []);

  /* If booted: return routes for application */
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
};

export default App;