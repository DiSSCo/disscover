/* Import Dependencies */
import { Row, Col } from "react-bootstrap";

/* Import Types */
import { DigitalMedia } from "app/types/DigitalMedia";

/* Import Styles */
import styles from './contentBlock.module.scss';

/* Import Components */
import { DigitalMediaFrame, DigitalMediaList } from "./ContentBlockComponents";


/* Props Type */
type Props = {
    digitalMedia: DigitalMedia
};


/**
 * Component that renders the content block on the digital media page
 * @param digitalMedia The selected digital media
 * @returns JSX Component
 */
const ContentBlock = (props: Props) => {
    const { digitalMedia } = props;

    return (
        <div className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 overflow-hidden">
                <Col>
                    <DigitalMediaFrame mediaUrl={digitalMedia["ac:accessURI"]} />
                </Col>
            </Row>
            <Row className={`${styles.digitalMediaList} mt-2`}>
                <Col className="h-100">
                    <DigitalMediaList digitalMedia={digitalMedia} />
                </Col>
            </Row>
        </div>
    );
};

export default ContentBlock;