/* Import Routes */
import DataExportRoutes from 'components/dataExport/Routes';
import DemoRoutes from 'components/demo/Routes';
import HomeRoutes from 'components/home/Routes';
import SearchRoutes from 'components/search/Routes';
import DigitalSpecimenRoutes from 'components/digitalSpecimen/Routes';
import DigitalMediaRoutes from 'components/digitalMedia/Routes';
import ProfileRoutes from 'components/profile/Routes';
import StaticPagesRoutes from 'components/staticPages/Routes';
import VirtualCollectionsRoutes from 'components/virtualCollections/Routes';


/* Routes for application */
const AppRoutes: JSX.Element[] = [
    ...DataExportRoutes,
    ...DemoRoutes,
    ...HomeRoutes,
    ...SearchRoutes,
    ...DigitalSpecimenRoutes,
    ...DigitalMediaRoutes,
    ...ProfileRoutes,
    ...StaticPagesRoutes,
    ...VirtualCollectionsRoutes
];

export default AppRoutes;