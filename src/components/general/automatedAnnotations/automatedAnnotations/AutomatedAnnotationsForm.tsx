/* Import Dependencies */
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, FieldArray } from 'formik';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getMASTarget } from 'redux/annotate/AnnotateSlice';

/* Import Types */
import { Dict } from 'global/Types';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

/* Import API */
import ScheduleSpecimenMAS from 'api/specimen/ScheduleSpecimenMAS';
import ScheduleDigitalMediaMAS from 'api/digitalMedia/ScheduleDigitalMediaMAS';


/* Props Typing */
interface Props {
    availableMASList: Dict[],
    HideAutomatedAnnotationsModal: Function
};


const AutomatedAnnotationsForm = (props: Props) => {
    const { availableMASList, HideAutomatedAnnotationsModal } = props;

    /* Hooks */
    const location = useLocation();

    /* Base variables */
    const target = useAppSelector(getMASTarget);

    /* Function for scheduling Machine Annotation Services */
    const ScheduleMachineAnnotations = (selectedMAS: string[]) => {
        /* Create MAS request */
        const MASRecord = {
            data: {
                type: "MasRequest",
                attributes: {
                    mass: selectedMAS
                }
            }
        };

        /* Schedule MAS */
        if (location.pathname.includes('ds')) {
            ScheduleSpecimenMAS(target.id, MASRecord, KeycloakService.GetToken()).then((specimenMAS) => {
                /* Do something when the machine annotation service finishes */
                console.log(specimenMAS);
            }).catch(error => {
                console.warn(error);
            });
        } else if (location.pathname.includes('dm')) {
            ScheduleDigitalMediaMAS(target.id, MASRecord, KeycloakService.GetToken()).then((digitalMediaMAS) => {
                /* Do something when the machine annotation service finishes */
                console.log(digitalMediaMAS);
            }).catch(error => {
                console.warn(error);
            });
        }

        /* Hide MAS Modal */
        HideAutomatedAnnotationsModal();
    }

    return (

        <Formik initialValues={{
            selectedMAS: [] as string[],
            MASList: ""
        }}
            onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 100));

                /* Schedule Machine Annotation Services */
                ScheduleMachineAnnotations(values.selectedMAS);
            }}
        >
            {({ values }) => (
                <Form className="h-100">
                    <div className="h-100 d-flex flex-column">
                        <Row className="flex-grow-1">
                            <Col>

                                {/* Machine Annotation Services explanation */}
                                <Row>
                                    <Col>
                                        <div className={`${styles.automatedAnnotationsDescription} bgc-greyLight px-3 py-2`}>
                                            Machine Annotation Services (MAS) are automated services that can be deployed upon different objects like
                                            specimens and images. The services have the general purpose of enriching the object data by running
                                            different algorithms or AI over the data to detect certain kind of traits. The identified traits will be treated
                                            as annotations to the object, which can be viewed in the annotations overview.
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <FieldArray name="selectedMAS">
                                            {({ push, remove }) => (
                                                <>
                                                    <Row>
                                                        <Col>
                                                            <p className="formFieldTitle"> Choose MAS to schedule </p>
                                                            <Field name="MASList" as="select"
                                                                className="formField w-75 mt-1"
                                                            >
                                                                {availableMASList.length > 0 ?
                                                                    <>
                                                                        <option value="" disabled={true}>
                                                                            Select MAS
                                                                        </option>

                                                                        {availableMASList.map((MASOption) => {
                                                                            if (!(values.selectedMAS.includes(MASOption.id))) {
                                                                                return (
                                                                                    <option key={MASOption.id} value={MASOption.id}
                                                                                        onClick={() => {
                                                                                            push(MASOption.id);
                                                                                        }}
                                                                                    >
                                                                                        {MASOption.attributes.mas.name}
                                                                                    </option>
                                                                                );
                                                                            }
                                                                        })}
                                                                    </>
                                                                    : <option value="" disabled={true}> No MAS available </option>
                                                                }
                                                            </Field>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mt-3">
                                                        <Col>
                                                            {/* Show all chosen Machine annotation services */}
                                                            {values.selectedMAS.map((MASid, index) => {
                                                                const MAS = availableMASList.find(MASOption => MASOption.id === MASid) as Dict;

                                                                return (
                                                                    <div key={MASid}
                                                                        className={`${styles.automatedAnnotationsSelectedBlock} px-3 py-2`}
                                                                    >
                                                                        <Row>
                                                                            <Col>
                                                                                <p className="fw-lightBold"> {MAS.attributes.mas.name} </p>
                                                                            </Col>
                                                                            <Col className="col-md-auto">
                                                                                <button type="button" className="removeButton">
                                                                                    <FontAwesomeIcon icon={faX} className="px-2"
                                                                                        onClick={() => remove(index)}
                                                                                    />
                                                                                </button>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col md={{ span: 8 }}>
                                                                                <p className={styles.automatedAnnotationsDescription}>
                                                                                    {MAS.attributes.mas.serviceDescription}
                                                                                </p>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                );
                                                            })}
                                                        </Col>
                                                    </Row>
                                                </>
                                            )}
                                        </FieldArray>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button type="submit" className="secondaryButton px-3 py-1">
                                    Schedule
                                </button>
                            </Col>
                        </Row>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default AutomatedAnnotationsForm;