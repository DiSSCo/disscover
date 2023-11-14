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
import DigitalMedia from './contentBlocks/DigitalMedia';
import Occurrences from './contentBlocks/Occurrences';
import Identifications from './contentBlocks/Identifications';
import OriginalData from './contentBlocks/OriginalData';


/* Props Typing */
interface Props {
    selectedTab: number,
    SetSelectedTab: Function,
    ShowWithAnnotations: Function
};


const ContentBlock = (props: Props) => {
    const { selectedTab, SetSelectedTab, ShowWithAnnotations } = props;

    /* Base variables */
    const digitalMedia = useAppSelector(getSpecimenDigitalMedia);

    /* Class Names for Tabs */
    const classTabsList = classNames({
        [`p-0 tabsList`]: true
    });

    const classTab = classNames({
        'react-tabs__tab tab': true
    });

    const classTabPanel = classNames({
        'react-tabs__tab-panel flex-grow-1 overflow-hidden': true
    });

    return (
        <Row className="h-100">
            <Col className="h-100">
                <Row className="h-100">
                    <Col className="h-100">
                        <Tabs className="h-100 d-flex flex-column"
                            selectedIndex={selectedTab}
                            onSelect={(tabIndex) => SetSelectedTab(tabIndex)}
                        >
                            <TabList className={classTabsList}>
                                <Tab className={classTab} selectedClassName="active">Digital Specimen</Tab>
                                <Tab className={`${classTab} ${isEmpty(digitalMedia) && 'd-none'}`} selectedClassName="active">Digital Media</Tab>
                                <Tab className={classTab} selectedClassName="active">Occurrences</Tab>
                                <Tab className={classTab} selectedClassName="active">Identifications</Tab>
                                <Tab className={classTab} selectedClassName="active">Entity Relationships</Tab>
                                <Tab className={classTab} selectedClassName="active">Original Data</Tab>
                            </TabList>

                            {/* Specimen Overview */}
                            <TabPanel className={`${classTabPanel} ${styles.specimenTabPanel}`}>
                                <SpecimenOverview />
                            </TabPanel>

                            {/* Digital Media Overview, if present */}
                            <TabPanel className={`${classTabPanel} ${isEmpty(digitalMedia) && 'd-none'}`}>
                                <DigitalMedia />
                            </TabPanel>

                            {/* Occurrences View */}
                            <TabPanel className={`${classTabPanel} ${'overflow-scroll'}`}>
                                <Occurrences ShowWithAnnotations={(property: string) => ShowWithAnnotations(undefined, property)} />
                            </TabPanel>

                            {/* Identifications View */}
                            <TabPanel className={classTabPanel}>
                                <Identifications ShowWithAnnotations={(property: string) => ShowWithAnnotations(undefined, property)} />
                            </TabPanel>

                            {/* Entity Relationships View */}
                            <TabPanel className={classTabPanel}>
                                
                            </TabPanel>

                            {/* Original Data View */}
                            <TabPanel className={classTabPanel}>
                                <OriginalData />
                            </TabPanel>
                        </Tabs>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default ContentBlock;