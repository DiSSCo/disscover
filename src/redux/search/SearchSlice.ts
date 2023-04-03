/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { SearchFilter, Specimen } from 'global/Types';


export interface SearchState {
    searchQuery: string;
    searchPIDQuery: string;
    searchPhysicalId: {
        idType: string,
        idValue: string,
        organisationId?: string
    };
    searchFacility: {
        idType: string,
        organisationId: string
    };
    searchFilters: SearchFilter[];
    specimenSearchResults: Specimen[];
}

const initialState: SearchState = {
    searchQuery: '',
    searchPIDQuery: '',
    searchPhysicalId: {
        idType: 'gui',
        idValue: ''
    },
    searchFacility: {
        idType: 'local',
        organisationId: ''
    },
    searchFilters: <[]>[],
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
        setSearchFacility: (state, action: PayloadAction<SearchState['searchFacility']>) => {
            state.searchFacility = action.payload;
        },
        setSearchFilters: (state, action: PayloadAction<SearchFilter[]>) => {
            state.searchFilters = action.payload;
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
    setSearchFacility,
    setSearchFilters,
    setSpecimenSearchResults
} = SearchSlice.actions;

/* Connect with Root State */
export const getSearchQuery = (state: RootState) => state.search.searchQuery;
export const getSearchPIDQuery = (state: RootState) => state.search.searchPIDQuery;
export const getSearchPhysicalId = (state: RootState) => state.search.searchPhysicalId;
export const getSearchFacilityId = (state: RootState) => state.search.searchFacility;
export const getSearchFilters = (state: RootState) => state.search.searchFilters;
export const getSpecimenSearchResults = (state: RootState) => state.search.specimenSearchResults;

export default SearchSlice.reducer;