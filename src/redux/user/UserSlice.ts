/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { User, UserAnnotations } from 'global/Types';


export interface UserState {
    user: User;
    userAnnotations: UserAnnotations;
}

const initialState: UserState = {
    user: <User>{},
    userAnnotations: <UserAnnotations>{}
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setUserAnnotations: (state, action: PayloadAction<UserAnnotations>) => {
            state.userAnnotations = action.payload;
        }
    },
})

/* Action Creators */
export const { setUser, setUserAnnotations } = UserSlice.actions;

/* Connect with Root State */
export const getUser = (state: RootState) => state.user.user;
export const getUserAnnotations = (state: RootState) => state.user.userAnnotations;

export default UserSlice.reducer;