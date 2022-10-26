import { Row, Col } from 'react-bootstrap';
import UserService from 'keycloak/Keycloak';


const AnnotationsFilters = (props) => {
    let filterOptions = {
        globalAnnotations: 'Global annotations',
        recentAnnotations: 'Recent annotations'
    }

    if (UserService.isLoggedIn()) {
        filterOptions['creatorAnnotations'] = 'Your annotations';
    }

    return (
        <Row className="h-100">
            <Col className="annotate_filterMenu">
                <Row>
                    <Col className="annotate_overviewTitle p-3">
                        Annotations overview
                    </Col>
                </Row>
                <Row>
                    <Col className="annotate_filterSection">
                        <Row className="mt-3">
                            <Col className="col-md-auto">
                                <select onChange={e => props.SetFilter(e.target.value)}>
                                    {Object.keys(filterOptions).map((key, i) => {
                                        return (
                                            <option key={i}
                                                value={key}
                                            >
                                                {filterOptions[key]}
                                            </option>
                                        );
                                    })}
                                </select>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default AnnotationsFilters;