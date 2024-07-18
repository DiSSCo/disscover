/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { Notification } from 'app/Types';


/* Slice type */
type GlobalState = {
    notifications: Notification[];
};

const initialState: GlobalState = {
    notifications: []
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
        }
    },
})

/* Action Creators */
export const {
    pushToNotifications,
    removeFromNotifications
} = GlobalSlice.actions;

/* Connect with Root State */
export const getNotifications = (state: RootState) => state.global.notifications;

export default GlobalSlice.reducer;