/* Import Dependencies */
import { useEffect, useState } from 'react';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getUserProfile, setUserProfile, getUserProfileAnnotations } from 'redux/user/UserSlice';

/* Import Types */
import { User, Organisation } from 'global/Types';

/* Import Styles */
import styles from 'components/profile/profile.module.scss';

/* Import Components */
import CustomEditIcon from 'components/general/icons/CustomEditIcon';
import UserInfoForm from './UserInfoForm';

/* Import API */
import GetOrganisations from 'api/organisation/GetOrganisations';


const UserInfo = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const userProfile = useAppSelector(getUserProfile);
    const userProfileAnnotations = useAppSelector(getUserProfileAnnotations);

    /* OnLoad: Get Organisations for options list */
    const [organisations, setOrganisations] = useState<Organisation[]>([]);

    useEffect(() => {
        GetOrganisations().then((organisations) => {
            setOrganisations(organisations);
        });
    }, [])

    /* Function for toggling Edit Mode */
    const [editMode, setEditMode] = useState(false);

    return (
        <Row>
            <Col md={{ span: 12 }}>
                <Row className="my-3 px-3">
                    <Col md={{ span: 6 }}>
                        <div className={`${styles.profileLeftBlock} p-2`}>
                            <Row>
                                <Col>
                                    <p className="fw-bold"> User information </p>
                                </Col>
                                <Col className="col-md-auto">
                                    {KeycloakService.GetSubject() === userProfile.id &&
                                        <Col className="col-md-auto pe-2 pt-1">
                                            <CustomEditIcon editMode={editMode}
                                                ToggleEditMode={() => setEditMode(!editMode)}
                                            />
                                        </Col>
                                    }
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col className={`${styles.profileText} col-md-auto`}>
                                    <p> First name: </p>

                                    <p className="mt-3"> Last name: </p>

                                    <p className="mt-3"> Email address: </p>

                                    <p className="mt-3"> Organisation: </p>

                                    <p className="mt-3"> ORCID: </p>
                                </Col>

                                {!editMode ?
                                    <Col className={`${styles.profileText}`}>
                                        <p> {userProfile.firstName} </p>

                                        <p className="mt-3"> {userProfile.lastName} </p>

                                        <p className="mt-3"> {userProfile.email} </p>

                                        <p className="mt-3">
                                            <> {organisations.find(organisation => organisation.ror === userProfile.organisation)?.name} </>
                                        </p>

                                        <p className="mt-3"> {userProfile.orcid} </p>
                                    </Col>
                                    : <UserInfoForm userProfile={userProfile}
                                        organisations={organisations}

                                        SetUserProfile={(userProfile: User) => dispatch(setUserProfile(userProfile))}
                                        DisableEditMode={() => setEditMode(false)}
                                    />
                                }
                            </Row>
                        </div>
                    </Col>
                    <Col md={{ span: 6 }}>
                        <div className={`${styles.profileRightBlock} p-2`}>
                            <Row>
                                <Col>
                                    <p className="fw-bold"> Statistics </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p> Annotations: {userProfileAnnotations.length} </p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row className="px-3">
                    <Col md={{ span: 3 }}>
                        <a href={`https://orcid.org/${userProfile.orcid}`} target="_blank" rel="noreferrer">
                            <button type="button" className={`${styles.profileExternalButton} w-100`}>
                                ORCID
                            </button>
                        </a>
                    </Col>
                    <Col md={{ span: 3 }}>
                        <a href={`https://bionomia.net/${userProfile.orcid}`} target="_blank" rel="noreferrer">
                            <button type="button" className={`${styles.profileExternalButton} w-100`}>
                                Bionomia
                            </button>
                        </a>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default UserInfo;