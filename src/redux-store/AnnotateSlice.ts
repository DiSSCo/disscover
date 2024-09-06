/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { AnnotationTarget } from 'app/Types';


export interface AnnotateState {
    annotationTarget?: AnnotationTarget
}

const initialState: AnnotateState = {
    annotationTarget: undefined
};

export const AnnotateSlice = createSlice({
    name: 'annotate',
    initialState,
    reducers: {
        setAnnotationTarget: (state, action: PayloadAction<AnnotationTarget | undefined>) => {
            state.annotationTarget = action.payload;
        },
    },
})

/* Action Creators */
export const {
    setAnnotationTarget
} = AnnotateSlice.actions;

/* Connect with Root State */
export const getAnnotationTarget = (state: RootState) => state.annotate.annotationTarget;

export default AnnotateSlice.reducer;