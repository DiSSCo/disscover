import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Import Components */
import CustomEditIcon from 'templates/general/icons/CustomEditIcon';

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
    const [form, setForm] = useState({
        firstName: userProfile['firstName'],
        lastName: userProfile['lastName'],
        email: userProfile['email'],
        orcid: '',
        organization: userProfile['organization'],
    })

    function UpdateForm(field, value) {
        const copyForm = { ...form };

        copyForm[[field]] = value;

        setForm(copyForm);
    }

    function SubmitForm() {
        console.log(form);

        PatchUser(UserService.getToken(), userProfile['id'], form, Process);

        function Process(result) {
            console.log(result);
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
                                : <Col>
                                    <Row className="pb-1">
                                        <Col className={`profile_input`}>
                                            <input className="profile_userInfoInput rounded-c w-75 px-2"
                                                defaultValue={userProfile['firstName']}
                                                onChange={(input) => UpdateForm('firstName', input.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-2 pb-1">
                                        <Col className={`profile_input`}>
                                            <input className="profile_userInfoInput rounded-c w-75 px-2"
                                                defaultValue={userProfile['lastName']}
                                                onChange={(input) => UpdateForm('lastName', input.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-2 pb-1">
                                        <Col className={`profile_input`}>
                                            <input className="profile_userInfoInput rounded-c w-75 px-2"
                                                defaultValue={userProfile['email']}
                                                onChange={(input) => UpdateForm('email', input.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col className={`profile_input`}>
                                            <select className="profile_userInfoInput rounded-c w-75 px-2"
                                                defaultValue={userProfile['orcid']}
                                                onChange={(input) => UpdateForm('orcid', input.target.value)}
                                            >
                                                {organizations.map((organization, i) => {
                                                    return (<option value={organization['ror']}>
                                                        {organization['name']}
                                                    </option>);
                                                })}
                                            </select>

                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col className={`profile_input`}>
                                            <input className="profile_userInfoInput rounded-c w-75 px-2"
                                                value={userProfile['orcid']}
                                                onChange={(input) => UpdateForm('orcid', input.target.value)}
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