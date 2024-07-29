/* Import Dependencies */
import { useState } from 'react';

/* Import Hooks */
import { useAppSelector, useDynamicSearch } from 'app/Hooks';

/* Import Store */
import { getAggregations } from 'redux-store/BootSlice';

/* Import Types */
import { MultiSelectItem } from 'app/Types';

/* Import API */
import GetDigitalSpecimenSearchTermAggregations from "api/digitalSpecimen/GetDigitalSpecimenSearchTermAggregations";

/* Import Components */
import { MultiSelect } from 'components/elements/customUI/CustomUI';


/* Props Type */
type Props = {
    name: string,
    namePrefix?: string,
    fieldValues: string[],
    searchQuery?: string,
    aggregations?: { [aggregation: string]: number },
    enableSearchQuery?: boolean,
    SetFieldValue: Function,
    SubmitForm: Function
};


/**
 * Component that renders a select filter
 * @param name The name of the search filter
 * @param fieldValues The current values of the search filter in the form
 * @param searchQuery A possible search query that is used to search for digital specimen aggregations within the reach of this search filter
 * @param aggregations The aggregations assigned to this search filter
 * @param enableSearchQuery A boolean that indicates if the select filter should provide a query field
 * @param SetFieldValue Function to set the value of the search filter
 * @param SubmitForm Function to submit the search filters form
 * @returns JSX Component
 */
const SelectFilter = (props: Props) => {
    const { name, namePrefix, fieldValues, searchQuery, aggregations, enableSearchQuery, SetFieldValue, SubmitForm } = props;

    /* Base variables */
    const bootAggregations = useAppSelector(getAggregations);
    const [filterAggregations, setFilterAggregations] = useState<{
        [aggregation: string]: number
    } | undefined>(aggregations);
    const multiSelectItems: MultiSelectItem[] = [];

    /* Construct from selected values, overwrites search results */
    fieldValues.forEach(fieldValue => {
        /* Prepend selected item */
        multiSelectItems.unshift({
            label: fieldValue,
            value: fieldValue,
            count: filterAggregations?.[fieldValue] ?? aggregations?.[fieldValue] ?? bootAggregations?.[name]?.[fieldValue]
        });
    });

    /* Construct from boot aggregations to initiate top ten values, if aggregation is not yet present and if not searching */
    if (!searchQuery) {
        Object.entries(bootAggregations[name]).forEach(([key, count]) => {
            /* Check if item is not already present due to selected list */
            if (!multiSelectItems.find(multiSelectItem => multiSelectItem.value === key)) {
                multiSelectItems.push({
                    label: key,
                    value: key,
                    count
                });
            }
        });
    };

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
        }) => setFilterAggregations(aggregations[name]),
        Resetter: () => setFilterAggregations(bootAggregations[name])
    });

    return (
        <div>
            <MultiSelect name={name}
                namePrefix={namePrefix}
                items={multiSelectItems}
                fieldValues={fieldValues}
                enableInputField={enableSearchQuery}
                allowMultiSelectAtOnce={true}
                alwaysDisplayActiveItems={true}
                SetFieldValue={(field: string, value: string | string[]) => SetFieldValue(field, value)}
                OnSelect={() => {
                    /* Submit search filters form */
                    SubmitForm()

                    /* Reset aggregations */
                    setFilterAggregations(bootAggregations[name]);
                }}
                OnChange={(value: string) => dynamicSearch.DynamicSearch(value, { searchFilterName: name, value })}
            />
        </div>
    );
};

export default SelectFilter;