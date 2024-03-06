/* Import Dependencies */
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, FieldArray } from 'formik';
import KeycloakService from 'keycloak/Keycloak';
import { RandomString } from 'app/Utilities';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { pushToPromptMessages } from 'redux/general/GeneralSlice';
import { getMASTarget, pushToScheduledMASJobs } from 'redux/annotate/AnnotateSlice';
import { getUser } from 'redux/user/UserSlice';

/* Import Types */
import { Dict } from 'app/Types';

/* Import API */
import ScheduleSpecimenMAS from 'api/specimen/ScheduleSpecimenMAS';
import ScheduleDigitalMediaMAS from 'api/digitalMedia/ScheduleDigitalMediaMAS';

/* Import Components */
import AutomatedAnnotationsListRecord from './AutomatedAnnotationListRecords';


/* Props Typing */
interface Props {
    availableMASList: Dict[],
    ReturnToOverview: Function
};


const AutomatedAnnotationsForm = (props: Props) => {
    const { availableMASList, ReturnToOverview } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const location = useLocation();

    /* Base variables */
    const target = useAppSelector(getMASTarget);
    const user = useAppSelector(getUser);

    /* Function for scheduling Machine Annotation Services */
    const ScheduleMachineAnnotations = (selectedMAS: string[], allowBatchingFor: { [MASid: string]: boolean } | undefined) => {
        /* Create MAS list */
        const MASList: { masId: string, batching: boolean }[] = [];

        selectedMAS.forEach((MASId) => {
            MASList.push({
                masId: MASId,
                batching: !!allowBatchingFor?.[MASId]
            });
        });

        /* Create MAS request */
        const MASRecord = {
            data: {
                type: "MasRequest",
                attributes: {
                    mass: MASList
                }
            }
        };

        /* Schedule MAS */
        if (location.pathname.includes('ds')) {
            ScheduleSpecimenMAS(target['ods:id'], MASRecord, KeycloakService.GetToken()).then((masJobRecord) => {
                /* Prompt the user the Machine Annotation Service is scheduled */
                dispatch(pushToPromptMessages({
                    key: RandomString(),
                    message: 'Machine Annotation Service, committed successfully!',
                    template: 'success'
                }));

                /* Push to scheduled MAS */
                dispatch(pushToScheduledMASJobs(masJobRecord.jobId));
            }).catch(error => {
                console.warn(error);
            });
        } else if (location.pathname.includes('dm')) {
            ScheduleDigitalMediaMAS(target['ods:id'], MASRecord, KeycloakService.GetToken()).then((masJobRecord) => {
                /* Prompt the user the Machine Annotation Service is scheduled */
                dispatch(pushToPromptMessages({
                    key: RandomString(),
                    message: 'Machine Annotation Service, committed successfully!',
                    template: 'success'
                }));

                /* Push to scheduled MAS */
                dispatch(pushToScheduledMASJobs(masJobRecord.jobId));
            }).catch(error => {
                console.warn(error);
            });
        }

        /* Return to overview tab */
        ReturnToOverview();
    }

    /* ClassNames */
    const classScheduleButton = classNames({
        'secondaryButton px-3 py-1': true,
        'disabled': !user.orcid
    });

    return (

        <Formik initialValues={{
            selectedMAS: [] as string[],
            MASList: '',
            allowBatchingFor: {} as { [MASid: string]: boolean }
        }}
            onSubmit={async (values) => {
                await new Promise((resolve) => setTimeout(resolve, 100));

                /* Schedule Machine Annotation Services */
                ScheduleMachineAnnotations(values.selectedMAS, values.allowBatchingFor);
            }}
        >
            {({ values, setFieldValue }) => (
                <Form className="h-100">
                    <div className="h-100 d-flex flex-column">
                        <Row className="flex-grow-1">
                            <Col>
                                {/* Machine Annotation Services explanation */}
                                <Row>
                                    <Col>
                                        <div className="fs-4 bgc-greyLight px-3 py-2">
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
                                                            <Field as="select"
                                                                name="MASList"
                                                                className="formField w-75 mt-1 fs-4"
                                                                onChange={(event: Dict) => push(event.target.value)}
                                                            >
                                                                {availableMASList.length > 0 ?
                                                                    <>
                                                                        <option value="" disabled={true}>
                                                                            Select MAS
                                                                        </option>

                                                                        {availableMASList.map((MASOption) => {
                                                                            if (!(values.selectedMAS.includes(MASOption.id))) {
                                                                                return (
                                                                                    <option key={MASOption.id} value={MASOption.id}>
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
                                                            <AutomatedAnnotationsListRecord values={values}
                                                                availableMASList={availableMASList}
                                                                SetFieldValue={(field: string, value: Dict) => setFieldValue(field, value)}
                                                                Remove={(index: number) => remove(index)}
                                                            />
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
                            <Col className="col-md-auto">
                                <button type="submit"
                                    className={classScheduleButton}
                                    disabled={!user.orcid}
                                >
                                    Schedule
                                </button>
                            </Col>
                            {!user.orcid &&
                                <Col>
                                    <p className="fs-5">
                                        A user is required to link their ORCID to schedule Machine Annotation Services, please confirm this action in your profile
                                    </p>
                                </Col>
                            }
                        </Row>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default AutomatedAnnotationsForm;