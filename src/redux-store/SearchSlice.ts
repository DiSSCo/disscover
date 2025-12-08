/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';
import { Dict } from 'app/Types';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

type SearchResults = {
    records: Dict[],
    currentPage: number
}

export interface SearchState {
    digitalSpecimen: DigitalSpecimen | undefined,
    searchResults: SearchResults | undefined,
    searchUrl: string | undefined
}

const initialState: SearchState = {
    digitalSpecimen: undefined,
    searchResults: undefined,
    searchUrl: undefined
};

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchDigitalSpecimen: (state, action: PayloadAction<DigitalSpecimen | undefined>) => {
            state.digitalSpecimen = action.payload;
        },
        setSearchResults: (state, action: PayloadAction<SearchResults | undefined>) => {
            state.searchResults = action.payload;
        },
        setSearchUrl: (state, action: PayloadAction<string | undefined>) => {
            state.searchUrl = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setSearchDigitalSpecimen,
    setSearchResults,
    setSearchUrl
} = SearchSlice.actions;

/* Connect with Root State */
export const getSearchDigitalSpecimen = (state: RootState) => state.search.digitalSpecimen
export const getSearchResults = (state: RootState) => state.search.searchResults;
export const getSearchUrl = (state: RootState) => state.search.searchUrl;

export default SearchSlice.reducer;