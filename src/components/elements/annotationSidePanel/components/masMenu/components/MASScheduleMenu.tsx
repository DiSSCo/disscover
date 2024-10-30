/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form } from "formik";
import { Row, Col, Card } from "react-bootstrap";
import Select from 'react-select';

/* Import Hooks */
import { useNotification } from "app/Hooks";

/* Import Types */
import { MachineAnnotationService } from "app/types/MachineAnnotationService";
import { DropdownItem, Dict } from "app/Types";

/* Import Icons */
import { faX } from "@fortawesome/free-solid-svg-icons";

/* Import Components */
import { Button } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    digitalObjectId: string,
    mass: MachineAnnotationService[],
    SetLoading: Function,
    ScheduleMASs: Function,
    ReturnToOverview: Function
};


/**
 * Component that renders the schedule part of the MAS menu
 * @param digitalObjectId The identifier of the super class digital object
 * @param mass A list of potential MASs to be executed on the digital object
 * @param SetLoading Function to set the loading state of the annotation side panel
 * @param ScheduleMASs Function to schedule MASs
 * @param ReturnToOverview Function to return to the MAS overview
 * @returns JSX Component
 */
const MASScheduleMenu = (props: Props) => {
    const { digitalObjectId, mass, SetLoading, ScheduleMASs, ReturnToOverview } = props;

    /* Hooks */
    const notification = useNotification();

    /* Base variables */
    const initialFormValues: {
        scheduledMAS: DropdownItem[]
    } = {
        scheduledMAS: []
    };

    /**
     * 
     */
    const DeselectMAS = (mas: MachineAnnotationService, values: Dict, SetFieldValue: Function) => {
        values.scheduledMAS.splice(values.scheduledMAS.findIndex(
            (masOption: DropdownItem) => masOption.value === mas["ods:ID"]
        ), 1);

        SetFieldValue('scheduledMAS', values.scheduledMAS);
    };

    /* Construct dropdown items */
    const dropdownItems: DropdownItem[] = mass.map(mass => ({
        label: mass['schema:name'],
        value: mass['ods:ID']
    }));

    return (
        <div className="h-100 d-flex flex-column">
            {/* Explanation text */}
            <Row>
                <Col>
                    <div className="bgc-grey-light px-3 py-2">
                        <p className="fs-5">
                            Machine Annotation Services (MAS) are automated services that can be deployed upon different objects
                            like specimens and images. The services have the general purpose of enriching the object data by running
                            different algorithms or AI over the data to detect certain kind of traits. The identified traits will be
                            treated as annotations to the object, which can be viewed in the annotations overview.
                        </p>
                    </div>
                </Col>
            </Row>
            <Row className="flex-grow-1 mt-4 overflow-hidden">
                <Col className="h-100">
                    {/* Schedule MAS form */}
                    <Formik initialValues={initialFormValues}
                        onSubmit={async (values) => {
                            await new Promise((resolve) => setTimeout(resolve, 100));

                            /* Start loading */
                            SetLoading(true);

                            /* Construct MAS list */
                            const masList = values.scheduledMAS.map(mas => ({
                                masId: mas.value
                            }));

                            try {
                                await ScheduleMASs({
                                    handle: digitalObjectId,
                                    masList: masList
                                });

                                ReturnToOverview();
                            } catch {
                                notification.Push({
                                    key: `mass-${Math.random()}`,
                                    message: `Failed to schedule MASs. Please try again.`,
                                    template: 'error'
                                });
                            } finally {
                                /* Stop loading */
                                SetLoading(false);
                            };
                        }}
                    >
                        {({ values, setFieldValue }) => (
                            <Form className="h-100 d-flex flex-column">
                                {/* Select MAS to schedule */}
                                <Row>
                                    <Col>
                                        <p className="mb-1 fs-4">
                                            Select one or multiple Machine Annotation Services to schedule
                                        </p>
                                        <Select options={dropdownItems}
                                            isMulti={true}
                                            onChange={(options) => setFieldValue(`scheduledMAS`, options)}
                                        />
                                    </Col>
                                </Row>
                                {/* Display selected MAS */}
                                <Row className="flex-grow-1 py-3 overflow-scroll">
                                    <Col>
                                        {values.scheduledMAS.map((masOption, index) => {
                                            const mas = mass.find(mas => mas["ods:ID"] === masOption.value);

                                            if (mas) {
                                                return (
                                                    <Row key={mas["ods:ID"]}
                                                        className={index >= 1 ? 'mt-2' : ''}
                                                    >
                                                        <Col>
                                                            <Card className="px-3 py-2">
                                                                <Row>
                                                                    <Col>
                                                                        {/* MAS title */}
                                                                        <p className="fs-4 fw-lightBold">
                                                                            {mas?.["schema:name"]}
                                                                        </p>
                                                                        {/* MAS description */}
                                                                        <p className="fs-5">
                                                                            {mas?.["schema:description"]}
                                                                        </p>
                                                                    </Col>
                                                                    <Col lg="auto">
                                                                        <Button type="button"
                                                                            variant="blank"
                                                                            className="px-0 py-0"
                                                                            OnClick={() => {
                                                                                DeselectMAS(mas, values, setFieldValue);
                                                                            }}
                                                                        >
                                                                            <FontAwesomeIcon icon={faX}
                                                                                className="tc-grey"
                                                                            />
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                );
                                            }
                                        })}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex justify-content-end">
                                        <Button type="submit"
                                            variant="primary"
                                            disabled={!values.scheduledMAS.length}
                                        >
                                            <p>
                                                Schedule
                                            </p>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </div>
    );
};

export default MASScheduleMenu;