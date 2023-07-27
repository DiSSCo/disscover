/* Import Dependencies */
import { isEmpty } from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimenDigitalMedia } from 'redux/specimen/SpecimenSlice';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Components */
import SpecimenOverview from './contentBlocks/SpecimenOverview';
import OriginalData from './contentBlocks/OriginalData';
import DigitalMedia from './contentBlocks/DigitalMedia';
import Provenance from './contentBlocks/Provenance';


const ContentBlock = () => {
    /* Base variables */
    const digitalMedia = useAppSelector(getSpecimenDigitalMedia);

    /* Class Names for Tabs */
    const classTabsList = classNames({
        [`p-0`]: true
    });

    const classTab = classNames({
        'react-tabs__tab': true,
        [`${styles.tab}`]: true
    });

    const classTabPanel = classNames({
        'react-tabs__tab-panel flex-grow-1 overflow-hidden': true
    });

    return (
        <Row className="h-100">
            <Col className="h-100">
                <Row className="h-100">
                    <Col className="h-100">
                        <Tabs className="h-100 d-flex flex-column">
                            <TabList className={classTabsList}>
                                <Tab className={classTab} selectedClassName={styles.active}>Digital Specimen</Tab>
                                <Tab className={classTab} selectedClassName={styles.active}>Original Data</Tab>
                                {!isEmpty(digitalMedia) &&
                                    <Tab className={classTab} selectedClassName={styles.active}>Digital Media</Tab>
                                }
                                <Tab className={classTab} selectedClassName={styles.active}>Provenance</Tab>
                            </TabList>

                            {/* Specimen Overview */}
                            <TabPanel className={`${classTabPanel} ${styles.specimenTabPanel}`}>
                                <SpecimenOverview />
                            </TabPanel>

                            {/* Original Data View */}
                            <TabPanel className={classTabPanel}>
                                <OriginalData />
                            </TabPanel>

                            {/* Digital Media Overview, if present */}
                            {!isEmpty(digitalMedia) &&
                                <TabPanel className={classTabPanel}>
                                    <DigitalMedia />
                                </TabPanel>
                            }

                            <TabPanel className={classTabPanel}>
                                <Provenance />
                            </TabPanel>
                        </Tabs>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default ContentBlock;