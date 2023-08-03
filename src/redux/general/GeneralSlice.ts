/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';


export interface GeneralState {
    screenSize: string,
    errorMessage: string;
    language: string;
    stepsEnabled: boolean;
};

const initialState: GeneralState = {
    screenSize: 'lg',
    errorMessage: '',
    language: 'EN',
    stepsEnabled: false
};

export const GeneralSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setScreenSize: (state, action: PayloadAction<string>) => {
            state.screenSize = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
        setStepsEnabled: (state, action: PayloadAction<boolean>) => {
            state.stepsEnabled = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setScreenSize,
    setErrorMessage,
    setLanguage,
    setStepsEnabled
} = GeneralSlice.actions;

/* Connect with Root State */
export const getScreenSize = (state: RootState) => state.general.screenSize;
export const getErrorMessage = (state: RootState) => state.general.errorMessage;
export const getLanguage = (state: RootState) => state.general.language;
export const getStepsEnabled = (state: RootState) => state.general.stepsEnabled;

export default GeneralSlice.reducer;