/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeycloakService from 'keycloak/Keycloak';
import { Row, Col, Dropdown } from 'react-bootstrap';

/* Import Types */
import { User } from 'global/Types';

/* Import API */
import GetUser from 'api/user/GetUser';


const Profile = () => {
    const [user, setUser] = useState<User>();

    const token = KeycloakService.GetToken();
    const subject = KeycloakService.GetSubject();

    /* User initialization */
    useEffect(() => {
        if (token && subject) {
            GetUser(subject, token).then((user) => {
                if (user) {
                    let copyUser = { ...user };

                    if (!user.firstName) {
                        copyUser.firstName = 'User';
                    }

                    setUser(copyUser);
                }
            });
        }
    }, []);

    /* Handling Dropdown */
    const navigate = useNavigate();

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

    if (user) {
        return (
            <Row>
                <Col md={{ span: 12 }} className="mt-1">
                    <Row className="justify-content-end">
                        <Dropdown onSelect={(eventKey: string | null, _e: React.SyntheticEvent<unknown>) =>
                            OnSelect(eventKey)
                        }>
                            <Dropdown.Toggle>
                                <span className="text-end textOverflow">
                                    {(user.firstName && user.firstName !== 'User') ?
                                        <> {`${user['firstName'][0]}. ${user['lastName']}`} </>
                                        : <> {user['firstName']} </>
                                    }
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="1" className="px-3"> Profile </Dropdown.Item>
                                <Dropdown.Item eventKey="2" className="px-3"> Log-out </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                </Col>
            </Row>
        );
    } else {
        return (
            <> </>
        );
    }
}

export default Profile;