import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';

/* Import Components */
import ProfileAnnotation from './annotation/ProfileAnnotation';

/* Import API */
import GetCreatorAnnotations from 'api/annotate/GetCreatorAnnotations';


const Body = () => {
    const token = UserService.getToken();

    const [contentTab, SetContentTab] = useState({
        annotate: 'active',
        curate: ''
    })

    function SwitchContentTab(tab) {
        const copyContentTab = {...contentTab};

        if (tab === 'annotate') {
            copyContentTab['annotate'] = 'active'
            copyContentTab['curate'] = '';
        } else if (tab === 'curate') {
            copyContentTab['annotate'] = ''
            copyContentTab['curate'] = 'active';
        }

        SetContentTab(copyContentTab);
    }

    const [creatorAnnotations, setCreatorAnnotations] = useState();

    useEffect(() => {
        if (token) {
            GetCreatorAnnotations(token, Process);

            function Process(result) {
                setCreatorAnnotations(result);
            }
        }
    }, []);

    return (
        <Container fluid className="h-100">
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <Row className="mt-5">
                        <Col md={{ span: 4 }} className="profile_profileBlock">
                            <Row>
                                <Col md={{ span: 3 }}>
                                    <img
                                        src="https://crafatar.com/avatars/af781660900a493687708eee23874086?size=64&overlay"
                                        className="img-fluid"
                                        alt="User avatar"
                                    />
                                </Col>
                                <Col md={{ span: 7 }}>
                                    <Row>
                                        Tom Dijkema
                                    </Row>
                                    <Row>
                                        Naturalis Biodiversity Center
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 12 }}>
                                    Just some details about myself <br />
                                    Some more details about myself
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="py-5">
                        <Col md={{ span: 10 }}>
                            <Row>
                                <Col className={"profile_contentTab col-md-auto px-4 py-2 " + contentTab['annotate']} onClick={() => SwitchContentTab('annotate')}>
                                    Annotations
                                </Col>
                                <Col className={"profile_contentTab col-md-auto px-4 py-2 " + contentTab['curate']} onClick={() => SwitchContentTab('curate')}>
                                    Curations
                                </Col>
                            </Row>
                        </Col>
                        <Col md={{ span: 10 }} className={"profile_content annotations py-3 " + contentTab['annotate']}>
                            <Row>
                                {creatorAnnotations ?
                                    creatorAnnotations.map((annotation, _i) => {
                                        return (
                                            <ProfileAnnotation annotation={annotation} />
                                        );
                                    }) : 'No annotations yet'
                                }
                            </Row>
                        </Col>
                        <Col md={{span: 10}} className={"profile_content curations py-3 " + contentTab['curate']}>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Body;