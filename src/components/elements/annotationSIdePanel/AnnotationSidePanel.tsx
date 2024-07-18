/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Styles */
import styles from './annotationSidePanel.module.scss';

/* Import Components */
import { TopBar } from './AnnotationSidePanelComponents';


/* Props Type */
type Props = {
    HideAnnotationSidePanel: Function
};


/**
 * Component that renders the annotation side panel
 * @returns 
 */
const AnnotationSidePanel = (props: Props) => {
    const { HideAnnotationSidePanel } = props;

    return (
        <div className={`${styles.annotationSidePanel} h-100 w-100 bgc-default px-4 py-4`}>
            {/* Top bar */}
            <Row>
                <Col>
                    <TopBar />
                </Col>
            </Row>
        </div>
    );
};

export default AnnotationSidePanel;