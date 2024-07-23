/* Import Dependencies */
import { Formik, Form, FieldArray } from 'formik';
import { capitalize } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Import Sources */
import TopicDisciplines from 'sources/topicFilters/TopicDisciplines.json';
import TopicOrigins from 'sources/topicFilters/TopicOrigins.json';

/* Import Components */
import TopicDisciplineFilter from './TopicDisciplineFilter';
import TopicOriginFilter from './TopicOriginFilter';
import { Button } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    topicDisciplines: {
        topicDiscipline: {
            [topicDiscipline: string]: number
        }
    }
};


/**
 * Component that renders Topic filters for on the homepage
 * @returns JSX Component
 */
const TopicFilters = (props: Props) => {
    const { topicDisciplines } = props;

    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const initialFormValues: {
        topicDisciplines: string[],
        naturalOrigin?: boolean,
        humanMade?: boolean,
        unclassified?: boolean
    } = {
        topicDisciplines: []
    };

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
            <Formik initialValues={initialFormValues}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 100));

                    /* Construct link to search based upon selected topic disciplines */
                    let searchLink: string = '/search';

                    values.topicDisciplines.forEach((topicDiscipline, index) => {
                        let linkExtension: string = `${index > 0 ? '&' : '?'}topicDiscipline=`;

                        /* Check if topic discipline belongs to other */
                        if (topicDiscipline === 'other') {
                            searchLink = searchLink.concat(linkExtension.concat('Other+Biodiversity&topicDiscipline=Other+Geodiversity'));
                        } else {
                            searchLink = searchLink.concat(linkExtension.concat(capitalize(topicDiscipline)));
                        };
                    });

                    navigate(searchLink);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        {/* Individual topic discipline filters */}
                        <Row>
                            <Col>
                                <FieldArray name="topicDisciplines">
                                    {({ push, remove }) => {
                                        const SelectFilter = (key: string) => {
                                            const index: number = values.topicDisciplines.findIndex((topicDiscipline) => topicDiscipline === key);

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
                                            if (key === 'naturalOrigin' && !values.naturalOrigin) {
                                                setFieldValue('topicDisciplines', Object.keys(TopicDisciplines.topicDisciplines));
                                                setFieldValue('naturalOrigin', true)
                                            } else if (key === 'naturalOrigin') {
                                                setFieldValue('topicDisciplines', []);
                                                setFieldValue('naturalOrigin', false);
                                            } else {
                                                setFieldValue(key, !values?.[key as keyof typeof values])
                                            }
                                        }}
                                    />
                                </Col>

                            ))}
                        </Row>
                        {/* Submit button */}
                        <Row className="flex-row-reverse mt-3">
                            <Col lg="auto">
                                <Button type="submit"
                                    variant="primary"
                                >
                                    View
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TopicFilters;