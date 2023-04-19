/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { User } from 'global/Types';


export interface GeneralState {
    errorMessage: string;
    user: User;
}

const initialState: GeneralState = {
    errorMessage: '',
    user: {} as User
};

export const GeneralSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setErrorMessage,
    setUser
} = GeneralSlice.actions;

/* Connect with Root State */
export const getErrorMessage = (state: RootState) => state.general.errorMessage;
export const getUser = (state: RootState) => state.general.user;

export default GeneralSlice.reducer;