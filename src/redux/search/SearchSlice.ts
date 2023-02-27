/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { Specimen } from 'global/Types';


export interface SearchState {
    searchQuery: string;
    specimenSearchResults: Specimen[];
}

const initialState: SearchState = {
    searchQuery: '',
    specimenSearchResults: <Specimen[]>[]
};

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSpecimenSearchResults: (state, action: PayloadAction<Specimen[]>) => {
            state.specimenSearchResults = action.payload;
        }
    },
})

/* Action Creators */
export const { setSearchQuery, setSpecimenSearchResults } = SearchSlice.actions;

/* Connect with Root State */
export const getSearchQuery = (state: RootState) => state.search.searchQuery;
export const getSpecimenSearchResults = (state: RootState) => state.search.specimenSearchResults;

export default SearchSlice.reducer;