import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Components */
import ProfileAnnotation from './ProfileAnnotation';
import Paginator from 'templates/general/paginator/Paginator';


const CreatorAnnotations = (props) => {
    const creatorAnnotations = props.creatorAnnotations;

    const [paginatorRange, setPaginationRange] = useState();

    function RenderCreatorAnnotations() {
        let creatorAnnotationsView = [];

        for (let i = paginatorRange[0]; i <= paginatorRange[1]; i++) {
            if (creatorAnnotations[i]) {
                creatorAnnotationsView.push(
                    <ProfileAnnotation key={i}
                        annotation={creatorAnnotations[i]}
                    />
                );
            }
        }

        return (creatorAnnotationsView);
    }

    return (
        <Row>
            <Col>
                <Row>
                    <Col className="col-md-auto profile_annotationsTitle">
                        Annotations
                    </Col>
                </Row>
                <Row>
                    <Col className="profile_annotationsSection">
                        <Row>
                            <Col className="profile_annotationsHeader">
                                <Row>
                                    <Col md={{ span: 3 }}>
                                        Motivation
                                    </Col>
                                    <Col md={{ span: 6 }}>
                                        Target
                                    </Col>
                                    <Col md={{ span: 3 }}>
                                        Created
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        {paginatorRange &&
                            <Row>
                                {RenderCreatorAnnotations()}
                            </Row>
                        }

                        {(creatorAnnotations.length > 0) ?
                            <Row>
                                <Col>
                                    <Paginator items={creatorAnnotations}
                                        pageSize={6}

                                        SetPaginationRange={(range) => setPaginationRange(range)}
                                    />
                                </Col>
                            </Row>
                            : <Row>
                                <Col>
                                    No annotations have been made yet
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default CreatorAnnotations;