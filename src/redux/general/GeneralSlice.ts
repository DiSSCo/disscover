/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { PaginationObject } from 'global/Types';


export interface GeneralState {
    screenSize: string,
    errorMessage: string;
    language: string;
    introTopic: string;
    paginationObject: PaginationObject;
};

const initialState: GeneralState = {
    screenSize: 'lg',
    errorMessage: '',
    language: 'EN',
    introTopic: '',
    paginationObject: {} as PaginationObject
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
        },
        setPaginationObject: (state, action: PayloadAction<PaginationObject>) => {
            state.paginationObject = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setScreenSize,
    setErrorMessage,
    setLanguage,
    setIntroTopic,
    setPaginationObject
} = GeneralSlice.actions;

/* Connect with Root State */
export const getScreenSize = (state: RootState) => state.general.screenSize;
export const getErrorMessage = (state: RootState) => state.general.errorMessage;
export const getLanguage = (state: RootState) => state.general.language;
export const getIntroTopic = (state: RootState) => state.general.introTopic;
export const getPaginationObject = (state: RootState) => state.general.paginationObject;

export default GeneralSlice.reducer;