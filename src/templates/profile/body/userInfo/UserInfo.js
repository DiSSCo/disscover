import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Import Components */
import CustomEditIcon from 'templates/general/icons/CustomEditIcon';


const UserInfo = (props) => {
    const userProfile = props.userProfile;

    const [editMode, setEditMode] = useState(false);

    /* Form handling */
    const [form, setForm] = useState({
        givenName: userProfile['givenName'],
        familyName: userProfile['familyName'],
        email: userProfile['email'],
        organization: userProfile['organization']
    })

    function UpdateForm(field, value) {
        const copyForm = { ...form };

        copyForm[[field]] = value;

        setForm(copyForm);
    }

    function SubmitForm() {
        console.log(form);
    }

    return (
        <Row>
            <Col md={{ span: 12 }} className="profile_userInfoBody pt-2 pb-1 border-1-primary-light rounded">
                <Row>
                    <Col className="col-md-auto position-relative d-flex justify-content-center">
                        <div className="profile_profilePicture rounded-circle text-center bg-primary text-white z-1">
                            {userProfile['givenName'] ?
                                <> {userProfile['givenName'][0].toUpperCase()} </>
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
                                        First name(s):
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        Last name(s):
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
                            </Col>
                            {!editMode ?
                                <Col>
                                    <Row>
                                        <Col>
                                            {userProfile['givenName'] ?
                                                <> {userProfile['givenName']} </>
                                                : <> Unknown </>
                                            }
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            {userProfile['familyName'] ?
                                                <> {userProfile['familyName']} </>
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
                                </Col>
                                : <Col>
                                    <Row className="pb-1">
                                        <Col className={`profile_input`}>
                                            <input className="profile_userInfoInput rounded-c w-75 px-2"
                                                value={userProfile['givenName']}
                                                onChange={(input) => UpdateForm('givenName', input.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-2 pb-1">
                                        <Col className={`profile_input`}>
                                            <input className="profile_userInfoInput rounded-c w-75 px-2"
                                                value={userProfile['familyName']}
                                                onChange={(input) => UpdateForm('familyName', input.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-2 pb-1">
                                        <Col className={`profile_input`}>
                                            <input className="profile_userInfoInput rounded-c w-75 px-2"
                                                value={userProfile['email']}
                                                onChange={(input) => UpdateForm('email', input.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col className={`profile_input`}>
                                            <input className="profile_userInfoInput rounded-c w-75 px-2"
                                                value={userProfile['organization']}
                                                onChange={(input) => UpdateForm('organization', input.target.value)}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-3">
                                        <Col md={{ span: 3 }}>
                                            <button className="bg-primary-blue border-0 rounded-c w-100 text-white"
                                                onClick={() => SubmitForm()}
                                            >
                                                Save
                                            </button>
                                        </Col>
                                    </Row>
                                </Col>
                            }
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default UserInfo;