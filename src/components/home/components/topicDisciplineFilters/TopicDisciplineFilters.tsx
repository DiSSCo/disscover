/* Import Dependencies */
import { FieldArray } from "formik";
import { capitalize } from "lodash";
import { Row, Col } from 'react-bootstrap';

/* Import Sources */
import TopicDisciplines from 'sources/topicFilters/TopicDisciplines.json';


/* Import Components */
import TopicDisciplineFilter from './TopicDisciplineFilter';


/* Props Type */
type Props = {
    topicDisciplines: {
        topicDiscipline: {
            [topicDiscipline: string]: number
        }
    },
    formValues: {
        topicDisciplines: string[],
        naturalOrigin?: boolean,
        humanMade?: boolean,
        unclassified?: boolean
    }
};


const TopicDisciplineFilters = (props: Props) => {
    const { topicDisciplines, formValues } = props;

    return (
        <FieldArray name="topicDisciplines">
            {({ push, remove }) => {
                const SelectFilter = (key: string) => {
                    const index: number = formValues.topicDisciplines.findIndex((topicDiscipline) => topicDiscipline === key);

                    if (index >= 0) {
                        remove(index);
                    } else {
                        push(key);
                    }
                };

                return (
                    <Row>
                        {Object.entries(TopicDisciplines.topicDisciplines).map(([key, topicDiscipline]) => (
                            <Col key={key}
                                lg={{ span: 4 }}
                                className="my-2 px-2"
                            >
                                <TopicDisciplineFilter id={key}
                                    topicDiscipline={topicDiscipline}
                                    count={topicDisciplines.topicDiscipline[capitalize(key)]}
                                    OnSelect={SelectFilter}
                                />
                            </Col>
                        ))}
                    </Row>
                );
            }}
        </FieldArray>
    );
};

export default TopicDisciplineFilters;