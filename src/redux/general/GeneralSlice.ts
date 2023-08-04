/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';


export interface GeneralState {
    screenSize: string,
    errorMessage: string;
    language: string;
    introTopic: string;
};

const initialState: GeneralState = {
    screenSize: 'lg',
    errorMessage: '',
    language: 'EN',
    introTopic: ''
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
        setIntroTopic: (state, action: PayloadAction<string>) => {
            state.introTopic = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setScreenSize,
    setErrorMessage,
    setLanguage,
    setIntroTopic
} = GeneralSlice.actions;

/* Connect with Root State */
export const getScreenSize = (state: RootState) => state.general.screenSize;
export const getErrorMessage = (state: RootState) => state.general.errorMessage;
export const getLanguage = (state: RootState) => state.general.language;
export const getIntroTopic = (state: RootState) => state.general.introTopic;

export default GeneralSlice.reducer;