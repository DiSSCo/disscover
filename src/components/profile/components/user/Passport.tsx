/* Import Dependencies */
import { useEffect, useState } from 'react';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getUserProfile, setUserProfile } from 'redux/user/UserSlice';

/* Import Types */
import { User, Organisation } from 'app/Types';

/* Import Styles */
import styles from 'components/profile/profile.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faX, faEnvelope, faInstitution } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import OrganisationLogoImage from 'components/general/mediaTypes/OrganisationLogoImage'; 
import UserInfoForm from './UserInfoForm';

/* Import API */
import GetOrganisations from 'api/organisation/GetOrganisations';


const Passport = () => {
    /* Hooks */
    const dispatch = useAppDispatch();

    /* Base variables */
    const userProfile = useAppSelector(getUserProfile);
    const [organisations, setOrganisations] = useState<Organisation[]>([]);
    const [editMode, setEditMode] = useState(false);

    /* OnLoad: Get Organisations for options list and Get User Annotations */
    useEffect(() => {
        GetOrganisations().then((organisations) => {
            setOrganisations(organisations);
        }).catch(error => {
            console.warn(error);
        });
    }, [])

    return (
        <div className={`${styles.passport} d-flex flex-column bg-white h-100`}>
            <div className={`${styles.passportHead} bgc-primary position-relative d-flex justify-content-center`}>
                <div className={`${styles.profilePicture} bgc-secondary rounded-circle text-white position-absolute 
                    d-flex align-items-center justify-content-center top-0`}
                >
                    {userProfile.firstName ? userProfile.firstName[0].toUpperCase() : 'U'}
                </div>

                {KeycloakService.GetSubject() === userProfile.id &&
                    <div className="position-absolute end-0 pe-4 mt-4">
                        {editMode ?
                            <FontAwesomeIcon icon={faX} className="fs-3 c-pointer c-white"
                                onClick={() => setEditMode(false)}
                            />
                            : <FontAwesomeIcon icon={faPencil} className="fs-3 c-pointer c-white"
                                onClick={() => setEditMode(true)}
                            />
                        }
                    </div>
                }
            </div>

            {!editMode ?
                <div className="flex-grow-1">
                    {/* Passport Title */}
                    <Row className="mt-5">
                        <Col className="text-center">
                            {userProfile.firstName || userProfile.lastName ?
                                <p className="fs-3 fw-lightBold"> {userProfile.firstName} {userProfile.lastName} </p>
                                : <p> User </p>
                            }

                            <p className="fs-4 c-greyDark"> {userProfile.id} </p>
                        </Col>
                    </Row>

                    {/* User info */}
                    <Row className="mt-5">
                        <Col lg={{ span: 10, offset: 1 }}>
                            {/* Email address */}
                            <Row>
                                <Col className="col-md-auto pe-1">
                                    <FontAwesomeIcon icon={faEnvelope}
                                        className="c-accent fs-3"
                                    />
                                </Col>
                                <Col>
                                    {userProfile.email ?
                                        <p> {userProfile.email} </p>
                                        : <p> Not provided </p>
                                    }
                                </Col>
                            </Row>

                            {/* Organisation */}
                            <Row>
                                <Col className="col-md-auto pe-1">
                                    <FontAwesomeIcon icon={faInstitution}
                                        className="c-accent fs-3"
                                    />
                                </Col>
                                <Col>
                                    {userProfile.organisation ?
                                        <p> {organisations.find(organisation => organisation.ror === userProfile.organisation)?.name} </p>
                                        : <p> Not provided </p>
                                    }
                                </Col>
                            </Row>

                            {/* ORCID and Bionomia */}
                            {userProfile.orcid &&
                                <Row className="mt-5">
                                    <p className="fs-4 c-greyDark text-center mb-2"> Links </p>

                                    <Col>
                                        <a href={`https://orcid.org/${userProfile.orcid}`} target="_blank" rel="noreferrer">
                                            <button type="button" className={`${styles.profileExternalButton} c-white bgc-secondary border-0 rounded-c transition w-100 py-2`}>
                                                ORCID
                                            </button>
                                        </a>
                                    </Col>
                                    <Col>
                                        <a href={`https://bionomia.net/${userProfile.orcid}`} target="_blank" rel="noreferrer">
                                            <button type="button" className={`${styles.profileExternalButton} c-white bgc-secondary border-0 rounded-c transition w-100 py-2`}>
                                                Bionomia
                                            </button>
                                        </a>
                                    </Col>
                                </Row>
                            }
                        </Col>
                    </Row>
                </div>
                : <div className="mt-5 py-2">
                    <UserInfoForm userProfile={userProfile}
                        organisations={organisations}

                        SetUserProfile={(userProfile: User) => dispatch(setUserProfile(userProfile))}
                        DisableEditMode={() => setEditMode(false)}
                    />
                </div>
            }

            {/* Organisation Logo */}
            {!editMode &&
                <Row>
                    <Col lg={{ span: 8, offset: 2 }}>
                        <OrganisationLogoImage organisationId={userProfile.organisation?.replace('https://ror.org/', '')} />zz
                    </Col>
                </Row>
            }
        </div>
    );
}

export default Passport;