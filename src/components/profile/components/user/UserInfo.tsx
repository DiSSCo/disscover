/* Import Dependencies */
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import KeycloakService from 'keycloak/Keycloak';

/* Import Types */
import { User, Organisation } from 'global/Types';

/* Import Components */
import CustomEditIcon from 'components/general/icons/CustomEditIcon';
import UserInfoForm from './UserInfoForm';

/* Import API */
import GetOrganisations from 'api/organisation/GetOrganisations';


/* Props Typing */
interface Props {
    userProfile: User,
    SetUserProfile: Function
};


const UserInfo = (props: Props) => {
    const { userProfile, SetUserProfile } = props;

    /* OnLoad: Get organisations for options list */
    const [organisations, setorganisations] = useState<Organisation[]>([]);

    useEffect(() => {
        GetOrganisations().then((organisations) => {
            setorganisations(organisations);
        });
    }, [])

    /* Function for toggling Edit Mode */
    const [editMode, setEditMode] = useState(false);

    return (
        <Row>
            <Col md={{ span: 12 }} className="profile_userInfoBody pt-2 pb-1 border-1-primary-light rounded">
                {userProfile &&
                    <Row>
                        <Col className="col-md-auto position-relative d-flex justify-content-center">
                            <div className="profile_profilePicture rounded-circle text-center bg-primary text-white z-1">
                                {userProfile.firstName ? userProfile.firstName[0].toUpperCase() : 'U'}
                            </div>

                            <div className="profile_userInfoOutline position-absolute" />
                        </Col>
                        <Col>
                            <Row>
                                <Col className="profile_userInfoTitle py-1 fw-bold">
                                    User information <br />
                                    <span className="profile_userInfoSubTitle"> {userProfile['id']} </span>
                                </Col>

                                {KeycloakService.GetSubject() === userProfile.id &&
                                    <Col className="col-md-auto d-flex align-items-center me-1">
                                        <CustomEditIcon editMode={editMode}
                                            ToggleEditMode={() => setEditMode(!editMode)}
                                        />
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
                                            organisation:
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
                                        {Object.entries(userProfile).map((attribute, index) => {
                                            if (attribute[0] === 'organisation') {
                                                return (
                                                    <Row key={attribute[0]} className="mt-3">
                                                        <Col>
                                                            {attribute[1] ?
                                                                <> {organisations.find(organisation => organisation.ror === attribute[1])?.name} </>
                                                                : <> Unknown </>
                                                            }
                                                        </Col>
                                                    </Row>
                                                );
                                            } else if (attribute[0] !== 'id') {
                                                let margin;

                                                if (index > 1) {
                                                    margin = 'mt-3'
                                                }

                                                return (
                                                    <Row key={attribute[0]} className={`${margin}`}>
                                                        <Col>
                                                            {attribute[1] ?
                                                                <> {attribute[1]} </>
                                                                : <> Unknown </>
                                                            }
                                                        </Col>
                                                    </Row>
                                                );
                                            } else {
                                                return false;
                                            }
                                        })}
                                    </Col>
                                    : <UserInfoForm userProfile={userProfile}
                                        organisations={organisations}

                                        SetUserProfile={(userProfile: User) => SetUserProfile(userProfile)}
                                        DisableEditMode={() => setEditMode(false)}
                                    />
                                }
                            </Row>
                        </Col>
                    </Row>
                }
            </Col>
        </Row>
    );
}

export default UserInfo;