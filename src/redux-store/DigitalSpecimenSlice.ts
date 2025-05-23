/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { FullDigitalSpecimenResult } from 'app/Types';


export interface SpecimenState {
    digitalSpecimenComplete: FullDigitalSpecimenResult;
    digitalSpecimenAggregations?: {
        [searchFilter: string]: {
            [aggregation: string]: number
        }
    }
}

const initialState: SpecimenState = {
    digitalSpecimenComplete: {
        digitalSpecimen: undefined,
        digitalMedia: [],
        annotations: []
    },
    digitalSpecimenAggregations: undefined
};

export const DigitalSpecimenSlice = createSlice({
    name: 'digitalSpecimen',
    initialState,
    reducers: {
        setDigitalSpecimenComplete: (state, action: PayloadAction<FullDigitalSpecimenResult | undefined>) => {
            state.digitalSpecimenComplete = { ...state.digitalSpecimenComplete, ...action.payload };
        },
        setDigitalSpecimenAggregations: (state, action: PayloadAction<{[searchFilter: string]: {[aggregation: string]: number}}>) => {
            state.digitalSpecimenAggregations = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setDigitalSpecimenComplete,
    setDigitalSpecimenAggregations,
} = DigitalSpecimenSlice.actions;

/* Connect with Root State */
export const getDigitalSpecimen = (state: RootState) => state.digitalSpecimen.digitalSpecimenComplete.digitalSpecimen;
export const getDigitalSpecimenDigitalMedia = (state: RootState) => state.digitalSpecimen.digitalSpecimenComplete.digitalMedia;
export const getDigitalSpecimenAnnotations = (state: RootState) => state.digitalSpecimen.digitalSpecimenComplete.annotations;
export const getDigitalSpecimenComplete = (state: RootState) => state.digitalSpecimen.digitalSpecimenComplete;
export const getDigitalSpecimenAggregations = (state: RootState) => state.digitalSpecimen.digitalSpecimenAggregations;

export default DigitalSpecimenSlice.reducer;