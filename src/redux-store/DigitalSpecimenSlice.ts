/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';


export interface SpecimenState {
    digitalSpecimen: DigitalSpecimen | undefined;
    digitalSpecimenAggregations?: {
        [searchFilter: string]: {
            [aggregation: string]: number
        }
    }
}

const initialState: SpecimenState = {
    digitalSpecimen: undefined,
    digitalSpecimenAggregations: undefined
};

export const DigitalSpecimenSlice = createSlice({
    name: 'digitalSpecimen',
    initialState,
    reducers: {
        setDigitalSpecimen: (state, action: PayloadAction<DigitalSpecimen | undefined>) => {
            state.digitalSpecimen = action.payload;
        },
        setDigitalSpecimenAggregations: (state, action: PayloadAction<{[searchFilter: string]: {[aggregation: string]: number}}>) => {
            state.digitalSpecimenAggregations = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setDigitalSpecimen,
    setDigitalSpecimenAggregations
} = DigitalSpecimenSlice.actions;

/* Connect with Root State */
export const getDigitalSpecimen = (state: RootState) => state.digitalSpecimen.digitalSpecimen;
export const getDigitalSpecimenAggregations = (state: RootState) => state.digitalSpecimen.digitalSpecimenAggregations;

export default DigitalSpecimenSlice.reducer;