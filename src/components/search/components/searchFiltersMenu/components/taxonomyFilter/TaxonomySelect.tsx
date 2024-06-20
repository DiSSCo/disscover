/* Import Dependencies */
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

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
    SubmitForm: Function
};


const TaxonomySelect = (props: Props) => {
    const { fieldValues, SetFieldValue, SubmitForm } = props;

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
        }) => {
            setFilterAggregations(aggregations['species']);
        },
        Resetter: () => setFilterAggregations(undefined)
    });

    return (
        <div>
            <MultiSelect name="taxonomy.species"
                items={multiSelectItems}
                fieldValues={fieldValues}
                enableInputField={true}
                SetFieldValue={(field: string, value: string | string[]) => SetFieldValue(field, value)}
                OnSelect={() =>  SubmitForm()}
                OnChange={(value: string) => dynamicSearch.DynamicSearch(value, { searchFilterName: 'species', value })}
            />
        </div>
    );
};

export default TaxonomySelect;