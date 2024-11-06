/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';


export interface DigitalMediaState {
    digitalMedia: DigitalMedia | undefined;
}

const initialState: DigitalMediaState = {
    digitalMedia: undefined
};

export const DigitalMediaSlice = createSlice({
    name: 'digitalMedia',
    initialState,
    reducers: {
        setDigitalMedia: (state, action: PayloadAction<DigitalMedia | undefined>) => {
            state.digitalMedia = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setDigitalMedia
} = DigitalMediaSlice.actions;

/* Connect with Root State */
export const getDigitalMedia = (state: RootState) => state.digitalMedia.digitalMedia;

export default DigitalMediaSlice.reducer;