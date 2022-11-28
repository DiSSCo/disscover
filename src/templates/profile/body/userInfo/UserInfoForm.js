import { Formik, Field, Form } from "formik";
import { Row, Col } from 'react-bootstrap'


const UserInfoForm = (props) => {
    const userProfile = props.userProfile;
    const organizations = props.organizations;

    return (
        <Col>
            <Formik
                initialValues={{ 
                    firstName: "", 
                    lastName: "", 
                    email: "", 
                    organization: "", 
                    orcid: ""
                }}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    
                    props.SubmitForm(values);
                }}
            >
                <Form>
                    <Row className="pb-1">
                        <Col className="profile_input">
                            <Field name="firstName" type="text"
                                className="profile_userInfoInput rounded-c w-75 px-2"
                                value={userProfile['firstName']}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2 pb-1">
                        <Col className="profile_input">
                            <Field name="lastName" type="text"
                                className="profile_userInfoInput rounded-c w-75 px-2"
                                value={userProfile['lastName']}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2 pb-1">
                        <Col className="profile_input">
                            <Field name="email" type="email"
                                className="profile_userInfoInput rounded-c w-75 px-2"
                                value={userProfile['email']}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2 pb-1">
                        <Col className="profile_input">
                            <Field name="organization" as="select"
                                className="profile_userInfoInput rounded-c w-75 px-2"
                                value={userProfile['organization']}
                            >
                                <option value="">
                                    Select an organization
                                </option>

                                {organizations.map((organization, i) => {
                                    return (
                                        <option key={i}
                                            value={organization['ror']}
                                        >
                                            {organization['name']}
                                        </option>
                                    );
                                })}
                            </Field>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="profile_input">
                            <Field name="orcid" type="text"
                                className="profile_userInfoInput rounded-c w-75 px-2"
                                value={userProfile['orcid']}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={{ span: 3 }}>
                            <button className="bg-primary-blue border-0 rounded-c w-100 text-white"
                                type="submit"
                            >
                                Save
                            </button>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </Col>
    );
}

export default UserInfoForm;