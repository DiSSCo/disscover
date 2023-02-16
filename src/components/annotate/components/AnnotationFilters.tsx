/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';
import KeycloakService from 'keycloak/Keycloak';

/* Import Types */
import { Dict } from 'global/Types';


/* Props Typing */
interface Props {
    SetFilter: Function
};


const AnnotationsFilters = (props: Props) => {
    const { SetFilter } = props;

    /* Define possible filter options */
    let filterOptions: Dict = {
        globalAnnotations: 'Global annotations',
        recentAnnotations: 'Recent annotations'
    }

    /* If logged in: add user's own annotations to possible filters */
    if (KeycloakService.IsLoggedIn()) {
        filterOptions['creatorAnnotations'] = 'Your annotations';
    }

    return (
        <Row className="h-100">
            <Col className="border-1-primary-dark">
                <Row>
                    <Col className="annotate_overviewTitle p-3 bg-primary-dark fw-bold text-white">
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