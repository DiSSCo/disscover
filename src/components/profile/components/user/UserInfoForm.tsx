/* Import Dependencies */
import { Formik, Field, Form } from 'formik';
import KeycloakService from 'keycloak/Keycloak';
import { isEmpty } from 'lodash';
import { Row, Col } from 'react-bootstrap'

/* Import Types */
import { User } from 'app/Types';

/* Import Styles */
import styles from 'components/profile/profile.module.scss';

/* Import API */
import PatchUser from 'api/user/PatchUser';


/* Props Typing */
interface Props {
    userProfile: User,
    organisations: string[],
    SetUserProfile: Function,
    DisableEditMode: Function
};


const UserInfoForm = (props: Props) => {
    const { userProfile, organisations, SetUserProfile, DisableEditMode } = props;

    return (
        <Col className="fs-4 px-4">
            <Formik
                initialValues={{
                    firstName: userProfile.firstName ? userProfile.firstName : '',
                    lastName: userProfile.lastName ? userProfile.lastName : '',
                    email: userProfile.email ? userProfile.email : '',
                    organisationName: userProfile.organisation ?? '',
                    orcid: userProfile.orcid ? userProfile.orcid : ''
                }}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));

                    PatchUser(userProfile.id, values, KeycloakService.GetToken()).then((userProfile) => {
                        if (!isEmpty(userProfile)) {
                            SetUserProfile(userProfile);
                        }

                        DisableEditMode();
                    });
                }}
            >
                <Form>
                    <Row>
                        <Col>
                            <h5> Edit profile </h5>
                        </Col>
                    </Row>
                    <Row className="pb-2">
                        <p className="fs-5 c-primary fw-lightBold"> First name </p>
                        <Col className="profile_input">
                            <Field name="firstName" type="text"
                                className="b-grey rounded-c px-2 w-100"
                            />
                        </Col>
                    </Row>
                    <Row className="pb-2">
                        <p className="fs-5 c-primary fw-lightBold"> Last name </p>
                        <Col className="profile_input">
                            <Field name="lastName" type="text"
                                className="b-grey rounded-c px-2 w-100"
                            />
                        </Col>
                    </Row>
                    <Row className="pb-2">
                        <p className="fs-5 c-primary fw-lightBold"> Email </p>
                        <Col className="profile_input">
                            <Field name="email" type="email"
                                className="b-grey rounded-c px-2 w-100"
                            />
                        </Col>
                    </Row>
                    <Row className="pb-2">
                        <Col className="profile_input">
                            <p className="fs-5 c-primary fw-lightBold"> Organisation </p>
                            <Field name="organisationName" as="select"
                                className="b-grey rounded-c px-2 w-100"
                            >
                                <option value="">
                                    Select an organisation
                                </option>

                                {organisations.map((organisationName) => {
                                    return (
                                        <option key={organisationName}
                                            value={organisationName}
                                        >
                                            {organisationName}
                                        </option>
                                    );
                                })}
                            </Field>
                        </Col>
                    </Row>
                    <Row className="pb-2">
                        <Col className="profile_input">
                            <p className="fs-5 c-primary fw-lightBold"> ORCID </p>
                            <Field name="orcid" type="text"
                                className="b-grey rounded-c px-2 w-100"
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={{ span: 3 }}>
                            <button className={`${styles.userInfoSubmit} bgc-primary transition border-0 rounded-c text-white px-3`}
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