/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { Specimen, SpecimenDigitalMedia, SpecimenAnnotations } from 'global/Types';


export interface SpecimenState {
    specimen: Specimen;
    specimenVersion: number;
    specimenDigitalMedia: SpecimenDigitalMedia[];
    specimenAnnotations: SpecimenAnnotations;
    specimenMidsProperty: string;
}

const initialState: SpecimenState = {
    specimen: {} as Specimen,
    specimenVersion: 0,
    specimenDigitalMedia: [] as SpecimenDigitalMedia[],
    specimenAnnotations: {} as SpecimenAnnotations,
    specimenMidsProperty: ''
};

export const SpecimenSlice = createSlice({
    name: 'specimen',
    initialState,
    reducers: {
        setSpecimen: (state, action: PayloadAction<Specimen>) => {
            state.specimen = action.payload;
        },
        setSpecimenVersion: (state, action: PayloadAction<number>) => {
            state.specimenVersion = action.payload;
        },
        setSpecimenDigitalMedia: (state, action: PayloadAction<SpecimenDigitalMedia[]>) => {
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
    setSpecimenVersion, 
    setSpecimenDigitalMedia, 
    setSpecimenAnnotations, 
    setSpecimenMidsProperty
} = SpecimenSlice.actions;

/* Connect with Root State */
export const getSpecimen = (state: RootState) => state.specimen.specimen;
export const getSpecimenVersion = (state: RootState) => state.specimen.specimenVersion;
export const getSpecimenDigitalMedia = (state: RootState) => state.specimen.specimenDigitalMedia;
export const getSpecimenAnnotations = (state: RootState) => state.specimen.specimenAnnotations;
export const getSpecimenMidsProperty = (state: RootState) => state.specimen.specimenMidsProperty;

export default SpecimenSlice.reducer;