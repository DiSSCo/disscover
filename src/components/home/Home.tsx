/* Import Dependencies */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import { Container, Row, Col } from "react-bootstrap";

/* Import Styles */
import 'react-tabs/style/react-tabs.css';
import styles from './home.module.scss';

/* Import Webroot */
import Trilobite from 'webroot/img/trilobite.png';

/* Import Components */
import Header from 'components/general/header/Header';
import PIDSearch from "./components/search/PIDSearch";
import PhysicalIDSearch from "./components/search/PhysicalIDSearch";
import CollectionFacilitySearch from './components/search/CollectionFacilitySearch';
import VirtualCollectionSearch from './components/search/VirtualCollectionSearch';
import Footer from 'components/general/footer/Footer';


const Home = () => {
    /* Class Name for Tabs */
    const classTabsList = classNames({
        [`${styles.tabsList}`]: true
    });

    const classTab = classNames({
        'react-tabs__tab': true,
        [`${styles.tab}`]: true
    });

    return (
        <div>
            <Header />

            {/* Big Background Image */}
            <img src={Trilobite} className={styles.mainBackground} />

            <Container fluid className="vh-100">
                <Row>
                    {/* First part of Homepage, relative to screen height */}
                    <Col md={{ span: 10, offset: 1 }}>
                        {/* Search Section */}
                        <Row className={styles.searchBlock}>
                            <Col md={{ span: 6 }} className="bg-white px-4 py-3 rounded-c">
                                <Row>
                                    <Col>
                                        <h2 className={styles.searchTitle}> Search for Specimens with </h2>
                                    </Col>
                                </Row>

                                {/* Tabs with different Search options */}
                                <Tabs>
                                    <TabList className={classTabsList}>
                                        <Tab className={classTab} selectedClassName={styles.active}> Digital Specimen ID  </Tab>
                                        <Tab className={classTab} selectedClassName={styles.active}> Physical Specimen ID </Tab>
                                        <Tab className={classTab} selectedClassName={styles.active}> Collection facility </Tab>
                                        <Tab className={classTab} selectedClassName={styles.active}> Virtual collection </Tab>
                                    </TabList>

                                    {/* Search by Digital Specimen */}
                                    <TabPanel className="pt-2">
                                        <PIDSearch />
                                    </TabPanel>

                                    {/* Search by Physical Specimen */}
                                    <TabPanel>
                                        <PhysicalIDSearch />
                                    </TabPanel>

                                    {/* Search by Collection Facility */}
                                    <TabPanel>
                                        <CollectionFacilitySearch />
                                    </TabPanel>

                                    {/* Search by Virtual Collection */}
                                    <TabPanel>
                                        <VirtualCollectionSearch />
                                    </TabPanel>
                                </Tabs>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Home;