/* Import dependencies */
import {
    AnnotoriousOpenSeadragonAnnotator,
    OpenSeadragonAnnotationPopup,
    OpenSeadragonAnnotator,
    OpenSeadragonViewer,
    useAnnotator,
    UserSelectAction,
    useSelection,
    W3CImageFormat
} from "@annotorious/react";
import { useEffect, useRef, useState } from "react";

/* Import components */
import { InfoAnnotationPopup } from "components/Popups/InfoAnnotationPopup";
import { AddAnnotationPopup } from "components/Popups/AddAnnotationPopup";

/* Import utils */
import { ConstructAnnotationObject } from 'app/utilities/AnnotateUtilities';

/* Import services */
import InsertAnnotation from 'api/annotation/InsertAnnotation';
import PatchAnnotation from 'api/annotation/PatchAnnotation';

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

    /* Hooks */
    const osdAnnotator = useAnnotator<AnnotoriousOpenSeadragonAnnotator>();
    const selection = useSelection();

    // Track the last selected annotation ID
    const lastSelectedIdRef = useRef<string | null>(null);

    // Synchronize selection changes and clean up unsubmitted shapes on click-away
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

            // Check if annotation has no bodies attached (unsubmitted)
            const isUnsubmitted = !targetAnnotation?.bodies || targetAnnotation.bodies.length === 0;

            if (isUnsubmitted && osdAnnotator) {
                osdAnnotator.removeAnnotation(previousId);
            }

            lastSelectedIdRef.current = null;
            setInputValue('');
        }
    }, [selection, osdAnnotator]);

    /* Cancel handler to remove the uncommitted/selected shape */
    const handleCancel = () => {
        if (!osdAnnotator) return;

        const selected = selection?.selected;

        if (selected && selected.length > 0) {
            selected.forEach((sel) => {
                osdAnnotator.removeAnnotation(sel.annotation.id);
            });
        }

        osdAnnotator.setSelected();
        lastSelectedIdRef.current = null;
        setInputValue('');
    };

    /* Submit Handler for DiSSCover */
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
            
            // Pass the W3C object directly; osdAnnotator will automatically parse it using W3CImageFormat
            osdAnnotator.addAnnotation(w3cAnnotation as any);
    
            // 8. Clear state
            lastSelectedIdRef.current = null;
            osdAnnotator.setSelected();
            setInputValue('');
            onAnnotationSaved?.();
        } catch (error) {
            console.error('Failed to submit annotation:', error);
        }
    };

    /* Annotation popup renderer */
    /* State to track if an existing annotation is currently in edit mode */
    const [isEditing, setIsEditing] = useState(false);

    /* Dynamic Popup Renderer */
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
            ></AddAnnotationPopup>
        );
    };

    return (
        <div className="osd-annotator-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <OpenSeadragonAnnotator
                adapter={W3CImageFormat(imageUri)}
                drawingEnabled={isDrawingEnabled}
                tool="rectangle"
                drawingMode="click"
                userSelectAction={UserSelectAction.SELECT}
            >
                <OpenSeadragonViewer options={options} className="osd-viewer" />
                <OpenSeadragonAnnotationPopup popup={annotationPopup} />
            </OpenSeadragonAnnotator>
        </div>
    );
};