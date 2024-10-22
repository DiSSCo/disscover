/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field } from "formik";
import { Row, Col, Card } from "react-bootstrap";
import Select from 'react-select';

/* Import Types */
import { MachineAnnotationService } from "app/types/MachineAnnotationService";
import { DropdownItem } from "app/Types";

/* Import Icons */
import { faX } from "@fortawesome/free-solid-svg-icons";

/* Import Components */
import { Button } from "components/elements/customUI/CustomUI";


/* Props Type */
type Props = {
    mass: MachineAnnotationService[]
};


/**
 * Component that renders the schedule part of the MAS menu
 * @param mass A list of potential MASs to be executed on the digital object
 * @returns JSX Component
 */
const MASScheduleMenu = (props: Props) => {
    const { mass } = props;

    /* Base variables */
    const initialFormValues: {
        scheduledMAS: DropdownItem[],
        allowBatchingFor: {
            [MASId: string]: boolean
        }
    } = {
        scheduledMAS: [],
        allowBatchingFor: {}
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
            <Row className="flex-grow-1 mt-4">
                <Col>
                    {/* Schedule MAS form */}
                    <Formik initialValues={initialFormValues}
                        onSubmit={async (values) => {
                            await new Promise((resolve) => setTimeout(resolve, 100));

                            console.log(values);
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
                                        {values.scheduledMAS.map(masOption => {
                                            const mas = mass.find(mas => mas["ods:ID"] === masOption.value);

                                            if (mas) {
                                                return (
                                                    <Row>
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
                                                                        {/* Allow batch annotations checkbox */}
                                                                        <Row className="mt-3">
                                                                            <Col lg="auto"
                                                                                className="pe-0"
                                                                            >
                                                                                <Field type="checkbox"
                                                                                    name={`allowBatchingFor[${mas["ods:ID"].replace(import.meta.env.VITE_HANDLE_URL, '')}]`}
                                                                                />
                                                                            </Col>
                                                                            <Col className="d-flex align-items-center">
                                                                                <Button type="button"
                                                                                    variant="blank"
                                                                                    className="px-0 py-0"
                                                                                    OnClick={() => {
                                                                                        setFieldValue(
                                                                                            `allowBatchingFor[${mas['ods:ID'].replace(import.meta.env.VITE_HANDLE_URL, '')}]`,
                                                                                            !values.allowBatchingFor[mas['ods:ID'].replace(import.meta.env.VITE_HANDLE_URL, '')]
                                                                                        )
                                                                                    }}
                                                                                >
                                                                                    <p className="fs-4">
                                                                                        Allow batching
                                                                                    </p>
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col lg="auto">
                                                                        <Button type="button"
                                                                            variant="blank"
                                                                            className="px-0 py-0"
                                                                            OnClick={() => {
                                                                                // const localValues = values.allowBatchingFor)
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