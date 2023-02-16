import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Dropdown } from 'react-bootstrap';

/* Import API */
import GetUser from 'api/user/GetUser';
import UserService from 'keycloak/Keycloak';


const Profile = () => {
    const [user, setUser] = useState({ firstName: 'Unknown' });
    const token = UserService.getToken();

    useEffect(() => {
        GetUser(UserService.getToken(), UserService.getSubject(), Process);

        function Process(result) {
            if (!result['data']['attributes']['firstName']) {
                result['data']['attributes']['firstName'] = 'Unknown';
            }

            setUser(result['data']['attributes']);
        }
    }, [token]);

    /* Handling Dropdown */
    const navigate = useNavigate();

    const OnSelect = (eventKey) => {
        switch (eventKey) {
            case '1':
                navigate('/profile');
                break;
            case '2':
                UserService.doLogout();
                break;
            default:
                break;
        }
    };

    return (
        <Row>
            <Col md={{ span: 12 }} className="mt-1">
                <Row className="justify-content-end">
                    <Dropdown onSelect={OnSelect}>
                        <Dropdown.Toggle>
                            <span className="text-end textOverflow">
                                {(user['firstName'] !== 'Unknown') ?
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
}

export default Profile;