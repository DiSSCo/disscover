/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { Annotation, AnnotateTarget, Specimen, DigitalMedia } from 'global/Types';


export interface AnnotateState {
    annotateTarget: AnnotateTarget,
}

const initialState: AnnotateState = {
    annotateTarget: {
        property: '',
        motivation: '',
        target: <Specimen | DigitalMedia>{},
        targetType: '',
        annotations: <Annotation[]>[]
    }
};

export const AnnotateSlice = createSlice({
    name: 'annotate',
    initialState,
    reducers: {
        setAnnotateTarget: (state, action: PayloadAction<AnnotateTarget>) => {
            state.annotateTarget = action.payload;
        }
    },
})

/* Action Creators */
export const { setAnnotateTarget } = AnnotateSlice.actions;

/* Connect with Root State */
export const getAnnotateTarget = (state: RootState) => state.annotate.annotateTarget;

export default AnnotateSlice.reducer;