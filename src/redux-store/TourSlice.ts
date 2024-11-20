/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { Annotation } from 'app/types/Annotation';
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';
import { MasJobRecord, Dict } from 'app/Types';


/* Slice type */
type GlobalState = {
    annotationWizardDummyAnnotation: Annotation | undefined;
    annotationWizardFormValues: Dict | undefined;
    annotationWizardSelectedIndex: number | undefined;
    annotationWizardToggle: boolean;
    masMenuToggle: boolean;
    masScheduleMenuToggle: boolean;
    masDummy: MachineAnnotationService | undefined;
    masMachineJobRecordDummy: MasJobRecord | undefined;
};

const initialState: GlobalState = {
    annotationWizardDummyAnnotation: undefined,
    annotationWizardFormValues: undefined,
    annotationWizardSelectedIndex: undefined,
    annotationWizardToggle: false,
    masMenuToggle: false,
    masScheduleMenuToggle: false,
    masDummy: undefined,
    masMachineJobRecordDummy: undefined
};

export const TourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {
        setAnnotationWizardDummyAnnotation: (state, action: PayloadAction<Annotation | undefined>) => {
            state.annotationWizardDummyAnnotation = action.payload;
        },
        setAnnotationWizardFormValues: (state, action: PayloadAction<Dict | undefined>) => {
            state.annotationWizardFormValues = {
                ...state.annotationWizardFormValues,
                ...action.payload
            }
        },
        setAnnotationWizardSelectedIndex: (state, action: PayloadAction<number | undefined>) => {
            state.annotationWizardSelectedIndex = action.payload;
        },
        setAnnotationWizardToggle: (state, action: PayloadAction<boolean>) => {
            state.annotationWizardToggle = action.payload;
        },
        setMasMenuToggle: (state, action: PayloadAction<boolean>) => {
            state.masMenuToggle = action.payload;
        },
        setMasScheduleMenuToggle: (state, action: PayloadAction<boolean>) => {
            state.masScheduleMenuToggle = action.payload;
        },
        setMasDummy: (state, action: PayloadAction<MachineAnnotationService | undefined>) => {
            state.masDummy = action.payload;
        },
        setMasMachineJobRecordDummy: (state, action: PayloadAction<MasJobRecord | undefined>) => {
            state.masMachineJobRecordDummy = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setAnnotationWizardDummyAnnotation,
    setAnnotationWizardFormValues,
    setAnnotationWizardSelectedIndex,
    setAnnotationWizardToggle,
    setMasMenuToggle,
    setMasScheduleMenuToggle,
    setMasDummy,
    setMasMachineJobRecordDummy
} = TourSlice.actions;

/* Connect with Root State */
export const getAnnotationWizardDummyAnnotation = (state: RootState) => state.tour.annotationWizardDummyAnnotation;
export const getAnnotationWizardFormValues = (state: RootState) => state.tour.annotationWizardFormValues;
export const getAnnotationWizardSelectedIndex = (state: RootState) => state.tour.annotationWizardSelectedIndex;
export const getAnnotationWizardToggle = (state: RootState) => state.tour.annotationWizardToggle;
export const getMasMenuToggle = (state: RootState) => state.tour.masMenuToggle;
export const getMasScheduleMenuToggle = (state: RootState) => state.tour.masScheduleMenuToggle;
export const getMasDummy = (state: RootState) => state.tour.masDummy;
export const getMasMachineJobRecordDummy = (state: RootState) => state.tour.masMachineJobRecordDummy;

export default TourSlice.reducer;