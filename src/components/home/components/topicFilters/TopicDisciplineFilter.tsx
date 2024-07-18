/* Import Dependencies */
import { Field } from "formik";
import { Row, Col } from 'react-bootstrap';
import CountUp from "react-countup";

/* Import Styles */
import styles from 'components/home/home.module.scss';


/* Props Type */
type Props = {
    id: string,
    topicDiscipline: {
        name: string,
        topicOrigin: string,
        category: string
    },
    count?: number,
    icon?: string,
    OnSelect: Function
};


/** Local component file that renders a topic discipline filter
 * @param id The identifier of the topic discipline
 * @param topicDiscipline The topic discipline object
 * @param count The amount of digital specimen records with this topic discipline
 * @param icon The icon associated with the topic discipline
 * @param OnSelect The function triggered when selecting the topic discipline filter
 * @returns JSX Component
 */
const TopicDisciplineFilter = (props: Props) => {
    const { id, topicDiscipline, count, icon, OnSelect } = props;

    return (
        <button type="button"
            className={`${styles.topicFilter} button-no-style d-flex flex-column bgc-accent-soft hover-accent py-2 px-3 br-corner`}
            onClick={() => OnSelect()}
        >
            {/* Category and checkbox */}
            <Row>
                <Col>
                    <p className="fs-4 tc-secondary fw-bold">{topicDiscipline.category}</p>
                </Col>
                <Col lg="auto">
                    <Field name={`topicDisciplines`}
                        type="checkbox"
                        value={id}
                    />
                </Col>
            </Row>
            {/* Name */}
            <Row className="flex-grow-1 overflow-hidden">
                <Col lg={{ span: 8 }}>
                    <p className="fw-lightBold">{topicDiscipline.name}</p>
                </Col>
            </Row>
            {/* Count */}
            <Row className="flex-row-reverse">
                <Col lg="auto">
                    <CountUp end={count ?? 0}
                        className="fw-lightBold"
                    />
                </Col>
            </Row>
        </button>
    );
};

export default TopicDisciplineFilter;