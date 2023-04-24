/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { Annotation } from 'global/Types';

/* Import Components */
import UserProfileAnnotation from './UserProfileAnnotation';


/* Props Typing */
interface Props {
    userProfileAnnotations: Annotation[]
};


const AnnotationsOverview = (props: Props) => {
    const { userProfileAnnotations } = props;

    /* Pagination */
    const [paginationRange] = useState<number[]>([]);

    /* Function for rendering the individual Annotation Components */
    const RenderCreatorAnnotations = () => {
        let userProfileAnnotationsComponents: React.ReactElement[] = [];

        for (let i = paginationRange[0]; i <= paginationRange[1]; i++) {
            if (userProfileAnnotations[i]) {
                userProfileAnnotationsComponents.push(
                    <UserProfileAnnotation key={userProfileAnnotations[i].id}
                        annotation={userProfileAnnotations[i]}
                    />
                );
            }
        }

        return userProfileAnnotationsComponents;
    }

    return (
        <Row>
            <Col>
                <Row>
                    <Col className="profile_annotationsSection">
                        {paginationRange &&
                            <Row>
                                {RenderCreatorAnnotations()}
                            </Row>
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AnnotationsOverview;