/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';


export interface GeneralState {
    errorMessage: string;
    language: string;
};

const initialState: GeneralState = {
    errorMessage: '',
    language: 'EN'
};

export const GeneralSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setErrorMessage,
    setLanguage
} = GeneralSlice.actions;

/* Connect with Root State */
export const getErrorMessage = (state: RootState) => state.general.errorMessage;
export const getLanguage = (state: RootState) => state.general.language;

export default GeneralSlice.reducer;