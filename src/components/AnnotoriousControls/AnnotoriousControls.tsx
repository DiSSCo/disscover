/* Import dependencies */
import { AnnotoriousOpenSeadragonAnnotator, ImageAnnotation, OpenSeadragonAnnotationPopup, OpenSeadragonViewer, useAnnotator, useSelection } from "@annotorious/react";
import { useEffect } from "react";

/* Import utils */
import { RetrieveEnvVariable } from "app/Utilities";
import { ReformatToAnnotoriousAnnotation } from "app/utilities/AnnotateUtilities";

/* Import hooks */
import { useDigitalMediaAnnotations } from "hooks/useDigitalMedia";

/* Import types */
import { AnnotationJson } from "types/dataMapperTypes";

/* Import components */
import { AnnotationDetailsPopup } from "components/Popups/AnnotationDetailsPopup";

type AnnotoriousControlsProps = {
    osdOptions: OpenSeadragon.Options;
    identifier: string;
    imageUri: string;
}

export const AnnotoriousControls = ({ osdOptions, identifier, imageUri }: AnnotoriousControlsProps) => {
    /* Hooks */
    const osdAnnotator = useAnnotator<AnnotoriousOpenSeadragonAnnotator>();
    const selection = useSelection();
    const { data: annotations } = useDigitalMediaAnnotations({ handle: identifier.replace(RetrieveEnvVariable('DOI_URL'), '')});

    /* Base variables */
    const worldItem = osdAnnotator?.viewer?.world?.getItemAt(0);
    const contentSize = worldItem?.getContentSize();
    const imageDimensions = contentSize ? { x: contentSize.x, y: contentSize.y } : { x: 0, y: 0 };


    useEffect(() => {
        if (!osdAnnotator || !annotations) return;

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

    }, [osdAnnotator, imageUri, identifier, annotations]);

    /* Renderer for annotation popups, either details or soon adding */
    const renderAnnotationPopup = () => {
        const selectedAnnotation = selection?.selected?.[0]?.annotation;

        return(
            <AnnotationDetailsPopup annotation={selectedAnnotation} />
        )
    }

    return (
        <>
            <OpenSeadragonViewer options={osdOptions} className="osd-viewer" />
            <OpenSeadragonAnnotationPopup popup={renderAnnotationPopup} />
        </>
    )
}