/* Import Dependencies */
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Components */
import { Spinner } from "../CustomUI";


/* Props Type */
type Props = {
    visible: boolean,
    className?: string,
    text?: string,
    displaySpinner?: boolean
};


/**
 * Component that renders a loading screen for blocking ui elements, is positioned absolute and needs a relative parent
 * @param visible A boolean that indicates if the loading screen should be visible or not
 * @param className Additional class names that can be provided for the loading screen
 * @param text An optional string that will be displayed in the center of the loading screen
 * @param displaySpinner A boolean that indicates if the spinner should be displayed or not while loading
 * @returns JSX Component
 */
const LoadingScreen = (props: Props) => {
    const { visible, className, text, displaySpinner } = props;

    /* Class Names */
    const loadingScreenClass = classNames({
        "z--1 opacity-0": !visible,
        "z-1 opacity-100": visible
    });

    return (
        <div className={`${loadingScreenClass} ${className} h-100 w-100 top-0 start-0 position-absolute bgc-secondary-soft-transparent tr-fast`}>
            <Row className="h-100">
                <Col className="d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        {/* Display spinner if requested */}
                        {displaySpinner && <Spinner />}

                        {/* Display text if present */}
                        {text && <p className="mt-3 fs-4 fw-lightBold">{text}</p>}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default LoadingScreen;