/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { DigitalSpecimen, DigitalMedia, AnnotationArray, Dict } from 'app/Types';


export interface SpecimenState {
    // specimen: DigitalSpecimen | undefined;
    // specimenVersions: number[];
    // specimenDigitalMedia: DigitalMedia[];
    // specimenAnnotations: AnnotationArray;
    // specimenMidsProperty: string;
    digitalSpecimenAggregations?: {
        [searchFilter: string]: {
            [aggregation: string]: number
        }
    }
}

const initialState: SpecimenState = {
    // specimen: undefined,
    // specimenVersions: [],
    // specimenDigitalMedia: [] as DigitalMedia[],
    // specimenAnnotations: {} as AnnotationArray,
    // specimenMidsProperty: '',
    digitalSpecimenAggregations: undefined
};

export const DigitalSpecimenSlice = createSlice({
    name: 'digitalSpecimen',
    initialState,
    reducers: {
        // setSpecimen: (state, action: PayloadAction<DigitalSpecimen>) => {
        //     state.specimen = action.payload;
        // },
        // setSpecimenVersions: (state, action: PayloadAction<number[]>) => {
        //     state.specimenVersions = action.payload;
        // },
        // setSpecimenDigitalMedia: (state, action: PayloadAction<DigitalMedia[]>) => {
        //     state.specimenDigitalMedia = action.payload;
        // },
        // setSpecimenAnnotations: (state, action: PayloadAction<AnnotationArray>) => {
        //     state.specimenAnnotations = action.payload;
        // },
        // setSpecimenMidsProperty: (state, action: PayloadAction<string>) => {
        //     state.specimenMidsProperty = action.payload;
        // }
        setDigitalSpecimenAggregations: (state, action: PayloadAction<{[searchFilter: string]: {[aggregation: string]: number}}>) => {
            state.digitalSpecimenAggregations = action.payload;
        }
    },
})

/* Action Creators */
export const {
    // setSpecimen,
    // setSpecimenVersions,
    // setSpecimenDigitalMedia, 
    // setSpecimenAnnotations, 
    // setSpecimenMidsProperty
    setDigitalSpecimenAggregations
} = DigitalSpecimenSlice.actions;

/* Connect with Root State */
// export const getSpecimen = (state: RootState) => state.specimen.specimen;
// export const getSpecimenVersions = (state: RootState) => state.specimen.specimenVersions;
// export const getSpecimenDigitalMedia = (state: RootState) => state.specimen.specimenDigitalMedia;
// export const getSpecimenAnnotations = (state: RootState) => state.specimen.specimenAnnotations;
// export const getSpecimenMidsProperty = (state: RootState) => state.specimen.specimenMidsProperty;
export const getDigitalSpecimenAggregations = (state: RootState) => state.digitalSpecimen.digitalSpecimenAggregations;

export default DigitalSpecimenSlice.reducer;