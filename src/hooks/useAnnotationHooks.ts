import { useCallback } from 'react';
import { useAppDispatch } from 'app/Hooks';
import { setAnnotationTarget } from 'redux-store/AnnotateSlice';
import { AnnotationTargetPayload } from 'types/digitalSpecimenTypes';

/**
 * Hook to set the annotationMode
 * @param setAnnotationMode Local state 
 * @returns Boolean
 */
export const useAnnotationHandler = (setAnnotationMode: (active: boolean) => void) => {
    const dispatch = useAppDispatch();

    const handleOpenAnnotation = useCallback((target?: AnnotationTargetPayload) => {
        dispatch(setAnnotationTarget(target ?? undefined));
        setAnnotationMode(true);
    }, [dispatch, setAnnotationMode]);

    return handleOpenAnnotation;
};