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
                        'tc-grey': progressDot.state === 'open',
                        'tc-primary': progressDot.state === 'current',
                        'tc-accent': progressDot.state === 'checked'
                    });

                    const progressDotLineClass = classNames({
                        'bgc-grey': progressDot.state === 'open',
                        'bgc-primary': progressDot.state === 'current',
                        'bgc-accent': progressDot.state === 'checked'
                    });

                    return (
                        <>
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
                                    disabled={progressDot.state === 'open'}
                                    className="px-0 py-1"
                                    OnClick={progressDot.OnClick}
                                >
                                    <FontAwesomeIcon icon={faCircle}
                                        size="lg"
                                        className={progressDotClass}
                                    />
                                </Button>
                            </Col>
                        </>
                    );
                })}
            </Row>
        </div>
    );
};

export default ProgressDots;