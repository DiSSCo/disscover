/* Import Dependencies */
import { Annotorious } from '@annotorious/react';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Types */
import { Annotation } from 'global/Types';

/* Import Components */
// import ImageViewer from 'components/general/mediaTypes/ImageViewer';
import ImageViewer from '../annotate/ImageViewer';
import Video from 'components/general/mediaTypes/Video';
import Audio from 'components/general/mediaTypes/Audio';
import File from 'components/general/mediaTypes/File';
import IIIFViewer from 'components/general/mediaTypes/IIIFViewer';


/* Props Typing */
interface Props {
    UpdateAnnotationsSource: Function
};


const DigitalMediaFrame = (props: Props) => {
    const { UpdateAnnotationsSource } = props;

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);

    /* Check for the type of Digital Media and set content appropiate to it */
    let digitalMediaContent;

    switch (digitalMedia.type) {
        case '2DImageObject':
            digitalMediaContent = <Annotorious>
                <ImageViewer mediaUrl={digitalMedia.mediaUrl}
                    UpdateAnnotationsSource={(annotation: Annotation, remove?: boolean) => UpdateAnnotationsSource(annotation, remove)}
                />
            </Annotorious>

            break;
        case 'video':
            digitalMediaContent = <Video digitalMedia={digitalMedia} />

            break;
        case 'audio':
            digitalMediaContent = <Audio digitalMedia={digitalMedia} />

            break;
        default:
            if (digitalMedia.format === 'application/json' || digitalMedia.format === 'application/ld+json') {
                digitalMediaContent = <IIIFViewer mediaUrl={digitalMedia.mediaUrl} />
            } else {
                digitalMediaContent = <File digitalMedia={digitalMedia} />
            }
    }

    return (
        <div className="h-100 d-flex justify-content-center align-items-center bgc-grey rounded-c overflow-hidden">
            {digitalMediaContent}
        </div>
    );
}

export default DigitalMediaFrame;