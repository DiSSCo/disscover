/* Import Dependencies */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from 'components/profile/profile.module.scss';

/* Import Components */
import AnnotationsOverview from './tabs/AnnotationsOverview';
import MachineJobRecordsOverview from './tabs/MachineJobRecordsOverview';


const ProfileContent = () => {
    /* ClassNames */
    const classTabsList = classNames({
        'tabsList p-0': true
    });

    const classTab = classNames({
        'react-tabs__tab tab': true,
    });

    const classTabPanel = classNames({
        'react-tabs__tab-panel flex-grow-1 overflow-hidden': true
    });

    return (
        <Row className={`${styles.profileContentTabs} h-100`}>
            <Col className="h-100">
                <Tabs className="h-100 d-flex flex-column">
                    <TabList className={classTabsList}>
                        <Tab className={classTab} selectedClassName="active"> Annotations </Tab>
                        <Tab className={classTab} selectedClassName="active"> Machine Job Records </Tab>
                    </TabList>

                    {/* User Annotations */}
                    <TabPanel className={classTabPanel}>
                        <AnnotationsOverview />
                    </TabPanel>

                    {/* Machine Job Records */}
                    <TabPanel className={classTabPanel}>
                        <MachineJobRecordsOverview />
                    </TabPanel>
                </Tabs>
            </Col>
        </Row>
    );
}

export default ProfileContent;