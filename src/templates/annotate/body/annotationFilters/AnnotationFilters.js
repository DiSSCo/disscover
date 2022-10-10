import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';


const AnnotationFilters = (props) => {
    return (
        <Row>
            <Col className="col-md-auto"
                onClick={() => props.SetFilter('recentAnnotations')}
            >
                Global annotations
            </Col>
            {UserService.isLoggedIn() &&
                <Col className="col-md-auto annotate_annotationFilterTab">
                    <button
                        onClick={() => props.SetFilter('creatorAnnotations')}
                    >
                        My annotations
                    </button>

                </Col>
            }
        </Row>
    );
}

export default AnnotationFilters;