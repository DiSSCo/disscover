/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { AnnotationContext, AnnotationTarget } from 'app/Types';


export interface AnnotateState {
    annotationTarget?: AnnotationTarget,
    annotationMode: boolean,
    annotationContext: AnnotationContext
}

const initialState: AnnotateState = {
    annotationTarget: undefined,
    annotationMode: false,
    annotationContext: {
        title: undefined,
        adjustedFormFields: []
    }
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
        },
        setAnnotationContext: (state, action: PayloadAction<AnnotationContext>) => {
            state.annotationContext = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setAnnotationTarget,
    setAnnotationMode,
    setAnnotationContext
} = AnnotateSlice.actions;

/* Connect with Root State */
export const getAnnotationTarget = (state: RootState) => state.annotate.annotationTarget;
export const getAnnotationMode = (state: RootState) => state.annotate.annotationMode;
export const getAnnotationContext = (state: RootState) => state.annotate.annotationContext;

export default AnnotateSlice.reducer;