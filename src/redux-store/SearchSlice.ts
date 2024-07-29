/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';


export interface SearchState {
    digitalSpecimen: DigitalSpecimen | undefined,
    compareDigitalSpecimen: DigitalSpecimen[] | undefined
}

const initialState: SearchState = {
    digitalSpecimen: undefined,
    compareDigitalSpecimen: undefined
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
    },
})

/* Action Creators */
export const {
    setSearchDigitalSpecimen,
    setCompareDigitalSpecimen
} = SearchSlice.actions;

/* Connect with Root State */
export const getSearchDigitalSpecimen = (state: RootState) => state.search.digitalSpecimen
export const getCompareDigitalSpecimen = (state: RootState) => state.search.compareDigitalSpecimen;

export default SearchSlice.reducer;