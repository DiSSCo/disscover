/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';


export interface SearchState {
    digitalSpecimen: DigitalSpecimen | undefined,
    compareDigitalSpecimen: DigitalSpecimen[] | undefined
    // searchQuery: string;
    // searchPIDQuery: string;
    // searchPhysicalId: {
    //     idType: string,
    //     idValue: string,
    //     organisationName?: string
    // };
    // searchResults: DigitalSpecimen[];
    // searchAggregations: Dict;
    // searchSpecimen: DigitalSpecimen;
    // compareMode: boolean;
    // compareSpecimens: DigitalSpecimen[];
}

const initialState: SearchState = {
    digitalSpecimen: undefined,
    compareDigitalSpecimen: undefined
    // searchQuery: '',
    // searchPIDQuery: '',
    // searchPhysicalId: {
    //     idType: 'gui',
    //     idValue: ''
    // },
    // searchResults: [] as DigitalSpecimen[],
    // searchAggregations: {} as Dict
    // searchSpecimen: {} as DigitalSpecimen,
    // compareMode: false,
    // compareSpecimens: [] as DigitalSpecimen[]
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
        }
        // setSearchQuery: (state, action: PayloadAction<string>) => {
        //     state.searchQuery = action.payload;
        // },
        // setSearchPIDQuery: (state, action: PayloadAction<string>) => {
        //     state.searchPIDQuery = action.payload;
        // },
        // setSearchPhysicalId: (state, action: PayloadAction<SearchState['searchPhysicalId']>) => {
        //     state.searchPhysicalId = action.payload;
        // },
        // setSearchResults: (state, action: PayloadAction<DigitalSpecimen[]>) => {
        //     state.searchResults = action.payload;
        // },
        // setSearchAggregations: (state, action: PayloadAction<Dict>) => {
        //     state.searchAggregations = action.payload;
        // }
        // setSearchSpecimen: (state, action: PayloadAction<DigitalSpecimen>) => {
        //     state.searchSpecimen = action.payload;
        // },
        // setCompareMode: (state, action: PayloadAction<boolean>) => {
        //     state.compareMode = action.payload;
        // },
    },
})

/* Action Creators */
export const {
    setSearchDigitalSpecimen,
    setCompareDigitalSpecimen
    // setSearchQuery,
    // setSearchPIDQuery,
    // setSearchPhysicalId,
    // setSearchResults,
    // setSearchAggregations,
    // setSearchSpecimen,
    // setCompareMode,
} = SearchSlice.actions;

/* Connect with Root State */
export const getSearchDigitalSpecimen = (state: RootState) => state.search.digitalSpecimen
export const getCompareDigitalSpecimen = (state: RootState) => state.search.compareDigitalSpecimen;
// export const getSearchQuery = (state: RootState) => state.search.searchQuery;
// export const getSearchPIDQuery = (state: RootState) => state.search.searchPIDQuery;
// export const getSearchPhysicalId = (state: RootState) => state.search.searchPhysicalId;
// export const getSearchResults = (state: RootState) => state.search.searchResults;
// export const getSearchAggregations = (state: RootState) => state.search.searchAggregations;
// export const getSearchSpecimen = (state: RootState) => state.search.searchSpecimen;
// export const getCompareMode = (state: RootState) => state.search.compareMode;

export default SearchSlice.reducer;