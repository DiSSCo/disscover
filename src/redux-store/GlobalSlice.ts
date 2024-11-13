/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { Notification } from 'app/Types';


/* Slice type */
type GlobalState = {
    notifications: Notification[];
    tourTopic: string | undefined;
};

const initialState: GlobalState = {
    notifications: [],
    tourTopic: undefined
};

export const GlobalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        pushToNotifications: (state, action: PayloadAction<{ key: string, message: string, template?: string }>) => {
            state.notifications.push(action.payload);
        },
        removeFromNotifications: (state, action: PayloadAction<{ key: string, message: string, template?: string }>) => {
            state.notifications.splice(state.notifications.findIndex(notification => notification.key === action.payload.key), 1);
        },
        setTourTopic: (state, action: PayloadAction<string | undefined>) => {
            state.tourTopic = action.payload;
        }
    },
})

/* Action Creators */
export const {
    pushToNotifications,
    removeFromNotifications,
    setTourTopic
} = GlobalSlice.actions;

/* Connect with Root State */
export const getNotifications = (state: RootState) => state.global.notifications;
export const getTourTopic = (state: RootState) => state.global.tourTopic;

export default GlobalSlice.reducer;