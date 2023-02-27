/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { Specimen, DigitalMedia, SpecimenAnnotations } from 'global/Types';


export interface SpecimenState {
    specimen: Specimen;
    specimenDigitalMedia: DigitalMedia[];
    specimenAnnotations: SpecimenAnnotations;
    specimenMidsProperty: string;
}

const initialState: SpecimenState = {
    specimen: <Specimen>{},
    specimenDigitalMedia: <DigitalMedia[]>[],
    specimenAnnotations: <SpecimenAnnotations>{},
    specimenMidsProperty: <string>''
};

export const SpecimenSlice = createSlice({
    name: 'specimen',
    initialState,
    reducers: {
        setSpecimen: (state, action: PayloadAction<Specimen>) => {
            state.specimen = action.payload;
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
export const { setSpecimen, setSpecimenDigitalMedia, setSpecimenAnnotations, setSpecimenMidsProperty } = SpecimenSlice.actions;

/* Connect with Root State */
export const getSpecimen = (state: RootState) => state.specimen.specimen;
export const getSpecimenDigitalMedia = (state: RootState) => state.specimen.specimenDigitalMedia;
export const getSpecimenAnnotations = (state: RootState) => state.specimen.specimenAnnotations;
export const getSpecimenMidsProperty = (state: RootState) => state.specimen.specimenMidsProperty;

export default SpecimenSlice.reducer;