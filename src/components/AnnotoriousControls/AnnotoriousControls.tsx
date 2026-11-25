/* Import dependencies */
import { AnnotoriousOpenSeadragonAnnotator, ImageAnnotation, OpenSeadragonAnnotationPopup, OpenSeadragonViewer, useAnnotator, useSelection, W3CAnnotation, W3CImageAnnotation } from "@annotorious/react";
import { useEffect, useState } from "react";

/* Import utils */
import { RetrieveEnvVariable } from "app/Utilities";
import { ConstructAnnotationObject, ReformatToAnnotoriousAnnotation } from "app/utilities/AnnotateUtilities";

/* Import hooks */
import { useDigitalMediaAnnotations } from "hooks/useDigitalMedia";

/* Import types */
import { AnnotationJson } from "types/dataMapperTypes";

/* Import components */
import { AnnotationDetailsPopup } from "components/Popups/AnnotationDetailsPopup";
import { AddVisualAnnotationPopup } from "components/Popups/AddVisualAnnotationPopup";

/* Import services */
import InsertAnnotation from "api/annotation/InsertAnnotation";

type AnnotoriousControlsProps = {
    osdOptions: OpenSeadragon.Options;
    identifier: string;
    imageUri: string;
    digitalMediaType: string;
}

export const AnnotoriousControls = ({ osdOptions, identifier, imageUri, digitalMediaType }: AnnotoriousControlsProps) => {
    /* Hooks */
    const osdAnnotator = useAnnotator<AnnotoriousOpenSeadragonAnnotator<ImageAnnotation, W3CImageAnnotation>>();
    const selection = useSelection();
    const { data: annotations } = useDigitalMediaAnnotations({ handle: identifier.replace(RetrieveEnvVariable('DOI_URL'), '')});

    /* Base variables */
    /* State to track when OSD has loaded the image and we have valid dimensions */
    const [inputValue, setInputValue] = useState('');
    const osdViewer = osdAnnotator?.viewer;

    useEffect(() => {
        if (!osdAnnotator || !osdViewer || !annotations?.data) return;
    
        /* Set styling once annotator is ready */
        osdAnnotator.setStyle({
            fill: '#0126CC2B',
            stroke: '#FFFFFF',
            strokeOpacity: 1
        });
    
        /* Get the existing images and transform them to the expected format */
        const loadExistingAnnotations = () => {
            const worldItem = osdViewer.world?.getItemAt(0);
            const contentSize = worldItem?.getContentSize();
    
            if (!contentSize || contentSize.x === 0 || contentSize.y === 0) return;
    
            const dimensions = { x: contentSize.x, y: contentSize.y };
    
            const allImageAnnotations = annotations.data.filter(
                (item: AnnotationJson) =>
                    item?.attributes?.['oa:hasTarget']?.['oa:hasSelector']?.['@type'] === 'oa:FragmentSelector'
            );
    
            const transformAnnotations: W3CImageAnnotation[] = allImageAnnotations.map(
                (anno: AnnotationJson) => ReformatToAnnotoriousAnnotation(anno.attributes, imageUri, dimensions)
            );
    
            /* Set the annotations to the osdAnnotator */
            osdAnnotator.setAnnotations(transformAnnotations);
        };

        /* If viewer is loaded, set existing annotations without re-download of tiles */
        if (osdViewer.world?.getItemAt(0)) {
            loadExistingAnnotations();
        } else {
            osdViewer.addOnceHandler('open', loadExistingAnnotations);
        }
    
        return () => {
            osdViewer.removeHandler('open', loadExistingAnnotations);
        };
    }, [osdAnnotator, osdViewer, imageUri, identifier, annotations]);

    const handleSubmit = async () => {
        /* Select the draft annotation */
        const selectedAnnotation = selection.selected[0];

        /* Return if no selected annotation, osd annotator is not initialized or there is no input value */
        if (!selectedAnnotation || !osdAnnotator || !inputValue.trim()) return;

        /* Select the active selected annotation */
        const activeAnnotation = selectedAnnotation.annotation;

        try {
            /* Get the visual annotation square */
            const item = osdViewer?.world?.getItemAt(0);
            /* Get the actual x and y values for this visual annotation square */
            const contentSize = item?.getContentSize() || { x: 1, y: 1 };

            /* Get the selector from the target for sizes */
            const selector = activeAnnotation.target.selector;

            /* Set size variables before we fill them with current selected visual annotation */
            let x = 0, y = 0, w = 0, h = 0;

            /* Round up the sizes and set them */
            if (selector?.geometry?.bounds) {
                const bounds = selector.geometry.bounds;
                x = Math.round(bounds.minX);
                y = Math.round(bounds.minY);
                w = Math.round(bounds.maxX - bounds.minX);
                h = Math.round(bounds.maxY - bounds.minY);
            }

            /* Set the fragments with the above set values */
            const fragments = {
                xFrac: x / contentSize.x,
                yFrac: y / contentSize.y,
                widthFrac: w / contentSize.x,
                heightFrac: h / contentSize.y
            };

            /* Create a DiSSCo annotation object */
            const newAnnotationPayload = ConstructAnnotationObject({
                digitalObjectId: identifier,
                digitalObjectType: digitalMediaType,
                motivation: 'oa:commenting',
                annotationTargetType: 'ROI',
                annotationValues: [inputValue],
                fragments: fragments
            });

            /* Insert annotation to DiSSCo backend */
            const apiResult = await InsertAnnotation({ newAnnotation: newAnnotationPayload });

            /* If no apiResult, return since we cannot execute all that follows */
            if (!apiResult) {
                throw new Error('API returned an empty response');
            }

            /* Build clean W3C annotation for Annotorious */
            const persistentId = apiResult['@id'];
            const w3cAnnotation: W3CAnnotation = {
                '@context': 'http://www.w3.org/ns/anno.jsonld',
                id: persistentId,
                type: 'Annotation',
                body: [
                    {
                        type: 'TextualBody',
                        value: inputValue,
                        purpose: 'commenting',
                        creator: {
                            id: apiResult['dcterms:creator']['@id'] ?? '',
                            name: apiResult['dcterms:creator']['schema:name'] ?? ''
                        },
                        created: apiResult['dcterms:created']
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
            osdAnnotator.addAnnotation(w3cAnnotation as W3CImageAnnotation);

            /* Clear everything that needs to be clean for a following annotation */
            osdAnnotator.setSelected();
            setInputValue('');

        } catch (error) {
            console.error('Failed to submit annotation:', error);
        }
    }

    /* Cancel handler for the popup and the selected visual annotation */
    const handleCancel = () => {
        if (!osdAnnotator) return;

        /* Get selected annotation */
        const selectedAnnotations = selection?.selected;

        if (selectedAnnotations && selectedAnnotations.length > 0) {
            selectedAnnotations.forEach((selected) => {
                /* Get target annotation by id and check if annotation is submitted */
                const targetAnnotation = osdAnnotator.getAnnotationById(selected.annotation.id);
                const isUnsubmitted = !targetAnnotation?.bodies || targetAnnotation.bodies.length === 0;

                /* If not submitted, remove from annotorious state */
                if (isUnsubmitted) {
                    osdAnnotator.removeAnnotation(selected.annotation.id);
                }
            })
        }

        /* Clear everything */
        osdAnnotator.setSelected();
        setInputValue('');
    }

    /* Renderer for annotation popups, either details or adding */
    const renderAnnotationPopup = () => {
        const selectedAnnotation = selection?.selected?.[0]?.annotation;

        if (!selectedAnnotation) return null;

        const isSubmitted = selectedAnnotation.id.includes('/') || 
                            (selectedAnnotation.bodies && selectedAnnotation.bodies.length > 0);

        if (isSubmitted) {
            return (
                <AnnotationDetailsPopup annotation={selectedAnnotation} />
            )
        }

        return(
            <AddVisualAnnotationPopup
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                inputValue={inputValue}
                setInputValue={setInputValue}
            />
        )
    }

    return (
        <>
            <OpenSeadragonViewer options={osdOptions} className="osd-viewer" />
            <OpenSeadragonAnnotationPopup popup={renderAnnotationPopup} />
        </>
    )
}