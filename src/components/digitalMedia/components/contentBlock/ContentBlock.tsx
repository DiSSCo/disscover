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
    digitalMedia: DigitalMedia,
    annotoriousMode: string,
    SetAnnotoriousMode: Function
};


/**
 * Component that renders the content block on the digital media page
 * @param digitalMedia The selected digital media
 * @param annotoriousMode The currently selected Annotorious mode
 * @param SetAnnotoriousMode Function to set the Annotorious mode
 * @returns JSX Component
 */
const ContentBlock = (props: Props) => {
    const { digitalMedia, annotoriousMode, SetAnnotoriousMode } = props;

    return (
        <div className="h-100 d-flex flex-column">
            <Row className="flex-grow-1 overflow-hidden">
                <Col>
                    <DigitalMediaFrame digitalMedia={digitalMedia}
                        annotoriousMode={annotoriousMode}
                        SetAnnotoriousMode={SetAnnotoriousMode}
                    />
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