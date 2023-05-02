/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { DigitalMedia, DigitalMediaAnnotations } from 'global/Types';


export interface DigitalMediaState {
    digitalMedia: DigitalMedia;
    digitalMediaAnnotations: DigitalMediaAnnotations;
}

const initialState: DigitalMediaState = {
    digitalMedia: {} as DigitalMedia,
    digitalMediaAnnotations: {} as DigitalMediaAnnotations
};

export const DigitalMediaSlice = createSlice({
    name: 'digitalMedia',
    initialState,
    reducers: {
        setDigitalMedia: (state, action: PayloadAction<DigitalMedia>) => {
            state.digitalMedia = action.payload;
        },
        setDigitalMediaAnnotations: (state, action: PayloadAction<DigitalMediaAnnotations>) => {
            state.digitalMediaAnnotations = action.payload;
        }
    },
})

/* Action Creators */
export const { setDigitalMedia, setDigitalMediaAnnotations } = DigitalMediaSlice.actions;

/* Connect with Root State */
export const getDigitalMedia = (state: RootState) => state.digitalMedia.digitalMedia;
export const getDigitalMediaAnnotations = (state: RootState) => state.digitalMedia.digitalMediaAnnotations;

export default DigitalMediaSlice.reducer;