/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { AnnotationTarget } from 'app/Types';


export interface AnnotateState {
    annotationTarget?: AnnotationTarget,
    annotationMode: boolean
}

const initialState: AnnotateState = {
    annotationTarget: undefined,
    annotationMode: false
};

export const AnnotateSlice = createSlice({
    name: 'annotate',
    initialState,
    reducers: {
        setAnnotationTarget: (state, action: PayloadAction<AnnotationTarget | undefined>) => {
            state.annotationTarget = action.payload;
        },
        setAnnotationMode: (state, action: PayloadAction<boolean>) => {
            state.annotationMode = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setAnnotationTarget,
    setAnnotationMode,
} = AnnotateSlice.actions;

/* Connect with Root State */
export const getAnnotationTarget = (state: RootState) => state.annotate.annotationTarget;
export const getAnnotationMode = (state: RootState) => state.annotate.annotationMode;

export default AnnotateSlice.reducer;