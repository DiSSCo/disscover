/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { User } from 'app/Types';
import { Annotation } from 'app/types/Annotation';


export interface UserState {
    user: User;
    userProfile: User,
    userProfileAnnotations: Annotation[];
}

const initialState: UserState = {
    user: {} as User,
    userProfile: {} as User,
    userProfileAnnotations: [] as Annotation[]
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setUserProfile: (state, action: PayloadAction<User>) => {
            state.userProfile = action.payload;
        },
        setUserProfileAnnotations: (state, action: PayloadAction<Annotation[]>) => {
            state.userProfileAnnotations = action.payload;
        }
    },
})

/* Action Creators */
export const { setUser, setUserProfile, setUserProfileAnnotations } = UserSlice.actions;

/* Connect with Root State */
export const getUser = (state: RootState) => state.user.user;
export const getUserProfile = (state: RootState) => state.user.userProfile;
export const getUserProfileAnnotations = (state: RootState) => state.user.userProfileAnnotations;

export default UserSlice.reducer;