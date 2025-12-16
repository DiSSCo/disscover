/* Import Dependencies */
import { Formik, Form } from "formik";
import KeycloakService from "app/Keycloak";
import { isEmpty } from "lodash";
import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/* Import Hooks */
import { useFetch, useLoading, useNotification, useTrigger } from "app/Hooks";

/* Import Types */
import { SourceSystem } from "app/types/SourceSystem";
import { DropdownItem } from "app/Types";

/* Import API */
import ScheduleDataExport from "api/dataExport/ScheduleDataExport";
import GetSourceSystems from "api/sourceSystem/GetSourceSystems";

/* Import Components */
import { Footer } from "components/elements/Elements";
import { Button, Dropdown, LoadingScreen } from "components/elements/customUI/CustomUI";


const DataExport = () => {
    /* Hooks */
    const navigate = useNavigate();
    const fetch = useFetch();
    const loading = useLoading();
    const notification = useNotification();
    const trigger = useTrigger();

    /* Export type content */
    const description = [
        { 
            paragraph: 'Here, you may schedule an export of digital specimen data. Currently we only support the export of a list of digital specimen DOIs. This provides an easy way for institutions to download and import these in a collection management system or to include these with their DarwinCore or ABCD datasets for e.g. publication in GBIF.', 
            key: 'paragraph-one'
        },
        { 
            paragraph: 'This ensures a stable link between the specimen record in these datasets and the digital specimen, even if the physical specimen identifier changes, to avoid digital specimen duplicates.', 
            key: 'paragraph-two'
        },
        { 
            paragraph: 'Select a data export type to view more information. Once your export is ready, a download link will be sent to your email. Didn’t receive an email? Be sure to check your spam folder.', 
            key: 'paragraph-three'
        },
    ]

    /* Base variables */
    const [sourceSystemDropdownItems, setSourceSystemDropdownItems] = useState<DropdownItem[]>([]);
    const exportTypeDropdownItems: DropdownItem[] = [
        {
            label: 'List DOI',
            value: 'DOI_LIST'
        }
    ];
    const initialValues: {
        exportType: string | undefined,
        sourceSystemID: string | undefined
    } = {
        exportType: undefined,
        sourceSystemID: undefined
    };

    /* OnLoad, redirect to home if user is not logged in yet, otherwise extract digital specimen schema */
    trigger.SetTrigger(async () => {
        if (!KeycloakService.IsLoggedIn()) {
            navigate('/');
        }
    }, []);

    /* OnLoad, fetch source systems */
    fetch.Fetch({
        Method: GetSourceSystems,
        Handler: (sourceSystems: SourceSystem[]) => {
            const sourceSystemDropdownItems: DropdownItem[] = [];

            sourceSystems.forEach(sourceSytem => {
                sourceSystemDropdownItems.push({
                    label: sourceSytem['schema:name'] ?? sourceSytem['schema:identifier'],
                    value: sourceSytem['@id'] ?? sourceSytem['schema:identifier']
                });
            });

            setSourceSystemDropdownItems(sourceSystemDropdownItems);
        }
    });

    return (
        <div className="h-100 d-flex flex-column">
            <Container fluid className="flex-grow-1 overflow-hidden py-5">
                <Row className="h-100">
                    <Col lg={{ span: 6, offset: 3 }}
                        className="h-100 d-flex align-items-center"
                    >
                        <Formik initialValues={initialValues}
                            onSubmit={async (values) => {
                                await new Promise((resolve) => setTimeout(resolve, 100));

                                /* Start loading */
                                loading.Start();

                                /* Post data export request */
                                try {
                                    await ScheduleDataExport({
                                        targetType: 'https://doi.org/21.T11148/894b1e6cad57e921764e',
                                        exportType: values.exportType,
                                        dataExportKey: "$[ods:sourceSystemID]",
                                        dataExportValue: values.sourceSystemID
                                    });

                                    notification.Push({
                                        key: `dataExport_${Math.random()}`,
                                        message: 'Data Export scheduled successfully, your download link will be sent via email',
                                        template: 'success'
                                    });
                                } catch {
                                    notification.Push({
                                        key: `dataExport_${Math.random()}`,
                                        message: 'Failed to schedule the data export, please try again',
                                        template: 'error'
                                    });
                                };

                                /* End loading */
                                loading.End();
                            }}
                        >
                            {({ setFieldValue, values }) => (
                                <Form>
                                    {/* Data export card */}
                                    <Card className="w-100 px-5 py-5">
                                        {/* Title and description */}
                                        <Row>
                                            <Col>
                                                <h2 className="fs-2 mb-4 fw-lightBold">
                                                    Export Data
                                                </h2>
                                                {description.map((item) => (
                                                    <p className="fs-4 mb-4 mt-2" key={item.key}>
                                                        {item.paragraph}
                                                    </p>
                                                ))}
                                            </Col>
                                        </Row>
                                        {/* Eport type dropdown */}
                                        <Row className="mt-3">
                                            <Col>
                                                <p className="fs-4 mb-1 fw-lightBold">
                                                    Select an export type:
                                                </p>
                                                <Dropdown items={exportTypeDropdownItems}
                                                    OnChange={(exportTypeOption: DropdownItem) => setFieldValue('exportType', exportTypeOption.value)}
                                                />
                                                {values.exportType === 'DOI_LIST' &&
                                                    <p className="fs-5 mb-1 mt-3">
                                                        You will receive a download link to a CSV file with two columns: <code className="tc-primary">dcterms:identifier</code>, which represents the DOI assigned to the digital specimen, and <code className="tc-primary">ods:physicalSpecimenID</code>, the institutional identifier provided by the source system. This file enables you to match DiSSCo-assigned DOIs with the corresponding institutional identifiers.
                                                    </p>
                                                }
                                            </Col>
                                        </Row>
                                        {/* Source system dropdown */}
                                        <Row className="mt-3">
                                            <Col>
                                                <p className="fs-4 mb-1 fw-lightBold">
                                                    Select a Source System to export from:
                                                </p>
                                                {!isEmpty(sourceSystemDropdownItems) &&
                                                    <Dropdown items={sourceSystemDropdownItems}
                                                        OnChange={(sourceSystemOption: DropdownItem) => setFieldValue('sourceSystemID', sourceSystemOption.value)}
                                                    />
                                                }
                                            </Col>
                                        </Row>
                                        {/* Submit button */}
                                        <Row className="mt-5 flex-row-reverse">
                                            <Col lg="auto">
                                                <Button type="submit"
                                                    variant="primary"
                                                    disabled={!values.exportType || !values.sourceSystemID}
                                                >
                                                    <p>
                                                        Submit
                                                    </p>
                                                </Button>
                                            </Col>
                                        </Row>

                                        <LoadingScreen visible={loading.loading}
                                            displaySpinner={true}
                                        />
                                    </Card>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>

            {/* Render header*/}
            <Footer span={10}
                offset={1}
            />
        </div>
    );
};

export default DataExport;