/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { AnnotateTarget } from 'app/Types';
import { Annotation } from 'app/types/Annotation';
import { DigitalSpecimen } from 'app/types/DigitalSpecimen';
import { DigitalEntity } from 'app/types/DigitalEntity';


export interface AnnotateState {
    sidePanelToggle: boolean,
    annotationFormToggle: boolean,
    annotateTarget: AnnotateTarget;
    editAnnotation: Annotation;
    highlightAnnotationId: string;
    overviewAnnotations: Annotation[];
    MASTarget: DigitalSpecimen | DigitalEntity,
    MASTabIndex: number,
    scheduledMAS: string[]
}

const initialState: AnnotateState = {
    sidePanelToggle: false,
    annotationFormToggle: false,
    annotateTarget: {
        target: {} as DigitalSpecimen | DigitalEntity,
        targetType: '',
        targetProperty: {
            name: '',
            type: ''
        },
        currentValue: [],
        motivation: '',
        annotations: [] as Annotation[]
    },
    editAnnotation: {} as Annotation,
    highlightAnnotationId: '',
    overviewAnnotations: [],
    MASTarget: {} as DigitalSpecimen | DigitalEntity,
    MASTabIndex: 0,
    scheduledMAS: []
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
        setMASTarget: (state, action: PayloadAction<DigitalSpecimen | DigitalEntity>) => {
            state.MASTarget = action.payload;
        },
        setMASTabIndex: (state, action: PayloadAction<number>) => {
            state.MASTabIndex = action.payload;
        },
        pushToScheduledMAS: (state, action: PayloadAction<string>) => {
            state.scheduledMAS.push(action.payload);
        },
        removeFromScheduledMAS: (state, action: PayloadAction<string>) => {
            state.scheduledMAS.splice(state.scheduledMAS.findIndex((masId) => masId === action.payload), 1);
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
    setMASTarget,
    setMASTabIndex,
    pushToScheduledMAS,
    removeFromScheduledMAS
} = AnnotateSlice.actions;

/* Connect with Root State */
export const getSidePanelToggle = (state: RootState) => state.annotate.sidePanelToggle;
export const getAnnotationFormToggle = (state: RootState) => state.annotate.annotationFormToggle;
export const getAnnotateTarget = (state: RootState) => state.annotate.annotateTarget;
export const getEditAnnotation = (state: RootState) => state.annotate.editAnnotation;
export const getHighlightAnnotationId = (state: RootState) => state.annotate.highlightAnnotationId;
export const getOverviewAnnotations = (state: RootState) => state.annotate.overviewAnnotations;
export const getMASTarget = (state: RootState) => state.annotate.MASTarget;
export const getMASTabIndex = (state: RootState) => state.annotate.MASTabIndex;
export const getScheduledMAS = (state: RootState) => state.annotate.scheduledMAS;

export default AnnotateSlice.reducer;