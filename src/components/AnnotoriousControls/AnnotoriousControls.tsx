/* Import dependencies */
import { AnnotoriousOpenSeadragonAnnotator, ImageAnnotation, OpenSeadragonAnnotationPopup, OpenSeadragonViewer, useAnnotator, useSelection } from "@annotorious/react";
import { useEffect, useState } from "react";

/* Import utils */
import { RetrieveEnvVariable } from "app/Utilities";
import { ConstructAnnotationObject, ReformatToAnnotoriousAnnotation } from "app/utilities/AnnotateUtilities";

/* Import hooks */
import { useDigitalMediaAnnotations } from "hooks/useDigitalMedia";

/* Import types */
import { AnnotationJson } from "types/dataMapperTypes";
import { OsdOptions } from "types/annotationTypes";

/* Import components */
import { AnnotationDetailsPopup } from "components/Popups/AnnotationDetailsPopup";
import { AddVisualAnnotationPopup } from "components/Popups/AddVisualAnnotationPopup";

type AnnotoriousControlsProps = {
    osdOptions: OsdOptions;
    identifier: string;
    imageUri: string;
    digitalMediaType: string;
}

export const AnnotoriousControls = ({ osdOptions, identifier, imageUri, digitalMediaType }: AnnotoriousControlsProps) => {
    /* Hooks */
    const osdAnnotator = useAnnotator<AnnotoriousOpenSeadragonAnnotator>();
    const selection = useSelection();
    const { data: annotations } = useDigitalMediaAnnotations({ handle: identifier.replace(RetrieveEnvVariable('DOI_URL'), '')});

    /* Base variables */
    /* State to track when OSD has loaded the image and we have valid dimensions */
    const [imageDimensions, setImageDimensions] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [inputValue, setInputValue] = useState('');
    const osdViewer = osdAnnotator?.viewer;

    /* Listening to when the viewer is ready and dimensions can be used */
    useEffect(() => {
        /* Set viewer */
        if (!osdViewer) return;

        /* Function to update dimensions */
        const updateDimensions = () => {
            const worldItem = osdViewer.world?.getItemAt(0);
            const contentSize = worldItem?.getContentSize();
            /* Set image dimensions once x and y are not the default 0 */
            if (contentSize && contentSize.x > 0 && contentSize.y > 0) {
                setImageDimensions({ x: contentSize.x, y: contentSize.y });
            }
        }

        /* If viewer is loaded, set dimensions */
        if (osdViewer.world?.getItemAt(0)) {
            updateDimensions();
        };

        /* Attach listener to osd viewer so that we stay up to date of loading and update dimensions appropriately */
        osdViewer.addHandler('open', updateDimensions);

        return () => {
            osdViewer.removeHandler('open', updateDimensions);
        };
    }, [osdAnnotator]);

    /* use effect hook to set the annotations that we already have */
    useEffect(() => {
        if (!osdAnnotator || !annotations || !imageDimensions) return;

        /* Function to filter on visual annotations and then transform those to Annotorious appropriate format */
        const loadExistingAnnotations = () => {
            const allImageAnnotations = annotations?.data?.filter((item: AnnotationJson) => item?.attributes?.['oa:hasTarget']?.['oa:hasSelector']?.['@type'] === 'oa:FragmentSelector');
            const transformAnnotations: ImageAnnotation[] = allImageAnnotations.map((anno: AnnotationJson) => {
                return ReformatToAnnotoriousAnnotation(anno.attributes, imageUri, imageDimensions);
            });
    
            /* If we have transformed annotations and the osdAnnotator is still defined, we set the annotorious annotations */
            if (transformAnnotations.length > 0 && osdAnnotator) {
                osdAnnotator.setAnnotations(transformAnnotations);
            };
        }
        /* Set styling of annotations */
        osdAnnotator.setStyle({
            fill: '#0126CC2B',
            stroke: '#FFFFFF',
            strokeOpacity: 1
        });

        /* Load existing annotations */
        loadExistingAnnotations();

    }, [osdAnnotator, imageUri, identifier, annotations, imageDimensions]);

    const handleSubmit = () => {
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
            console.log('new annotation', newAnnotationPayload);

            

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

    /* Renderer for annotation popups, either details or soon adding */
    const renderAnnotationPopup = () => {
        const selectedAnnotation = selection?.selected?.[0]?.annotation;

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