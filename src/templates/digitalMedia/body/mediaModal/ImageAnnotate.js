import { Annotation } from 'react-mark-image';


const ImageAnnotate = (props) => {
    const digitalMediaItem = props.digitalMediaItem;
    const annotations = props.annotations;

    return (
        <Annotation
            src={digitalMediaItem['MediaMeta']['mediaUrl']['value']}
            alt={digitalMediaItem['id']}
            onAnnotationsUpdate={(annotations) => props.SetAnnotations(annotations)}
            annotations={annotations}
            className="h-100"
        />
    );
}

export default ImageAnnotate;