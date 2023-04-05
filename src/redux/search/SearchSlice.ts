/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { Specimen } from 'global/Types';


export interface SearchState {
    searchQuery: string;
    searchPIDQuery: string;
    searchPhysicalId: {
        idType: string,
        idValue: string,
        organisationId?: string
    };
    specimenSearchResults: Specimen[];
}

const initialState: SearchState = {
    searchQuery: '',
    searchPIDQuery: '',
    searchPhysicalId: {
        idType: 'gui',
        idValue: ''
    },
    specimenSearchResults: <Specimen[]>[]
};

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSearchPIDQuery: (state, action: PayloadAction<string>) => {
            state.searchPIDQuery = action.payload;
        },
        setSearchPhysicalId: (state, action: PayloadAction<SearchState['searchPhysicalId']>) => {
            state.searchPhysicalId = action.payload;
        },
        setSpecimenSearchResults: (state, action: PayloadAction<Specimen[]>) => {
            state.specimenSearchResults = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setSearchQuery,
    setSearchPIDQuery,
    setSearchPhysicalId,
    setSpecimenSearchResults
} = SearchSlice.actions;

/* Connect with Root State */
export const getSearchQuery = (state: RootState) => state.search.searchQuery;
export const getSearchPIDQuery = (state: RootState) => state.search.searchPIDQuery;
export const getSearchPhysicalId = (state: RootState) => state.search.searchPhysicalId;
export const getSpecimenSearchResults = (state: RootState) => state.search.specimenSearchResults;

export default SearchSlice.reducer;