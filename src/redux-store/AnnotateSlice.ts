/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { AnnotationTarget } from 'app/Types';
import { Annotation } from 'app/types/Annotation';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalEntity } from 'app/types/DigitalEntity';


export interface AnnotateState {
    annotationPanelToggle: boolean,
    annotationFormToggle: boolean,
    annotateTarget: AnnotationTarget | undefined;
    editAnnotation: Annotation;
    highlightAnnotationId: string;
    overviewAnnotations: Annotation[];
    MASTarget: DigitalSpecimen | DigitalEntity,
    MASTabIndex: number,
    scheduledMASJobs: string[]
}

const initialState: AnnotateState = {
    annotationPanelToggle: false,
    annotationFormToggle: false,
    annotateTarget: undefined,
    editAnnotation: {} as Annotation,
    highlightAnnotationId: '',
    overviewAnnotations: [],
    MASTarget: {} as DigitalSpecimen | DigitalEntity,
    MASTabIndex: 0,
    scheduledMASJobs: []
};

export const AnnotateSlice = createSlice({
    name: 'annotate',
    initialState,
    reducers: {
        setAnnotationPanelToggle: (state, action: PayloadAction<boolean>) => {
            state.annotationPanelToggle = action.payload;
        },
        setAnnotationFormToggle: (state, action: PayloadAction<boolean>) => {
            state.annotationFormToggle = action.payload;
        },
        setAnnotateTarget: (state, action: PayloadAction<AnnotationTarget>) => {
            state.annotateTarget = action.payload;
        },
        setEditAnnotation: (state, action: PayloadAction<Annotation>) => {
            state.editAnnotation = action.payload;
        },
        setHighlightAnnotationId: (state, action: PayloadAction<string>) => {
            state.highlightAnnotationId = action.payload;
        },
        setOverviewAnnotations: (state, action: PayloadAction<Annotation[]>) => {
            state.overviewAnnotations = action.payload;
        },
        setMASTarget: (state, action: PayloadAction<DigitalSpecimen | DigitalEntity>) => {
            state.MASTarget = action.payload;
        },
        setMASTabIndex: (state, action: PayloadAction<number>) => {
            state.MASTabIndex = action.payload;
        },
        pushToScheduledMASJobs: (state, action: PayloadAction<string>) => {
            state.scheduledMASJobs.push(action.payload);
        },
        removeFromScheduledMASJobs: (state, action: PayloadAction<string>) => {
            state.scheduledMASJobs.splice(state.scheduledMASJobs.findIndex((masJobId) => masJobId === action.payload), 1);
        }
    },
})

/* Action Creators */
export const {
    setAnnotationPanelToggle,
    setAnnotationFormToggle,
    setAnnotateTarget,
    setEditAnnotation,
    setHighlightAnnotationId,
    setOverviewAnnotations,
    setMASTarget,
    setMASTabIndex,
    pushToScheduledMASJobs,
    removeFromScheduledMASJobs
} = AnnotateSlice.actions;

// /* Connect with Root State */
// export const getAnnotationPanelToggle = (state: RootState) => state.annotate.annotationPanelToggle;
// export const getAnnotationFormToggle = (state: RootState) => state.annotate.annotationFormToggle;
// export const getAnnotateTarget = (state: RootState) => state.annotate.annotateTarget;
// export const getEditAnnotation = (state: RootState) => state.annotate.editAnnotation;
// export const getHighlightAnnotationId = (state: RootState) => state.annotate.highlightAnnotationId;
// export const getOverviewAnnotations = (state: RootState) => state.annotate.overviewAnnotations;
// export const getMASTarget = (state: RootState) => state.annotate.MASTarget;
// export const getMASTabIndex = (state: RootState) => state.annotate.MASTabIndex;
// export const getScheduledMASJobs = (state: RootState) => state.annotate.scheduledMASJobs;

export default AnnotateSlice.reducer;