/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';


/* Props Typing */
interface Props {
    title: string,
    fields: JSX.Element[]
};


const ObjectTemplate = (props: Props) => {
    const { title, fields } = props;

    return (
        <div className="mb-3">
            <Row>
                <Col className="px-4 py-2 bgc-primary c-white">
                    <p className="fs-3 fw-lightBold"> {title} </p>
                </Col>
            </Row>
            <Row>
                <Col className="px-5">
                    {fields.map((field) => {
                        return field;
                    })}
                </Col>
            </Row>
        </div>
    );
}

export default ObjectTemplate;