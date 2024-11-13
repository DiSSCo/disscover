/* Import Dependencies */
import { useState } from 'react';

/* Import Hooks */
import { useDynamicSearch } from 'app/Hooks';

/* Import Types */
import { MultiSelectItem } from 'app/Types';

/* Import API */
import GetDigitalSpecimenSearchTermAggregations from 'api/digitalSpecimen/GetDigitalSpecimenSearchTermAggregations';

/* Import Components */
import { MultiSelect } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    fieldValues: string[],
    SetFieldValue: Function,
    SubmitForm: Function,
    ToggleTaxonomyFilter: Function
};


/**
 * Component that renders the taxonomy select for searching species
 * @param fieldValues The values of all of the taxonomy related fields in the form
 * @param SetFormValues Function to set all form values
 * @param SubmitForm Function to submit the form
 * @param ToggleTaxonomyFilter Function to toggle the taxonomy filter (focus)
 * @returns JSX Component
 */
const TaxonomySelect = (props: Props) => {
    const { fieldValues, SetFieldValue, SubmitForm, ToggleTaxonomyFilter } = props;

    /* Base variables */
    const [filterAggregations, setFilterAggregations] = useState<{
        [aggregation: string]: number
    } | undefined>();
    const multiSelectItems: MultiSelectItem[] = [];

    /* Construct multi select items, if aggregations are present */
    if (filterAggregations) {
        /* Construct from filter aggregations, includes search results, negates if value is already present in selected */
        Object.entries(filterAggregations).forEach(([key, count]) => {
            /* Check if item is not already present due to selected list */
            if (!multiSelectItems.find(multiSelectItem => multiSelectItem.value === key)) {
                multiSelectItems.push({
                    label: key,
                    value: key,
                    count
                });
            };
        });
    };

    /* Initate dynamic search for digital specimen aggregations */
    const dynamicSearch = useDynamicSearch({
        Method: GetDigitalSpecimenSearchTermAggregations,
        Handler: (aggregations: {
            [filterName: string]: {
                [aggregation: string]: number
            }
        }) => setFilterAggregations(aggregations['species']),
        Resetter: () => setFilterAggregations({})
    });

    return (
        <div>
            <MultiSelect name="species"
                namePrefix="filters.taxonomy"
                searchName="taxonomy"
                items={multiSelectItems}
                fieldValues={fieldValues}
                listPosition="absolute"
                enableInputField={true}
                SetFieldValue={(field: string, value: string | string[]) => SetFieldValue(field, value)}
                OnClick={(foo: boolean) => ToggleTaxonomyFilter(foo)}
                OnSelect={() => {
                    SubmitForm();
                    setFilterAggregations({});
                }}
                OnChange={(value: string) => dynamicSearch.DynamicSearch(value, { searchFilterName: 'species', value })}
            />
        </div>
    );
};

export default TaxonomySelect;