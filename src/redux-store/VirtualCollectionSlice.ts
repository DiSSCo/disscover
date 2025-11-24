import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/Store";

/* Slice type */
type GlobalState = {
    allVirtualCollections: [],
    selectedVirtualCollection: [],
    allVirtualCollectionItems: []
};


const initialState: GlobalState = {
    allVirtualCollections: [],
    selectedVirtualCollection: [],
    allVirtualCollectionItems: []
};

/* Action Creators */
export const VirtualCollectionSlice = createSlice({
    name: 'virtualCollection',
    initialState,
    reducers: {
        setAllVirtualCollections: (state, action) => {
            state.allVirtualCollections = action.payload;
        },
        setSelectedVirtualCollection: (state, action) => {
            state.selectedVirtualCollection = action.payload;
        },
        setAllVirtualCollectionItems: (state, action) => {
            state.allVirtualCollectionItems = action.payload;
        }
    }
});

export const {
    setAllVirtualCollections,
    setSelectedVirtualCollection
} = VirtualCollectionSlice.actions

/* Connect with Root State */
export const getAllVirtualCollections = (state: RootState) => state.virtualCollection.allVirtualCollections;
export const getSelectedVirtualCollection = (state: RootState) => state.virtualCollection.selectedVirtualCollection;
export const getVirtualCollectionItems = (state: RootState) => state.virtualCollection.allVirtualCollectionItems;

export default VirtualCollectionSlice.reducer;