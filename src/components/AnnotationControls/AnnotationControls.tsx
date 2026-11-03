/* Import dependencies */
import {
    AnnotoriousOpenSeadragonAnnotator,
    OpenSeadragonAnnotationPopup,
    OpenSeadragonAnnotator,
    OpenSeadragonViewer,
    useAnnotator,
    UserSelectAction,
    useSelection,
    W3CImageAnnotation,
    W3CImageFormat
} from "@annotorious/react";
import { useEffect, useRef, useState } from "react";

/* Import components */
import { InfoAnnotationPopup } from "components/Popups/InfoAnnotationPopup";
import { AddAnnotationPopup } from "components/Popups/AddAnnotationPopup";

/* Import utils */
import { ConstructAnnotationObject, ReformatToAnnotoriousAnnotation } from 'app/utilities/AnnotateUtilities';

/* Import services */
import GetDigitalMediaAnnotations from 'api/digitalMedia/GetDigitalMediaAnnotations';
import InsertAnnotation from 'api/annotation/InsertAnnotation';
import PatchAnnotation from 'api/annotation/PatchAnnotation';
import { RetrieveEnvVariable } from "app/Utilities";

type AnnotatorControlsProps = {
    options: any;
    imageUri: string;
    isDrawingEnabled: boolean;
    digitalMedia?: any;
    onAnnotationSaved?: () => void;
};

