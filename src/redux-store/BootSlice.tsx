/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';


/* Slice type */
type BootState = {
    aggregations: {
        [searchFilterName: string]: {
            [aggregation: string]: number
        }
    }
};

const initialState: BootState = {
    aggregations: {}
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

/* Connect with Root State */
export const getAggregations = (state: RootState) => state.boot.aggregations;
export const getOrganisationNames = (state: RootState) => {
    const organisationNames: string[] = [];

    if ('organisationName' in state.boot.aggregations) {
        Object.keys(state.boot.aggregations.organisationName).forEach(key => {
            organisationNames.push(key);
        });
    };

    return organisationNames;
};

export default BootSlice.reducer;