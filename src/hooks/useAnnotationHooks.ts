import { useCallback } from 'react';
import { useAppDispatch } from 'app/Hooks';
import { setAnnotationTarget } from 'redux-store/AnnotateSlice';
import { AnnotationTargetPayload } from 'types/digitalSpecimenTypes';

const DefaultTarget: AnnotationTargetPayload = {
    type: 'class',
    jsonPath: '',
    directPath: true,
};

/**
 * Hook to set the annotationMode
 * @param setAnnotationMode Local state 
 * @returns Boolean
 */
export const useAnnotationHandler = (setAnnotationMode: (active: boolean) => void) => {
    const dispatch = useAppDispatch();

    const handleOpenAnnotation = useCallback((target?: AnnotationTargetPayload) => {
        dispatch(setAnnotationTarget(target ?? DefaultTarget));
        setAnnotationMode(true);
    }, [dispatch, setAnnotationMode]);

    return handleOpenAnnotation;
};