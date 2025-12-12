/* Import Dependencies */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';


/* Slice type */
type BootState = {
    aggregations: {
        [searchFilterName: string]: {
            [aggregation: string]: number
        }
    },
};

const initialState: BootState = {
    aggregations: {},
};

export const BootSlice = createSlice({
    name: 'boot',
    initialState,
    reducers: {
        setBootState: (state, action: PayloadAction<BootState>) => {
            state.aggregations = action.payload.aggregations;
        }
    },
})

/* Action Creators */
export const { setBootState } = BootSlice.actions;

/* Selector actions */
const SelectAggregations = (state: RootState) => state.boot.aggregations;

/**
 * Selector function for selecting the organisation names from the aggregations
 */
const SelectOrganisationNames = createSelector([SelectAggregations], (aggregations: { [searchFilterName: string]: { [aggregation: string]: number } }) => {
    const organisationNames: string[] = [];

    if ('organisationName' in aggregations) {
        Object.keys(aggregations.organisationName).forEach(key => {
            organisationNames.push(key);
        });
    };

    return organisationNames;
});

/* Connect with Root State */
export const getAggregations = (state: RootState) => state.boot.aggregations;
export const getOrganisationNames = (state: RootState) => SelectOrganisationNames(state);


export default BootSlice.reducer;