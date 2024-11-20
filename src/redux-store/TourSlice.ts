/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { Annotation } from 'app/types/Annotation';
import { Dict } from 'app/Types';


/* Slice type */
type GlobalState = {
    annotationWizardDummyAnnotation?: Annotation;
    annotationWizardFormValues: Dict | undefined;
    annotationWizardSelectedIndex: number | undefined;
    annotationWizardToggle: boolean;
};

const initialState: GlobalState = {
    annotationWizardDummyAnnotation: undefined,
    annotationWizardFormValues: undefined,
    annotationWizardSelectedIndex: undefined,
    annotationWizardToggle: false
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
        }
    },
})

/* Action Creators */
export const {
    setAnnotationWizardDummyAnnotation,
    setAnnotationWizardFormValues,
    setAnnotationWizardSelectedIndex,
    setAnnotationWizardToggle
} = TourSlice.actions;

/* Connect with Root State */
export const getAnnotationWizardDummyAnnotation = (state: RootState) => state.tour.annotationWizardDummyAnnotation;
export const getAnnotationWizardFormValues = (state: RootState) => state.tour.annotationWizardFormValues;
export const getAnnotationWizardSelectedIndex = (state: RootState) => state.tour.annotationWizardSelectedIndex;
export const getAnnotationWizardToggle = (state: RootState) => state.tour.annotationWizardToggle;

export default TourSlice.reducer;