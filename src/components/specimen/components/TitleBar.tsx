/* Import Dependencies */
import Select from 'react-select';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getSpecimen, getSpecimenVersions } from 'redux/specimen/SpecimenSlice';
import { setMASTarget } from 'redux/annotate/AnnotateSlice';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import BreadCrumbs from 'components/general/breadCrumbs/BreadCrumbs';
import VersionSelect from '../../general/versionSelect/VersionSelect';
import Tooltip from 'components/general/tooltip/Tooltip';


/* Props Typing */
interface Props {
    ToggleAutomatedAnnotations: Function
};


const TitleBar = (props: Props) => {
    const { ToggleAutomatedAnnotations } = props;

    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const specimen = useAppSelector(getSpecimen);
    const specimenVersions = useAppSelector(getSpecimenVersions);

    const specimenActions = [
        { value: 'json', label: 'View JSON' },
        { value: 'automatedAnnotations', label: 'Trigger Automated Annotations', isDisabled: !KeycloakService.IsLoggedIn() }
    ];

    /* Function for executing Specimen Actions */
    const SpecimenAction = (action: string) => {
        switch (action) {
            case 'json':
                window.open(`https://sandbox.dissco.tech/api/v1/specimens/${specimen.id.replace('https://hdl.handle.net/', '')}`);

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
                    <Col md={{ span: 9 }} className="position-relative ps-4">
                        <Row>
                            <Col className="col-md-auto">
                                <VersionSelect target={specimen}
                                    versions={specimenVersions}
                                />
                            </Col>
                            <Col>

                            </Col>
                            <Col className="col-md-auto d-flex justify-content-end">
                                <Select
                                    value={{ value: 'Actions', label: 'Actions' }}
                                    options={specimenActions}
                                    className="text-white"
                                    isSearchable={false}
                                    styles={{
                                        control: provided => ({
                                            ...provided, backgroundColor: '#4d59a2', border: 'none',
                                            borderRadius: '999px', fontWeight: '500', fontSize: '15px'
                                        }),
                                        menu: provided => ({
                                            ...provided, zIndex: 100000, fontSize: '15px', width: 'max-content',
                                            position: 'absolute', right: '0', color: '#333333'
                                        }),
                                        dropdownIndicator: provided => ({ ...provided, color: 'white', fontSize: '15px' }),
                                        singleValue: provided => ({
                                            ...provided, color: 'white'
                                        })
                                    }}
                                    onChange={(option) => { option?.value && SpecimenAction(option.value) }}
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