/* Import Dependencies */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col, Dropdown } from 'react-bootstrap';

/* Import Store */
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getUser, setUser } from 'redux/user/UserSlice';

/* Import API */
import GetUser from 'api/user/GetUser';


const Profile = () => {
    /* Hooks */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* Base variables */
    const user = useAppSelector(getUser);

    /* User initialization */
    useEffect(() => {
        if (KeycloakService.GetSubject() && KeycloakService.GetToken()) {
            GetUser(KeycloakService.GetSubject(), KeycloakService.GetToken()).then((user) => {
                if (user) {
                    dispatch(setUser(user));
                }
            });
        }
    }, []);

    /* Function for handling Profile Dropdown */
    const OnSelect = (eventKey: string | null) => {
        switch (eventKey) {
            case '1':
                navigate('/profile');
                break;
            case '2':
                KeycloakService.Logout();
                break;
            default:
                break;
        }
    };

    return (
        <Row>
            <Col md={{ span: 12 }} className="mt-1">
                {!isEmpty(user) &&
                    <Row className="pe-0">
                        <Dropdown onSelect={(eventKey: string | null, _e: React.SyntheticEvent<unknown>) =>
                            OnSelect(eventKey)
                        }>
                            <Dropdown.Toggle>
                                <span className="text-end textOverflow">
                                    {(user.firstName && user.firstName !== 'User') ?
                                        <> {`${user['firstName'][0]}. ${user['lastName']}`} </>
                                        : <> User </>
                                    }
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="1" className="px-3"> Profile </Dropdown.Item>
                                <Dropdown.Item eventKey="2" className="px-3"> Log-out </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                }
            </Col>
        </Row>
    );
}

export default Profile;