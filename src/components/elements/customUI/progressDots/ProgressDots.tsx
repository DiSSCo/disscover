/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { ProgressDot } from 'app/Types';

/* Import Icons */
import { faCircle } from '@fortawesome/free-solid-svg-icons';

/* Import Components */
import { Button } from '../CustomUI';


/* Props Type */
type Props = {
    progressDots: ProgressDot[]
};


/**
 * 
 * @returns JSX Component
 */
const ProgressDots = (props: Props) => {
    const { progressDots } = props;

    return (
        <div>
            <Row>
                {progressDots.map((progressDot, index) => {
                    /* Class Names */
                    const progressDotClass = classNames({
                 
                    });

                    const progressDotLineClass = classNames({
                        
                    });

                    return (
                        <div key={progressDot.label}>
                            {index > 0 &&
                                <Col lg
                                    className="d-flex align-items-center"
                                >
                                    <div className={`${progressDotLineClass} w-100 py-1`} />
                                </Col>
                            }

                            <Col lg="auto">
                                <Button type="button"
                                    variant="blank"
                                    // disabled={progressDot.state === 'open'}
                                    className="px-0 py-1"
                                    OnClick={progressDot.OnClick}
                                >
                                    <FontAwesomeIcon icon={faCircle}
                                        size="lg"
                                        className={progressDotClass}
                                    />
                                </Button>
                            </Col>
                        </div>
                    );
                })}
            </Row>
        </div>
    );
};

export default ProgressDots;