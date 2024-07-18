/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { AnnotationArray, Dict } from 'app/Types';


export interface SpecimenState {
    digitalSpecimen: DigitalSpecimen | undefined;
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
    digitalSpecimen: undefined,
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
        setDigitalSpecimen: (state, action: PayloadAction<DigitalSpecimen | undefined>) => {
            state.digitalSpecimen = action.payload;
        },
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
    setDigitalSpecimen,
    // setSpecimenVersions,
    // setSpecimenDigitalMedia, 
    // setSpecimenAnnotations, 
    // setSpecimenMidsProperty
    setDigitalSpecimenAggregations
} = DigitalSpecimenSlice.actions;

/* Connect with Root State */
export const getDigitalSpecimen = (state: RootState) => state.digitalSpecimen.digitalSpecimen;
// export const getSpecimenVersions = (state: RootState) => state.specimen.specimenVersions;
// export const getSpecimenDigitalMedia = (state: RootState) => state.specimen.specimenDigitalMedia;
// export const getSpecimenAnnotations = (state: RootState) => state.specimen.specimenAnnotations;
// export const getSpecimenMidsProperty = (state: RootState) => state.specimen.specimenMidsProperty;
export const getDigitalSpecimenAggregations = (state: RootState) => state.digitalSpecimen.digitalSpecimenAggregations;

export default DigitalSpecimenSlice.reducer;