/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store';

/* Import Types */
import { Annotation, AnnotateTarget, Specimen, DigitalMedia } from 'global/Types';


export interface AnnotateState {
    sidePanelToggle: boolean,
    annotateTarget: AnnotateTarget;
    overviewAnnotations: Annotation[];
    MASTarget: Specimen | DigitalMedia
}

const initialState: AnnotateState = {
    sidePanelToggle: false,
    annotateTarget: {
        property: '',
        motivation: '',
        target: {} as Specimen | DigitalMedia,
        targetType: '',
        annotations: [] as Annotation[]
    },
    overviewAnnotations: [],
    MASTarget: {} as Specimen | DigitalMedia
};

export const AnnotateSlice = createSlice({
    name: 'annotate',
    initialState,
    reducers: {
        setSidePanelToggle: (state, action: PayloadAction<boolean>) => {
            state.sidePanelToggle = action.payload;
        },
        setAnnotateTarget: (state, action: PayloadAction<AnnotateTarget>) => {
            state.annotateTarget = action.payload;
        },
        setOverviewAnnotations: (state, action: PayloadAction<Annotation[]>) => {
            state.overviewAnnotations = action.payload;
        },
        setMASTarget: (state, action: PayloadAction<Specimen | DigitalMedia>) => {
            state.MASTarget = action.payload;
        }
    },
})

/* Action Creators */
export const { setSidePanelToggle, setAnnotateTarget, setOverviewAnnotations, setMASTarget } = AnnotateSlice.actions;

/* Connect with Root State */
export const getSidePanelToggle = (state: RootState) => state.annotate.sidePanelToggle;
export const getAnnotateTarget = (state: RootState) => state.annotate.annotateTarget;
export const getOverviewAnnotations = (state: RootState) => state.annotate.overviewAnnotations;
export const getMASTarget = (state: RootState) => state.annotate.MASTarget;

export default AnnotateSlice.reducer;