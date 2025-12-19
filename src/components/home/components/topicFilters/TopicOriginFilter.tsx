/* Import Dependencies */
import classNames from "classnames";
import { Field } from "formik";
import { Row, Col } from 'react-bootstrap';
import CountUp from "react-countup";

/* Import Styles */
import styles from 'components/home/home.module.scss';


/* Props Type */
type Props = {
    id: string,
    topicOrigin: {
        name: string,
        subTitle?: string
    }
    variant: 'secondarySoft' | 'accentDark',
    count?: number,
    OnSelect: Function
};


const TopicOriginFilter = (props: Props) => {
    const { id, topicOrigin, variant, count, OnSelect } = props;

    /* Class Names */
    const topicOriginClass = classNames({
        [`${styles.topicFilter}`]: true,
        'bgc-secondary-soft hover-secondary': variant === 'secondarySoft',
        'bgc-accent-dark hover-accent-dark': variant === 'accentDark'
    });

    return (
        <button type="button"
            className={`${topicOriginClass} button-no-style d-flex flex-column py-3 px-3 br-corner`}
            onClick={() => OnSelect()}
        >
            {/* Name and checkbox */}
            <Row>
                <Col>
                    <p className="fw-lightBold">{topicOrigin.name}</p>
                </Col>
                <Col lg="auto">
                    <Field name={id}
                        type="checkbox"
                    />
                </Col>
            </Row>
            {/* Sub title if present */}
            {topicOrigin.subTitle &&
                <Row className="overflow-hidden">
                    <Col lg={{ span: 9 }}>
                        <p className="fw-lightBold">{topicOrigin.subTitle}</p>
                    </Col>
                </Row>
            }
            {/* Count */}
            <Row className="flex-grow-1 flex-row-reverse align-items-end">
                <Col lg="auto">
                    <CountUp end={count ?? 0}
                        className="fw-lightBold"
                    />
                </Col>
            </Row>
        </button>
    );
};

export default TopicOriginFilter;