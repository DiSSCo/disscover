import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Import Components */
import CustomEditIcon from 'templates/general/icons/CustomEditIcon';
import UserInfoForm from './UserInfoForm';

/* Import API */
import PatchUser from 'api/user/PatchUser';
import GetOrganizations from 'api/organization/GetOrganizations';


const UserInfo = (props) => {
    const userProfile = props.userProfile;

    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        GetOrganizations(Process);

        function Process(organizations) {
            setOrganizations(organizations);
        }
    }, [])

    const [editMode, setEditMode] = useState(false);

    /* Form handling */
    function SubmitForm(attributes) {
        if (attributes) {
            PatchUser(UserService.getToken(), userProfile['id'], attributes, Process);

            function Process(_result) {
                /* Do something */
            }
        }
    }

    return (
        <Row>
            <Col md={{ span: 12 }} className="profile_userInfoBody pt-2 pb-1 border-1-primary-light rounded">
                <Row>
                    <Col className="col-md-auto position-relative d-flex justify-content-center">
                        <div className="profile_profilePicture rounded-circle text-center bg-primary text-white z-1">
                            {userProfile['firstName'] ?
                                <> {userProfile['firstName'][0].toUpperCase()} </>
                                : <> {userProfile['username'][0].toUpperCase()} </>
                            }
                        </div>

                        <div className="profile_userInfoOutline position-absolute" />
                    </Col>
                    <Col>
                        <Row>
                            <Col className="profile_userInfoTitle py-1 fw-bold">
                                User information <br />
                                <span className="profile_userInfoSubTitle"> {userProfile['id']} </span>
                            </Col>

                            {UserService.getSubject() === userProfile['id'] &&
                                <Col className="col-md-auto d-flex align-items-center me-1">
                                    <CustomEditIcon ToggleEditMode={() => setEditMode(!editMode)} />
                                </Col>
                            }
                        </Row>

                        <Row className="my-2">
                            <Col className="col-md-auto pe-0">
                                <Row>
                                    <Col>
                                        First name:
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        Last name:
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        Email address:
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        Organization:
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        ORCID:
                                    </Col>
                                </Row>
                            </Col>
                            {!editMode ?
                                <Col>
                                    <Row>
                                        <Col>
                                            {userProfile['firstName'] ?
                                                <> {userProfile['firstName']} </>
                                                : <> Unknown </>
                                            }
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            {userProfile['lastName'] ?
                                                <> {userProfile['lastName']} </>
                                                : <> Unknown </>
                                            }
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            {userProfile['email'] ?
                                                <> {userProfile['email']} </>
                                                : <> Unknown </>
                                            }
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            {userProfile['organization'] ?
                                                <> {userProfile['organization']} </>
                                                : <> Unknown </>
                                            }
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            {userProfile['orcid'] ?
                                                <> {userProfile['orcid']} </>
                                                : <> </>
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                : <UserInfoForm userProfile={userProfile}
                                    organizations={organizations}

                                    SubmitForm={(attributes) => SubmitForm(attributes)}
                                />
                            }
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default UserInfo;