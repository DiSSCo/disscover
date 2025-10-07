/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';
import { Dict } from 'app/Types';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';

export interface SearchState {
    digitalSpecimen: DigitalSpecimen | undefined,
    compareDigitalSpecimen: DigitalSpecimen[] | undefined,
    searchResults: Dict[] | undefined,
    searchUrl: string | undefined
}

const initialState: SearchState = {
    digitalSpecimen: undefined,
    compareDigitalSpecimen: undefined,
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
        setCompareDigitalSpecimen: (state, action: PayloadAction<DigitalSpecimen[] | undefined>) => {
            state.compareDigitalSpecimen = action.payload;
        },
        setSearchResults: (state, action: PayloadAction<Dict[] | undefined>) => {
            state.searchResults = action.payload;
        },
        setSearchUrl: (state, action: PayloadAction<string | undefined>) => {
            console.log(action.payload);
            state.searchUrl = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setSearchDigitalSpecimen,
    setCompareDigitalSpecimen,
    setSearchResults,
    setSearchUrl
} = SearchSlice.actions;

/* Connect with Root State */
export const getSearchDigitalSpecimen = (state: RootState) => state.search.digitalSpecimen
export const getCompareDigitalSpecimen = (state: RootState) => state.search.compareDigitalSpecimen;
export const getSearchResults = (state: RootState) => state.search.searchResults;
export const getSearchUrl = (state: RootState) => state.search.searchUrl;

export default SearchSlice.reducer;