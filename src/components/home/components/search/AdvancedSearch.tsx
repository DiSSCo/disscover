/* Import Dependencies */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/home/home.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import PIDSearch from "./PIDSearch";
import PhysicalIDSearch from "./PhysicalIDSearch";
import CollectionFacilitySearch from './CollectionFacilitySearch';
import VirtualCollectionSearch from './VirtualCollectionSearch';


/* Props Typing */
interface Props {
    HideAdvancedSearch: Function
};


const AdvancedSearch = (props: Props) => {
    const { HideAdvancedSearch } = props;
    
    /* Class Name for Tabs */
    const classTabsList = classNames({
        [`${styles.tabsList}`]: true
    });

    const classTab = classNames({
        'react-tabs__tab': true,
        [`${styles.tab}`]: true
    });

    return (
        <Row className="bg-white pe-3">
            <Col>
                <Row>
                    <Col>
                        <h2 className={styles.advancedSearchTitle}> Advanced search </h2>
                    </Col>
                    <Col className="col-md-auto">
                        <FontAwesomeIcon icon={faX}
                            className={styles.advancedSearchCloseIcon}
                            onClick={() => HideAdvancedSearch()}
                        />
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
    );
}

export default AdvancedSearch;