export const AnnotationControls = ({
    options,
    imageUri,
    isDrawingEnabled,
    digitalMedia,
    onAnnotationSaved
}: AnnotatorControlsProps) => {
    /* Base variables & state */
    const [inputValue, setInputValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    /* Hooks */
    const osdAnnotator = useAnnotator<AnnotoriousOpenSeadragonAnnotator>();
    console.log(osdAnnotator);
    const selection = useSelection();

    // Track the last selected annotation ID
    const lastSelectedIdRef = useRef<string | null>(null);

    /* -----------------------------------------------------------------
       1. Load Existing DiSSCo Annotations on Mount / Viewer Open
       ----------------------------------------------------------------- */
       useEffect(() => {
        if (!osdAnnotator || !digitalMedia?.['@id']) return;
    
        let isMounted = true;
    
        const loadExistingAnnotations = async () => {
            try {
                const viewer = osdAnnotator.viewer;
                const item = viewer?.world?.getItemAt(0);
    
                if (!item) return;
    
                const contentSize = item.getContentSize();
                if (!contentSize?.x || !contentSize?.y) return;
    
                // 1. Fetch raw DiSSCo annotations from API
                const disscoAnnotations = await GetDigitalMediaAnnotations({
                    handle: digitalMedia['@id'].replace(RetrieveEnvVariable('DOI_URL'), '')
                });
    
                if (!disscoAnnotations || !isMounted) return;
    
                // Format DiSSCo relative fractions into W3C Annotorious objects
                const w3cAnnotations = disscoAnnotations
                    .map((anno: any) => ReformatToAnnotoriousAnnotation(anno, imageUri, contentSize))
                    .filter((anno): anno is W3CImageAnnotation => Boolean(anno));

                // Parse via W3CImageFormat adapter
                const adapter = W3CImageFormat(imageUri);

                const parsedAnnotations = w3cAnnotations
                    .map((w3c) => {
                        const result = adapter.parse(w3c);
                        if (result.error) {
                            console.warn('W3C Parsing Failed for Annotation:', result.error, w3c);
                        }
                        return result.parsed;
                    })
                    .filter((anno): anno is NonNullable<typeof anno> => Boolean(anno));

                // Populate store
                if (parsedAnnotations.length > 0) {
                    osdAnnotator.setAnnotations(parsedAnnotations);
                }
            } catch (error) {
                console.error('Failed to load existing DiSSCo annotations:', error);
            }
        };
    
        const viewer = osdAnnotator.viewer;
        if (viewer) {
            if (viewer.world?.getItemAt(0)) {
                loadExistingAnnotations();
            } else {
                viewer.addHandler('open', loadExistingAnnotations);
            }
        }
    
        return () => {
            isMounted = false;
            if (viewer) {
                viewer.removeHandler('open', loadExistingAnnotations);
            }
        };
    }, [osdAnnotator, digitalMedia, imageUri]);

    /* -----------------------------------------------------------------
       2. Selection Monitor & Click-Away Cleanup for Drafts
       ----------------------------------------------------------------- */
    useEffect(() => {
        const currentlySelected = selection?.selected?.[0]?.annotation;

        if (currentlySelected) {
            lastSelectedIdRef.current = currentlySelected.id;
            
            // Prefill input if editing an existing annotation body
            const existingValue = currentlySelected.bodies?.[0]?.value || '';
            setInputValue(existingValue);
        } else if (lastSelectedIdRef.current) {
            const previousId = lastSelectedIdRef.current;
            const targetAnnotation = osdAnnotator?.getAnnotationById(previousId);

            // Check if annotation has no bodies attached (unsubmitted draft)
            const isUnsubmitted = !targetAnnotation?.bodies || targetAnnotation.bodies.length === 0;

            if (isUnsubmitted && osdAnnotator) {
                osdAnnotator.removeAnnotation(previousId);
            }

            lastSelectedIdRef.current = null;
            setInputValue('');
            setIsEditing(false);
        }
    }, [selection, osdAnnotator]);

    /* -----------------------------------------------------------------
       3. Cancel Handler (Removes draft or resets selection)
       ----------------------------------------------------------------- */
    const handleCancel = () => {
        if (!osdAnnotator) return;

        const selected = selection?.selected;

        if (selected && selected.length > 0) {
            selected.forEach((sel) => {
                const targetAnnotation = osdAnnotator.getAnnotationById(sel.annotation.id);
                const isUnsubmitted = !targetAnnotation?.bodies || targetAnnotation.bodies.length === 0;
                
                if (isUnsubmitted) {
                    osdAnnotator.removeAnnotation(sel.annotation.id);
                }
            });
        }

        osdAnnotator.setSelected();
        lastSelectedIdRef.current = null;
        setInputValue('');
        setIsEditing(false);
    };

    /* -----------------------------------------------------------------
       4. Submit Handler (Add / Edit DiSSCo Annotation)
       ----------------------------------------------------------------- */
    const handleSubmit = async () => {
        const selectedItem = selection?.selected?.[0];
        if (!selectedItem || !osdAnnotator || !inputValue.trim()) return;
    
        const activeAnnotation = selectedItem.annotation;
    
        try {
            // 1. Get real content size from OpenSeaDragon viewer
            const viewer = osdAnnotator.viewer;
            const item = viewer?.world?.getItemAt(0);
            const contentSize = item?.getContentSize() || { x: 1, y: 1 };
    
            // 2. Extract pixel values directly from active shape target
            const target = activeAnnotation.target as any;
            const selector = Array.isArray(target?.selector) ? target.selector[0] : target?.selector;
            
            let x = 0, y = 0, w = 0, h = 0;
    
            if (selector?.geometry?.bounds) {
                const bounds = selector.geometry.bounds;
                x = Math.round(bounds.minX);
                y = Math.round(bounds.minY);
                w = Math.round(bounds.maxX - bounds.minX);
                h = Math.round(bounds.maxY - bounds.minY);
            } else if (selector?.value?.includes('xywh=pixel:')) {
                const rawCoords = selector.value.replace('xywh=pixel:', '').split(',');
                x = Math.round(Number.parseFloat(rawCoords[0]) || 0);
                y = Math.round(Number.parseFloat(rawCoords[1]) || 0);
                w = Math.round(Number.parseFloat(rawCoords[2]) || 0);
                h = Math.round(Number.parseFloat(rawCoords[3]) || 0);
            }
    
            if (w === 0 || h === 0) {
                console.error('Invalid selection dimensions');
                return;
            }
    
            // 3. Compute relative fragments (0.0 - 1.0) for DiSSCo spec
            const fragments = {
                xFrac: x / contentSize.x,
                yFrac: y / contentSize.y,
                widthFrac: w / contentSize.x,
                heightFrac: h / contentSize.y
            };
    
            // 4. Construct DiSSCo Annotation object
            const newAnnotationPayload = ConstructAnnotationObject({
                digitalObjectId: digitalMedia?.['@id'],
                digitalObjectType: digitalMedia?.['@type'],
                motivation: 'oa:commenting',
                annotationTargetType: 'ROI',
                annotationValues: [inputValue],
                fragments: fragments
            });
    
            // 5. Submit to DiSSCo backend API
            const isExisting = activeAnnotation.id.includes('/');
            const apiResult = !isExisting
                ? await InsertAnnotation({ newAnnotation: newAnnotationPayload })
                : await PatchAnnotation({
                      annotationId: activeAnnotation.id,
                      updatedAnnotation: newAnnotationPayload
                  });
    
            if (!apiResult) {
                throw new Error('API returned an empty response');
            }
    
            const persistentId = apiResult['@id'];
    
            // 6. Build clean W3C Annotation for Annotorious (since adapter={W3CImageFormat} is active)
            const w3cAnnotation = {
                '@context': 'http://www.w3.org/ns/anno.jsonld',
                id: persistentId,
                type: 'Annotation',
                body: [
                    {
                        type: 'TextualBody',
                        value: inputValue,
                        purpose: 'commenting'
                    }
                ],
                target: {
                    source: imageUri,
                    selector: {
                        type: 'FragmentSelector',
                        conformsTo: 'http://www.w3.org/TR/media-frags/',
                        value: `xywh=pixel:${x},${y},${w},${h}`
                    }
                }
            };
    
            // 7. Update local Annotorious v3 instance state
            osdAnnotator.removeAnnotation(activeAnnotation.id);
            osdAnnotator.addAnnotation(w3cAnnotation as any);
    
            // 8. Clear state
            lastSelectedIdRef.current = null;
            osdAnnotator.setSelected();
            setInputValue('');
            setIsEditing(false);
            onAnnotationSaved?.();
        } catch (error) {
            console.error('Failed to submit annotation:', error);
        }
    };

    /* Render either an add annotation or info popup */
    const annotationPopup = () => {
        const selectedAnnotation = selection?.selected?.[0]?.annotation;

        if (!selectedAnnotation) return null;

        // Check if annotation has already been submitted to DiSSCo
        const isSubmitted = selectedAnnotation.id.includes('/') || 
                            (selectedAnnotation.bodies && selectedAnnotation.bodies.length > 0);

        // If it is an existing submitted annotation AND we are not explicitly editing it, show Info Popup
        if (isSubmitted && !isEditing) {
            return (
                <InfoAnnotationPopup
                    annotation={selectedAnnotation}
                />
            );
        }

        // Otherwise, show the Creation / Edit Form Popup
        return (
            <AddAnnotationPopup
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                inputValue={inputValue}
                setInputValue={setInputValue}
            />
        );
    };

    return (
        <>
            <OpenSeadragonViewer options={options} className="osd-viewer" />
            <OpenSeadragonAnnotationPopup popup={annotationPopup} />
        </>
    );
};