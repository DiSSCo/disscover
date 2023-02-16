/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';


/* Props Typing */
interface Props {
    ToggleModal: Function
};


const DigitalMediaProperties = (props: Props) => {
    const { ToggleModal } = props;

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);

    return (
        <Row className="overflow-scroll">
            <Col className="px-4 py-2 mt-2">
                {Object.keys(digitalMedia.filtered.MediaMeta).map((property) => {
                    const propertyData = digitalMedia.filtered.MediaMeta[property];

                    return (
                        <Row key={property}>
                            <Col>
                                <Row>
                                    <Col md={{ span: 12 }} className="digitalMedia_attributeBlock border-l-1-primary-dark mb-2 text-truncate py-1"
                                        onClick={() => ToggleModal(property)}
                                    >
                                        <span className="fst-italic"> {`${propertyData.displayName}: `} </span> {`${propertyData.value}`}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    );
                })}

                <> </>

                {/* <Row>
                    <Col>
                        <button onClick={() => props.ToggleMediaModal()} >
                            Annotate
                        </button>
                    </Col>
                </Row> */}
            </Col>
        </Row>
    );
}

export default DigitalMediaProperties;