/* Import Dependencies */
import { Row, Col } from 'react-bootstrap';

/* Import Types */
import { SearchFilter as SearchFilterType, Dict } from 'app/Types';

/* Import Local Components */
import BooleanFilter from './BooleanFilter';
import BlockFilter from './BlockFilter';
import SelectFilter from './SelectFilter';
import TaxonomyFilter from './TaxonomyFilter';


/* Props Type */
type Props = {
    name: string,
    fieldValue: string | string[] | boolean | { [subLevel: string]: string[] },
    searchQuery?: string,
    searchFilter: SearchFilterType,
    aggregations?: { [searchFilterName: string]: { [aggregation: string]: number } | { [subSearchFilterName: string]: { [aggregation: string]: number } } },
    text?: string,
    formValues?: Dict,
    SetFieldValue?: Function,
    SetFormValues?: Function,
    SubmitForm: Function
};


/**
 * Component that renders a search filter based upon the given type
 * @param name The name of the search filter
 * @param fieldValue The current value(s) of the search filter in the form
 * @param searchQuery A possible search query that is used to search for digital specimen aggregations within the reach of this search filter
 * @param searchFilter The search filter object containing a label and the type
 * @param aggregations The aggregations assigned to this search 
 * @param text Possible text to display with the filter value
 * @param SetFieldValue Function to set the value of this search filter
 * @param SubmitForm Function to submit the search filters form
 * @returns JSX Component
 */
const SearchFilter = (props: Props) => {
    const { name, fieldValue, searchQuery, searchFilter, aggregations, text, formValues, SetFieldValue, SetFormValues, SubmitForm } = props;

    /* Base variables */
    let formField: JSX.Element;

    switch (searchFilter.type) {
        case 'select':
            formField = <SelectFilter name={name}
                namePrefix={searchFilter.nestedIn ?? undefined}
                fieldValues={fieldValue as string[]}
                searchQuery={searchQuery}
                aggregations={aggregations?.[name] as { [aggregation: string]: number }}
                enableSearchQuery={searchFilter.searchable}
                SetFieldValue={(field: string, value: string | string[]) => SetFieldValue?.(field, value)}
                SubmitForm={SubmitForm}
                filters={searchFilter.filters}
                noAggregations={searchFilter.noAggregations}
            />;

            break;
        case 'block':
            formField = <BlockFilter name={name}
                namePrefix={searchFilter.nestedIn ?? undefined}
                fieldValues={fieldValue as string[]}
                aggregations={aggregations?.[name] as { [aggregation: string]: number }}
                text={text}
                SubmitForm={SubmitForm}
                filters={searchFilter.filters}
                noAggregations={searchFilter.noAggregations}
            />

            break;
        case 'boolean':
            formField = <BooleanFilter name={name}
                namePrefix={searchFilter.nestedIn ?? undefined}
                fieldValues={fieldValue as string[]}
                SetFieldValue={SetFieldValue}
                SubmitForm={SubmitForm}
            />

            break;
        case 'taxonomy':
            formField = <TaxonomyFilter fieldValues={fieldValue as { [taxonomicLevel: string]: string[] }}
                formValues={formValues ?? {}}
                SetFieldValue={(field: string, value: string | string[]) => SetFieldValue?.(field, value)}
                SetFormValues={(values: Dict) => SetFormValues?.(values)}
                SubmitForm={SubmitForm}
            />

            break;
        default:
            formField = <SelectFilter name={name}
                namePrefix={searchFilter.nestedIn ?? undefined}
                fieldValues={fieldValue as string[]}
                aggregations={aggregations?.[name] as { [aggregation: string]: number }}
                SetFieldValue={(field: string, value: string[]) => SetFieldValue?.(field, value)}
                SubmitForm={SubmitForm}
                filters={searchFilter.filters}
                noAggregations={searchFilter.noAggregations}
            />;
    };

    return (
        <div>
            {/* Title */}
            <Row>
                <Col>
                    <p className="fs-4 fw-lightBold">{searchFilter.label}</p>
                </Col>
            </Row>
            {/* Form field */}
            <Row className="mt-1">
                <Col>
                    {formField}
                </Col>
            </Row>
        </div>
    );
};

export default SearchFilter;