/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { DigitalSpecimen, DigitalMedia, SpecimenAnnotations } from 'app/Types';


export interface SpecimenState {
    specimen: DigitalSpecimen;
    specimenVersions: number[];
    specimenDigitalMedia: DigitalMedia[];
    specimenAnnotations: SpecimenAnnotations;
    specimenMidsProperty: string;
}

const initialState: SpecimenState = {
    specimen: {
        digitalSpecimen: {},
        originalData: {}
    } as DigitalSpecimen,
    specimenVersions: [],
    specimenDigitalMedia: [] as DigitalMedia[],
    specimenAnnotations: {} as SpecimenAnnotations,
    specimenMidsProperty: ''
};

export const SpecimenSlice = createSlice({
    name: 'specimen',
    initialState,
    reducers: {
        setSpecimen: (state, action: PayloadAction<DigitalSpecimen>) => {
            state.specimen = action.payload;
        },
        setSpecimenVersions: (state, action: PayloadAction<number[]>) => {
            state.specimenVersions = action.payload;
        },
        setSpecimenDigitalMedia: (state, action: PayloadAction<DigitalMedia[]>) => {
            state.specimenDigitalMedia = action.payload;
        },
        setSpecimenAnnotations: (state, action: PayloadAction<SpecimenAnnotations>) => {
            state.specimenAnnotations = action.payload;
        },
        setSpecimenMidsProperty: (state, action: PayloadAction<string>) => {
            state.specimenMidsProperty = action.payload;
        }
    },
})

/* Action Creators */
export const { 
    setSpecimen,
    setSpecimenVersions,
    setSpecimenDigitalMedia, 
    setSpecimenAnnotations, 
    setSpecimenMidsProperty
} = SpecimenSlice.actions;

/* Connect with Root State */
export const getSpecimen = (state: RootState) => state.specimen.specimen;
export const getSpecimenVersions = (state: RootState) => state.specimen.specimenVersions;
export const getSpecimenDigitalMedia = (state: RootState) => state.specimen.specimenDigitalMedia;
export const getSpecimenAnnotations = (state: RootState) => state.specimen.specimenAnnotations;
export const getSpecimenMidsProperty = (state: RootState) => state.specimen.specimenMidsProperty;

export default SpecimenSlice.reducer;