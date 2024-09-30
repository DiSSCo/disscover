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
    phylopicBuild: number,
    isMobile: boolean
};

const initialState: BootState = {
    aggregations: {},
    phylopicBuild: 385,
    isMobile: false
};

export const BootSlice = createSlice({
    name: 'boot',
    initialState,
    reducers: {
        setBootState: (state, action: PayloadAction<BootState>) => {
            state.aggregations = action.payload.aggregations;
            state.phylopicBuild = action.payload.phylopicBuild;
            state.isMobile = action.payload.isMobile;
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
export const checkIfIsMobile = (state: RootState) => state.boot.isMobile;


export default BootSlice.reducer;