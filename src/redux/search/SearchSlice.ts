/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { DigitalSpecimen, Dict } from 'app/Types';


export interface SearchState {
    searchQuery: string;
    searchPIDQuery: string;
    searchPhysicalId: {
        idType: string,
        idValue: string,
        organisationName?: string
    };
    searchResults: DigitalSpecimen[];
    searchAggregations: Dict;
    searchSpecimen: DigitalSpecimen;
    compareMode: boolean;
    compareSpecimens: DigitalSpecimen[];
}

const initialState: SearchState = {
    searchQuery: '',
    searchPIDQuery: '',
    searchPhysicalId: {
        idType: 'gui',
        idValue: ''
    },
    searchResults: [] as DigitalSpecimen[],
    searchAggregations: {} as Dict,
    searchSpecimen: {} as DigitalSpecimen,
    compareMode: false,
    compareSpecimens: [] as DigitalSpecimen[]
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
        setSearchResults: (state, action: PayloadAction<DigitalSpecimen[]>) => {
            state.searchResults = action.payload;
        },
        setSearchAggregations: (state, action: PayloadAction<Dict>) => {
            state.searchAggregations = action.payload;
        },
        setSearchSpecimen: (state, action: PayloadAction<DigitalSpecimen>) => {
            state.searchSpecimen = action.payload;
        },
        setCompareMode: (state, action: PayloadAction<boolean>) => {
            state.compareMode = action.payload;
        },
        setCompareSpecimens: (state, action: PayloadAction<DigitalSpecimen[]>) => {
            state.compareSpecimens = action.payload;
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
    setSearchSpecimen,
    setCompareMode,
    setCompareSpecimens
} = SearchSlice.actions;

/* Connect with Root State */
export const getSearchQuery = (state: RootState) => state.search.searchQuery;
export const getSearchPIDQuery = (state: RootState) => state.search.searchPIDQuery;
export const getSearchPhysicalId = (state: RootState) => state.search.searchPhysicalId;
export const getSearchResults = (state: RootState) => state.search.searchResults;
export const getSearchAggregations = (state: RootState) => state.search.searchAggregations;
export const getSearchSpecimen = (state: RootState) => state.search.searchSpecimen;
export const getCompareMode = (state: RootState) => state.search.compareMode;
export const getCompareSpecimens = (state: RootState) => state.search.compareSpecimens;

export default SearchSlice.reducer;