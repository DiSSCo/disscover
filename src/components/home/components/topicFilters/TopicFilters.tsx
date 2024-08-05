/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Sources */
import TopicDisciplines from 'sources/topicFilters/TopicDisciplines.json';
import TopicOrigins from 'sources/topicFilters/TopicOrigins.json';

/* Import Components */
import TopicDisciplineFilters from './TopicDisciplineFilters';
import TopicOriginFilter from './TopicOriginFilter';


/* Props Type */
type Props = {
    topicDisciplines: {
        topicDiscipline: {
            [topicDiscipline: string]: number
        }
    },
    formValues: {
        topicDisciplines: string[];
        naturalOrigin?: boolean;
        humanMade?: boolean;
        unclassified?: boolean;
    },
    SetFieldValue: Function
};


/**
 * Component that renders Topic filters for on the homepage
 * @param topicDisciplines The topic discipline objects fetched from the API
 * @param formValues The current, relevant values of the form this component is nested in
 * @param SetFieldValue Function to set a particular form field's value
 * @returns JSX Component
 */
const TopicFilters = (props: Props) => {
    const { topicDisciplines, formValues, SetFieldValue } = props;

    /* Count total of topic origins */
    const naturalOrigins = Object.fromEntries(Object.entries(topicDisciplines.topicDiscipline).filter(([key]) =>
        TopicDisciplines.topicDisciplines[key.toLowerCase() as keyof typeof TopicDisciplines.topicDisciplines]?.topicOrigin === 'natural'
    ));

    const topicOriginCounts = {
        naturalOrigin: Object.values(naturalOrigins).reduce((total, count) => total + count, 0),
        humanMade: 0,
        unclassified: topicDisciplines.topicDiscipline?.['Unclassified'] ?? 0
    };

    return (
        <div className="h-100">

            {/* Individual topic discipline filters */}
            <Row>
                <Col>
                    <TopicDisciplineFilters topicDisciplines={topicDisciplines}
                        formValues={formValues}
                    />
                </Col>
            </Row>
            {/* Topic Origin filters */}
            <Row className="mt-4">
                {Object.entries(TopicOrigins.topicOrigins).map(([key, topicOrigin], index) => (
                    <Col key={key}
                        lg={{ span: 4 }}
                        className="my-2 px-2"
                    >
                        <TopicOriginFilter id={key}
                            topicOrigin={topicOrigin}
                            variant={index % 2 ? 'accentDark' : 'secondarySoft'}
                            count={topicOriginCounts[key as keyof typeof topicOriginCounts]}
                            OnSelect={() => {
                                if (key === 'naturalOrigin' && !formValues.naturalOrigin) {
                                    SetFieldValue('topicDisciplines', Object.keys(TopicDisciplines.topicDisciplines));
                                    SetFieldValue('naturalOrigin', true)
                                } else if (key === 'naturalOrigin') {
                                    SetFieldValue('topicDisciplines', []);
                                    SetFieldValue('naturalOrigin', false);
                                } else {
                                    SetFieldValue(key, !formValues?.[key as keyof typeof formValues])
                                }
                            }}
                        />
                    </Col>

                ))}
            </Row>
        </div >
    );
};

export default TopicFilters;