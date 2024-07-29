/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';

/* Import Icons */
import { faXmark } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    digitalSpecimenId: string,
    digitalSpecimenName: string,
    RemoveFromComparison: Function
};


/**
 * Component that renders the title card of a compare digital specimen
 * @param digitalSpecimenId The identifier of the digital specimen
 * @param digitalSpecimenName The name of the digital specimen represented in the comparison
 * @param RemoveFromComparison Function that removes a digital specimen from comparison
 * @returns JSX Component
 */
const TitleCard = (props: Props) => {
    const { digitalSpecimenId, digitalSpecimenName, RemoveFromComparison } = props;   

    return (
        <div>
            <Row>
                <Col>
                    <p className="tc-primary fw-lightBold">
                        {digitalSpecimenName}
                    </p>
                </Col>
                <Col lg="auto">
                    <Button type="button"
                        variant="blank"
                        className="py-0 px-0"
                        OnClick={() => {RemoveFromComparison(digitalSpecimenId)}}
                    >
                        <FontAwesomeIcon icon={faXmark}
                            className="tc-primary"
                        />
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default TitleCard;