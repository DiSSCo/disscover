/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';


export interface GeneralState {
    errorMessage: string;
}

const initialState: GeneralState = {
    errorMessage: ''
};

export const GeneralSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setErrorMessage
} = GeneralSlice.actions;

/* Connect with Root State */
export const getErrorMessage = (state: RootState) => state.general.errorMessage;

export default GeneralSlice.reducer;