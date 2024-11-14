/* Import Dependencies */
import classNames from "classnames";
import { useRef, useState } from 'react';
import { Row, Col } from "react-bootstrap";

/* Import Hooks */
import { useAppDispatch, useFocus } from "app/Hooks";

/* Import Store */
import { setTourTopic } from 'redux-store/GlobalSlice';

/* Import Types */
import { TourTopic } from "app/Types";

/* Import Styles */
import styles from './header.module.scss';

/* Import Components */
import { Button } from "../customUI/CustomUI";


/* Props Type */
type Props = {
    tourTopics: TourTopic[]
};


/**
 * Component that renders the tour topic menu in the header
 * @param tourTopics Tour topics that can activated for the rendered page
 * @returns JSX Component
 */
const TourTopicMenu = (props: Props) => {
    const { tourTopics } = props;

    /* Hooks */
    const dispatch = useAppDispatch();
    const tourSelectMenuRef = useRef<HTMLDivElement>(null);

    /* Base variables */
    const [tourTopicMenuToggle, setTourTopicMenuToggle] = useState<boolean>(false);

    /* Set focus on tour select menu */
    useFocus({
        ref: tourSelectMenuRef,
        OnFocusLose: () => setTourTopicMenuToggle(false)
    });

    /* Class Names */
    const tourTopicMenuClass = classNames({
        'd-none': !tourTopicMenuToggle
    });

    return (
        <div>
            <Button type="button"
                variant="blank"
                className="fw-lightBold"
                OnClick={() => {
                    if (tourTopics && tourTopics.length > 1) {
                        setTourTopicMenuToggle(!tourTopicMenuToggle);
                    } else {
                        dispatch(setTourTopic(tourTopics[0].name));
                    }
                }}
            >
                <p>
                    Take a tour
                </p>
            </Button>

            <div ref={tourSelectMenuRef}
                className={`${styles.tourTopicMenu} ${tourTopicMenuClass} position-absolute ms-4 top-100 bgc-white b-primary br-corner overflow-hidden z-2`}
            >
                {tourTopics?.map(tourTopic => (
                    <Row key={tourTopic.name}>
                        <Col>
                            <Button type="button"
                                variant="blank"
                                className="px-0 py-0 w-100 fw-lightBold text-start px-3 py-1 br-none hover-grey"
                                OnClick={() => {
                                    setTourTopicMenuToggle(false);
                                    dispatch(setTourTopic(tourTopic.name));
                                }}
                            >
                                <p className="fs-4">
                                    {tourTopic.title}
                                </p>
                            </Button>
                        </Col>
                    </Row>
                ))}
            </div>
        </div>
    );
};

export default TourTopicMenu;