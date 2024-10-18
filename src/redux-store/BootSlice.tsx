/* Import Dependencies */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';
import { isEmpty } from 'lodash';


/* Slice type */
type BootState = {
    aggregations: {
        [searchFilterName: string]: {
            [aggregation: string]: number
        }
    },
    phylopicBuild: number
};

const initialState: BootState = {
    aggregations: {},
    phylopicBuild: 385
};

export const BootSlice = createSlice({
    name: 'boot',
    initialState,
    reducers: {
        setBootState: (state, action: PayloadAction<BootState>) => {
            state.aggregations = action.payload.aggregations;
            state.phylopicBuild = action.payload.phylopicBuild;
        }
    },
})

/* Action Creators */
export const { setBootState } = BootSlice.actions;

/* Selector actions */
const SelectAggregations = (state: RootState) => state.boot.aggregations;

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
export const getPhylopicBuild = (state: RootState) => state.boot.phylopicBuild;


export default BootSlice.reducer;