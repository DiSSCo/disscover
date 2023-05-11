/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { Annotation, AnnotateTarget, Specimen, DigitalMedia } from 'global/Types';


export interface AnnotateState {
    annotateTarget: AnnotateTarget;
    overviewAnnotations: Annotation[];
}

const initialState: AnnotateState = {
    annotateTarget: {
        property: '',
        motivation: '',
        target: {} as Specimen | DigitalMedia,
        targetType: '',
        annotations: [] as Annotation[]
    },
    overviewAnnotations: []
};

export const AnnotateSlice = createSlice({
    name: 'annotate',
    initialState,
    reducers: {
        setAnnotateTarget: (state, action: PayloadAction<AnnotateTarget>) => {
            state.annotateTarget = action.payload;
        },
        setOverviewAnnotations: (state, action: PayloadAction<Annotation[]>) => {
            state.overviewAnnotations = action.payload;
        }
    },
})

/* Action Creators */
export const { setAnnotateTarget, setOverviewAnnotations } = AnnotateSlice.actions;

/* Connect with Root State */
export const getAnnotateTarget = (state: RootState) => state.annotate.annotateTarget;
export const getOverviewAnnotations = (state: RootState) => state.annotate.overviewAnnotations;

export default AnnotateSlice.reducer;