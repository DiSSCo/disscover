/* Import Dependencies */
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSpecimen, getSpecimenAnnotations, getSpecimenVersions } from 'redux/specimen/SpecimenSlice';
import { setAnnotateTarget, setSidePanelToggle, setMASTarget } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Annotation } from 'global/Types';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import BreadCrumbs from 'components/general/breadCrumbs/BreadCrumbs';
import VersionSelect from '../../general/versionSelect/VersionSelect';
import ActionsDropdown from 'components/general/actionsDropdown/ActionsDropdown';
import Tooltip from 'components/general/tooltip/Tooltip';


/* Props Typing */
interface Props {
    ShowWithAllAnnotations: Function,
    ToggleAutomatedAnnotations: Function
};


const TitleBar = (props: Props) => {
    const { ShowWithAllAnnotations, ToggleAutomatedAnnotations } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const specimenVersions = useAppSelector(getSpecimenVersions);
    const specimenAnnotations = useAppSelector(getSpecimenAnnotations);

    const specimenActions = [
        { value: 'json', label: 'View JSON' },
        { value: 'sidePanel', label: 'View all Annotations' },
        { value: 'automatedAnnotations', label: 'Trigger Automated Annotations', isDisabled: !KeycloakService.IsLoggedIn() }
    ];

    /* Function for executing Specimen Actions */
    const SpecimenActions = (action: string) => {
        switch (action) {
            case 'json':
                window.open(`https://sandbox.dissco.tech/api/v1/specimens/${specimen.id.replace('https://hdl.handle.net/', '')}`);

                return;
            case 'sidePanel':
                ShowWithAllAnnotations();

                return;
            case 'automatedAnnotations':
                /* Set MAS Target */
                dispatch(setMASTarget(specimen));

                /* Open MAS Modal */
                ToggleAutomatedAnnotations();

                return;
            default:
                return;
        }
    }

    return (
        <Row>
            <Col>
                {/* Bread Crumbs */}
                <Row>
                    <Col>
                        <BreadCrumbs />
                    </Col>
                </Row>
                {/* Title and Icon */}
                <Row className="mt-2">
                    <Col className="col-md-auto pe-1 d-flex align-items-center">
                        <FontAwesomeIcon icon={faDiamond} className={styles.titleBarIcon} />
                    </Col>
                    <Col>
                        <h2 className={styles.title}> {specimen.specimenName} </h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 3 }}>
                        {/* MIDS Blocks */}
                        <Row className="mt-2">
                            <Col className="col-md-auto d-flex align-items-center">
                                <Tooltip text="Minimum Information about a Digital Specimen" placement="top">
                                    <span>
                                        <FontAwesomeIcon icon={faCircleInfo}
                                            className={styles.midsIcon}
                                        />
                                    </span>
                                </Tooltip>
                            </Col>
                            <Col>
                                <Row>
                                    <Col md={{ span: 3 }} className="d-flex align-items-center">
                                        <div className={`${styles.midsBlock} ${specimen.midsLevel === 0 && styles.active} fw-lightBold`}>
                                            MIDS 0
                                        </div>
                                    </Col>
                                    <Col md={{ span: 3 }} className="d-flex align-items-center">
                                        <div className={`${styles.midsBlock} ${specimen.midsLevel >= 1 && styles.active} fw-lightBold`}>
                                            MIDS 1
                                        </div>
                                    </Col>
                                    <Col md={{ span: 3 }} className="d-flex align-items-center">
                                        <div className={`${styles.midsBlock} ${specimen.midsLevel >= 2 && styles.active} fw-lightBold`}>
                                            MIDS 2
                                        </div>
                                    </Col>
                                    <Col md={{ span: 3 }} className="d-flex align-items-center">
                                        <div className={`${styles.midsBlock} ${specimen.midsLevel >= 3 && styles.active} fw-lightBold`}>
                                            MIDS 3
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    {/* Specimen Versions */}
                    <Col md={{ span: 9 }} className="ps-4">
                        <Row>
                            <Col className="col-md-auto">
                                <VersionSelect target={specimen}
                                    versions={specimenVersions}
                                />
                            </Col>
                            <Col />
                            <Col className="col-md-auto d-flex justify-content-end">
                                <ActionsDropdown actions={specimenActions}
                                    Actions={(action: string) => SpecimenActions(action)}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default TitleBar;