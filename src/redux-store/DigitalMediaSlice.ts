/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';
import { AnnotationArray } from 'app/Types';


export interface DigitalMediaState {
    digitalMedia: DigitalMedia;
    digitalMediaVersions: number[];
    digitalMediaAnnotations: AnnotationArray;
    allowVisualAnnotations: boolean;
}

const initialState: DigitalMediaState = {
    digitalMedia: {} as DigitalMedia,
    digitalMediaVersions: [],
    digitalMediaAnnotations: {
        visual: []
    } as AnnotationArray,
    allowVisualAnnotations: false
};

export const DigitalMediaSlice = createSlice({
    name: 'digitalMedia',
    initialState,
    reducers: {
        setDigitalMedia: (state, action: PayloadAction<DigitalMedia>) => {
            state.digitalMedia = action.payload;
        },
        setDigitalMediaVersions: (state, action: PayloadAction<number[]>) => {
            state.digitalMediaVersions = action.payload;
        },
        setDigitalMediaAnnotations: (state, action: PayloadAction<AnnotationArray>) => {
            state.digitalMediaAnnotations = action.payload;
        },
        setAllowVisualAnnotations: (state, action: PayloadAction<boolean>) => {
            state.allowVisualAnnotations = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setDigitalMedia,
    setDigitalMediaVersions,
    setDigitalMediaAnnotations,
    setAllowVisualAnnotations
} = DigitalMediaSlice.actions;

/* Connect with Root State */
// export const getDigitalMedia = (state: RootState) => state.digitalMedia.digitalMedia;
// export const getDigitalMediaVersions = (state: RootState) => state.digitalMedia.digitalMediaVersions;
// export const getDigitalMediaAnnotations = (state: RootState) => state.digitalMedia.digitalMediaAnnotations;
// export const getAllowVisualAnnotations = (state: RootState) => state.digitalMedia.allowVisualAnnotations;

export default DigitalMediaSlice.reducer;