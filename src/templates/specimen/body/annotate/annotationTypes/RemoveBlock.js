import { Row, Col } from 'react-bootstrap';


const RemoveBlock = (props) => {
    const formData = props.formData;

    return (
        <Row className="mt-4">
            <Col className="col-md-auto">
                <button type="submit"
                    className="annotate_annotationTypeSubmit border-2-primary-dark"
                >
                    Save annotation
                </button>
            </Col>
            {(Object.keys(formData).length > 0) &&
                <Col className="col-md-auto">
                    <button type="button"
                        className="annotate_annotationTypeRemove"
                        onClick={() => props.RemoveAnnotation()}
                    >
                        Remove Annotation
                    </button>
                </Col>
            }
        </Row>
    )
}

export default RemoveBlock;