/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { ProgressDot } from 'app/Types';

/* Import Icons */
import { faCircle } from '@fortawesome/free-solid-svg-icons';

/* Import Styles */
import styles from './progressDots.module.scss';

/* Import Components */
import { Button } from '../CustomUI';


/* Props Type */
type Props = {
    progressDots: ProgressDot[],
    selectedIndex: number,
    completedTill: number,
    ValidationFunction?: Function
};


/**
 * Component that returns a custom progress dots component which help indicate different steps of a wizard
 * @param progressDots The progress dots to be present
 * @param selectedIndex The current selected index of the page, step, etc.
 * @param completedTill The index representing the latest step a user has reached
 * @param ValidationFunction Function that validates if a later step can be accessed
 * @returns JSX Component
 */
const ProgressDots = (props: Props) => {
    const { progressDots, selectedIndex, completedTill, ValidationFunction } = props;

    /* Calculate width of progress bar */
    let progressBarWidth: string = '5%';

    if (progressDots.length === completedTill) {
        progressBarWidth = '100%';
    } else if (selectedIndex) {
        progressBarWidth = `${Math.round((100 / (progressDots.length - 1)) * selectedIndex)}%`;
    }

    const progressBarStyles = {
        width: progressBarWidth
    };

    return (
        <div>
            <Row>
                <Col className="position-relative">
                    <Row>
                        {progressDots.map((progressDot, index) => {
                            /* Validation function setup */
                            const Validate = () => ValidationFunction?.(index > 0 ? (index - 1) : 0);

                            /* Class Names */
                            const progressDotColClass = classNames({
                                'justify-content-center': index !== 0 && index + 1 !== progressDots.length,
                                'justify-content-start': index === 0,
                                'justify-content-end': index + 1 === progressDots.length
                            });

                            const progressDotClass = classNames({
                                'tc-grey': index > selectedIndex && index > completedTill,
                                'tc-primary': index <= selectedIndex,
                                'tc-secondary': ValidationFunction ? Validate() && index > selectedIndex : index > selectedIndex && index <= completedTill
                            });

                            return (
                                <Col key={progressDot.label}
                                    lg
                                    className={`${progressDotColClass} d-flex`}
                                >
                                    <Button type="button"
                                        variant="blank"
                                        disabled={ValidationFunction ? !Validate() : index > completedTill}
                                        className="px-0 py-1 position-relative z-2"
                                        OnClick={progressDot.OnClick}
                                    >
                                        <FontAwesomeIcon icon={faCircle}
                                            size="lg"
                                            className={`${progressDotClass} tr-fast`}
                                        />
                                    </Button>

                                </Col>
                            );
                        })}
                    </Row>

                    {/* Progress bar */}
                    <div className={`${styles.progressBar} position-absolute start-0 end-0 bgc-grey py-1 z-0`} />
                    <div className={`${styles.progressBar} position-absolute tr-fast start-0 end-0 bgc-accent py-1 z-1`}
                        style={progressBarStyles}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default ProgressDots;