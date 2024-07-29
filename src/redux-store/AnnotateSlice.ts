/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';


export interface AnnotateState {
    annotationSidePanelToggle: boolean
}

const initialState: AnnotateState = {
    annotationSidePanelToggle: false
};

export const AnnotateSlice = createSlice({
    name: 'annotate',
    initialState,
    reducers: {
        setAnnotationSidePanelToggle: (state, action: PayloadAction<boolean>) => {
            state.annotationSidePanelToggle = action.payload;
        }
    },
})

/* Action Creators */
export const {
    setAnnotationSidePanelToggle
} = AnnotateSlice.actions;

/* Connect with Root State */
export const getAnnotationSidePanelToggle = (state: RootState) => state.annotate.annotationSidePanelToggle;

export default AnnotateSlice.reducer;