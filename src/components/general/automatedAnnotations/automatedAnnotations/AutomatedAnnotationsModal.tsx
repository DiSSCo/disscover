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
import { DigitalSpecimen, DigitalMedia, Dict } from 'app/Types';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import GetSpecimenMAS from 'api/specimen/GetSpecimenMAS';
import GetDigitalMediaMAS from 'api/digitalMedia/GetDigitalMediaMAS';

/* Import Components */
import AutomatedAnnotationsForm from './AutomatedAnnotationsForm';


/* Props Typing */
interface Props {
    automatedAnnotationsToggle: boolean,
    HideAutomatedAnnotationsModal: Function
};


const AutomatedAnnotationsModal = (props: Props) => {
    const { automatedAnnotationsToggle, HideAutomatedAnnotationsModal } = props;

    /* Hooks */
    const location = useLocation();

    /* Base variables */
    const target: DigitalSpecimen | DigitalMedia = useAppSelector(getMASTarget);
    const [targetMAS, setTargetMAS] = useState<Dict[]>([]);

    /* OnLoad: Fetch Specimen MAS */
    useEffect(() => {
        if (automatedAnnotationsToggle) {
            if (location.pathname.includes('ds')) {
                GetSpecimenMAS(target['ods:id'].replace('https://doi.org/', '')).then((specimenMAS) => {
                    setTargetMAS(specimenMAS);
                }).catch(error => {
                    console.warn(error);
                });
            } else if (location.pathname.includes('dm')) {
                GetDigitalMediaMAS(target['ods:id'].replace('https://doi.org/', '')).then((digitalMediaMAS) => {
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
                        <Tabs className="h-100 d-flex flex-column">
                            <TabList className={classTabsList}>
                                <Tab className={classTab} selectedClassName="active"> Schedule new Service </Tab>
                            </TabList>

                            {/* Run a new automated annotation service */}
                            <TabPanel className="pt-1 px-3 d-flex flex-grow-1">
                                <AutomatedAnnotationsForm availableMASList={targetMAS}
                                    HideAutomatedAnnotationsModal={() => HideAutomatedAnnotationsModal()}
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