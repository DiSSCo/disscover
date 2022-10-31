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
                    <Col className="profile_annotationsSection">
                        {paginatorRange &&
                            <Row>
                                {RenderCreatorAnnotations()}
                            </Row>
                        }

                        {(creatorAnnotations.length > 0) ?
                            <Row>
                                <Col>
                                    <Paginator items={creatorAnnotations}
                                        pageSize={8}

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