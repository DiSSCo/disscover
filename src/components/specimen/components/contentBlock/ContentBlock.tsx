/* Import Dependencies */
import { isEmpty } from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimen, getSpecimenDigitalMedia } from 'redux/specimen/SpecimenSlice';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Components */
import SpecimenOverview from './SpecimenOverview';
import OriginalData from './OriginalData';
import DigitalMedia from './DigitalMedia';
import Provenance from './Provenance';


/* Props Typing */
interface Props {
    ToggleModal: Function
};


const ContentBlock = (props: Props) => {
    const { ToggleModal } = props;

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const digitalMedia = useAppSelector(getSpecimenDigitalMedia);

    /* Class Name for Tabs */
    const classTabsList = classNames({
        [`${styles.tabsList}`]: true
    });

    const classTab = classNames({
        'react-tabs__tab': true,
        [`${styles.tab}`]: true
    });

    const classTabPanel = classNames({
        'react-tabs__tab-panel': true,
        [`${styles.tabPanel}`]: true
    });

    return (
        <Row className="h-100">
            <Col className="h-100">
                {/* <Row className="justify-content-end">
                    <Col className="col-md-auto">
                        
                    </Col>
                </Row> */}
                <Row className="h-100">
                    <Col className="h-100">
                        <Tabs className="h-100">
                            <TabList className={classTabsList}>
                                <Tab className={classTab} selectedClassName={styles.active}>Digital Specimen</Tab>
                                <Tab className={classTab} selectedClassName={styles.active}>Original Data</Tab>
                                {!isEmpty(digitalMedia) &&
                                    <Tab className={classTab} selectedClassName={styles.active}>Digital Media</Tab>
                                }
                                <Tab className={classTab} selectedClassName={styles.active}>Provenance</Tab>

                                <a href={`https://sandbox.dissco.tech/api/v1/specimens/${specimen.id}`} target="_blank" rel="noreferrer" className="w-100">
                                    <button type="button"
                                        className={`${styles.jsonButton} primaryButton`}
                                    >
                                        View JSON
                                    </button>
                                </a>
                            </TabList>

                            {/* Specimen Overview */}
                            <TabPanel className={classTabPanel}>
                                <SpecimenOverview ToggleModal={(property: string) => ToggleModal(property)} />
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