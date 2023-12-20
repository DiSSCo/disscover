/* Import Depdencies */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import { Row, Col, Modal } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getMASTarget } from 'redux/annotate/AnnotateSlice';

/* Impor Types */
import { Dict } from 'app/Types';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalEntity } from 'app/types/DigitalEntity';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import GetSpecimenMAS from 'api/specimen/GetSpecimenMAS';
import GetDigitalMediaMAS from 'api/digitalMedia/GetDigitalMediaMAS';

/* Import Components */
import AutomatedAnnotationsOverview from './AuomatedAnnotationsOverview';
import AutomatedAnnotationsForm from './AutomatedAnnotationsForm';


/* Props Typing */
interface Props {
    targetId: string,
    automatedAnnotationsToggle: boolean,
    HideAutomatedAnnotationsModal: Function,
    GetMachineJobRecords: (targetId: string, pageSize: number, pageNumber: number) => Promise<{machineJobRecords: Dict[], links: Dict}>
};


const AutomatedAnnotationsModal = (props: Props) => {
    const { targetId, automatedAnnotationsToggle, HideAutomatedAnnotationsModal, GetMachineJobRecords } = props;

    /* Hooks */
    const location = useLocation();

    /* Base variables */
    const target: DigitalSpecimen | DigitalEntity = useAppSelector(getMASTarget);
    const [targetMAS, setTargetMAS] = useState<Dict[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    /* OnLoad: Fetch Specimen MAS */
    useEffect(() => {
        if (automatedAnnotationsToggle) {
            if (location.pathname.includes('ds')) {
                GetSpecimenMAS(target['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')).then((specimenMAS) => {
                    setTargetMAS(specimenMAS);
                }).catch(error => {
                    console.warn(error);
                });
            } else if (location.pathname.includes('dm')) {
                GetDigitalMediaMAS(target['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')).then((digitalMediaMAS) => {
                    setTargetMAS(digitalMediaMAS);
                }).catch(error => {
                    console.warn(error);
                });
            }
        }
    }, [automatedAnnotationsToggle]);

    /* Class Name for Tabs */
    const classTabsList = classNames({
        'tabsList': true
    });

    const classTab = classNames({
        'react-tabs__tab tab': true
    });

    return (
        <Modal show={automatedAnnotationsToggle} size="lg" dialogClassName="h-100"
            contentClassName={styles.automatedAnnotationsContent}
        >
            <Modal.Header className="bgc-primary c-white fw-lightBold">
                <Row className="w-100">
                    <Col>
                        <p> Automated Annotation Services </p>
                    </Col>
                    <Col className="col-md-auto pe-0">
                        <FontAwesomeIcon icon={faX}
                            className="c-pointer"
                            onClick={() => HideAutomatedAnnotationsModal()}
                        />
                    </Col>
                </Row>
            </Modal.Header>
            <Modal.Body>
                <Row className="h-100">
                    <Col>
                        <Tabs className="h-100 d-flex flex-column"
                            selectedIndex={selectedIndex}
                            onSelect={(index) => setSelectedIndex(index)}
                        >
                            <TabList className={classTabsList}>
                                <Tab className={classTab} selectedClassName='active'> Services overview </Tab>
                                <Tab className={classTab} selectedClassName="active"> Schedule a new Service </Tab>
                            </TabList>

                            {/* Overview showing all current and past services */}
                            <TabPanel className="react-tabs__tab-panel pt-1 px-3 flex-grow-1">
                                <AutomatedAnnotationsOverview targetId={targetId}
                                    GetMachineJobRecords={GetMachineJobRecords}
                                />
                            </TabPanel>

                            {/* Run a new automated annotation service */}
                            <TabPanel className="react-tabs__tab-panel pt-1 px-3 flex-grow-1">
                                <AutomatedAnnotationsForm availableMASList={targetMAS}
                                    ReturnToOverview={() => setSelectedIndex(0)}
                                />
                            </TabPanel>
                        </Tabs>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default AutomatedAnnotationsModal;