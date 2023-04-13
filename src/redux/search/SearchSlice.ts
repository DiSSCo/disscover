/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { Specimen, Dict } from 'global/Types';


export interface SearchState {
    searchQuery: string;
    searchPIDQuery: string;
    searchPhysicalId: {
        idType: string,
        idValue: string,
        organisationId?: string
    };
    searchResults: Specimen[];
    searchAggregations: Dict;
    searchSpecimen: Specimen;
}

const initialState: SearchState = {
    searchQuery: '',
    searchPIDQuery: '',
    searchPhysicalId: {
        idType: 'gui',
        idValue: ''
    },
    searchResults: <Specimen[]>[],
    searchAggregations: {} as Dict,
    searchSpecimen: {} as Specimen
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
        setSearchResults: (state, action: PayloadAction<Specimen[]>) => {
            state.searchResults = action.payload;
        },
        setSearchAggregations: (state, action: PayloadAction<Dict>) => {
            state.searchAggregations = action.payload;
        },
        setSearchSpecimen: (state, action: PayloadAction<Specimen>) => {
            state.searchSpecimen = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setSearchQuery,
    setSearchPIDQuery,
    setSearchPhysicalId,
    setSearchResults,
    setSearchAggregations,
    setSearchSpecimen
} = SearchSlice.actions;

/* Connect with Root State */
export const getSearchQuery = (state: RootState) => state.search.searchQuery;
export const getSearchPIDQuery = (state: RootState) => state.search.searchPIDQuery;
export const getSearchPhysicalId = (state: RootState) => state.search.searchPhysicalId;
export const getSearchResults = (state: RootState) => state.search.searchResults;
export const getSearchAggregations = (state: RootState) => state.search.searchAggregations;
export const getSearchSpecimen = (state: RootState) => state.search.searchSpecimen;

export default SearchSlice.reducer;