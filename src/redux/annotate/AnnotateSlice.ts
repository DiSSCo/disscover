/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { Annotation, AnnotateTarget, DigitalSpecimen, DigitalMedia } from 'app/Types';


export interface AnnotateState {
    sidePanelToggle: boolean,
    annotationFormToggle: boolean,
    annotateTarget: AnnotateTarget;
    editAnnotation: Annotation;
    highlightAnnotationId: string;
    overviewAnnotations: Annotation[];
    MASTarget: DigitalSpecimen | DigitalMedia
}

const initialState: AnnotateState = {
    sidePanelToggle: false,
    annotationFormToggle: false,
    annotateTarget: {
        property: '',
        motivation: '',
        target: {} as DigitalSpecimen | DigitalMedia,
        targetType: '',
        annotations: [] as Annotation[]
    },
    editAnnotation: {} as Annotation,
    highlightAnnotationId: '',
    overviewAnnotations: [],
    MASTarget: {} as DigitalSpecimen | DigitalMedia
};

export const AnnotateSlice = createSlice({
    name: 'annotate',
    initialState,
    reducers: {
        setSidePanelToggle: (state, action: PayloadAction<boolean>) => {
            state.sidePanelToggle = action.payload;
        },
        setAnnotationFormToggle: (state, action: PayloadAction<boolean>) => {
            state.annotationFormToggle = action.payload;
        },
        setAnnotateTarget: (state, action: PayloadAction<AnnotateTarget>) => {
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
        setMASTarget: (state, action: PayloadAction<DigitalSpecimen | DigitalMedia>) => {
            state.MASTarget = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setSidePanelToggle,
    setAnnotationFormToggle,
    setAnnotateTarget,
    setEditAnnotation,
    setHighlightAnnotationId,
    setOverviewAnnotations,
    setMASTarget
} = AnnotateSlice.actions;

/* Connect with Root State */
export const getSidePanelToggle = (state: RootState) => state.annotate.sidePanelToggle;
export const getAnnotationFormToggle = (state: RootState) => state.annotate.annotationFormToggle;
export const getAnnotateTarget = (state: RootState) => state.annotate.annotateTarget;
export const getEditAnnotation = (state: RootState) => state.annotate.editAnnotation;
export const getHighlightAnnotationId = (state: RootState) => state.annotate.highlightAnnotationId;
export const getOverviewAnnotations = (state: RootState) => state.annotate.overviewAnnotations;
export const getMASTarget = (state: RootState) => state.annotate.MASTarget;

export default AnnotateSlice.reducer;