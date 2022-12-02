import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Import API */
import GetUser from 'api/user/GetUser';
import UserService from 'keycloak/Keycloak';


const Profile = () => {
    const [user, setUser] = useState({firstName: 'Unknown'});
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

    return (
        <Row>
            <Col md={{ span: 12 }} className="mt-1">
                <Row className="justify-content-end">
                    <Col className="header_profile col-md-auto bg-primary-dark text-white rounded-c">
                        <Link to='/profile'>
                            <Row>
                                <Col className="text-end textOverflow">
                                    {(user['firstName'] != 'Unknown') ?
                                        <> {`${user['firstName'][0]}. ${user['lastName']}`} </>
                                        : <> {user['firstName']} </>
                                    }
                                </Col>
                                <Col className="col-md-auto position-relative d-flex justify-content-center align-items-center">
                                    <div className="header_profilePicture rounded-circle text-center bg-primary text-white z-1">
                                        {user['firstName'][0]} 
                                    </div>

                                    <div className="header_userInfoOutline position-absolute" />
                                </Col>
                            </Row>
                        </Link>
                    </Col>

                </Row>
            </Col>
        </Row>
    );
}

export default Profile;