/* Import Dependencies */
import { Formik, Field, Form } from 'formik';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap'

/* Import Types */
import { User, Organisation } from 'global/Types';

/* Import API */
import PatchUser from 'api/user/PatchUser';


/* Props Typing */
interface Props {
    userProfile: User,
    organisations: Organisation[],
    SetUserProfile: Function,
    DisableEditMode: Function
};


const UserInfoForm = (props: Props) => {
    const { userProfile, organisations, SetUserProfile, DisableEditMode } = props;

    return (
        <Col>
            <Formik
                initialValues={{ 
                    firstName: userProfile.firstName? userProfile.firstName : '', 
                    lastName: userProfile.lastName? userProfile.lastName : '', 
                    email: userProfile.email ? userProfile.email : '', 
                    organisation: userProfile.organisation ? userProfile.organisation : '', 
                    orcid: userProfile.orcid ? userProfile.orcid : ''
                }}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    
                    PatchUser(userProfile.id, values, KeycloakService.GetToken()).then((userProfile) => {
                        SetUserProfile(userProfile);

                        DisableEditMode();
                    });
                }}
            >
                <Form>
                    <Row className="pb-1">
                        <Col className="profile_input">
                            <Field name="firstName" type="text"
                                className="profile_userInfoInput rounded-c w-75 px-2"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2 pb-1">
                        <Col className="profile_input">
                            <Field name="lastName" type="text"
                                className="profile_userInfoInput rounded-c w-75 px-2"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2 pb-1">
                        <Col className="profile_input">
                            <Field name="email" type="email"
                                className="profile_userInfoInput rounded-c w-75 px-2"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2 pb-1">
                        <Col className="profile_input">
                            <Field name="organisation" as="select"
                                className="profile_userInfoInput rounded-c w-75 px-2"
                            >
                                <option value="">
                                    Select an organisation
                                </option>

                                {organisations.map((organisation) => {
                                    return (
                                        <option key={organisation.ror}
                                            value={organisation.ror}
                                        >
                                            {organisation.name}
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