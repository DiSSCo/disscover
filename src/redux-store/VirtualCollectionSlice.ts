import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/Store";

/* Slice type */
type GlobalState = {
    selectedVirtualCollection: {
        attributes: object | undefined,
        id: string | undefined,
        type: string | undefined 
    } | undefined,
};


const initialState: GlobalState = {
    selectedVirtualCollection: undefined,
};

/* Action Creators */
export const VirtualCollectionSlice = createSlice({
    name: 'virtualCollection',
    initialState,
    reducers: {
        setSelectedVirtualCollection: (state, action) => {
            state.selectedVirtualCollection = action.payload;
        },
    }
});

export const {
    setSelectedVirtualCollection
} = VirtualCollectionSlice.actions

/* Connect with Root State */
export const getSelectedVirtualCollection = (state: RootState) => state.virtualCollection.selectedVirtualCollection;

export default VirtualCollectionSlice.reducer;