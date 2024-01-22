/* Import Dependencies */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faMusic, faFile } from '@fortawesome/free-solid-svg-icons'

/* Import Webroot */
import IIIFLogo from 'webroot/img/IIIFLogo.png';


/* Props Typing */
interface Props {
    mediaType: string,
    iconClassName: string,
    accessUri?: string,
    format?: string,
    clickEvent?: Function
};


const MediaRepresentation = (props: Props) => {
    const { mediaType, iconClassName, accessUri, format, clickEvent } = props;

    /* Base variables */
    let mediaIcon: JSX.Element | undefined;

    switch (mediaType) {
        case 'StillImage':
            mediaIcon = <button type="button"
                className="h-100 w-100 rounded-c b-none d-flex justify-content-center overflow-hidden"
                onClick={() => { if (clickEvent) { clickEvent() } }}
            >
                <img src={accessUri}
                    alt={`Broken ${accessUri} link`}
                    className="h-100 d-flex justify-content-around align-items-center"
                />
            </button>

            break;
        case 'MovingImage':
            mediaIcon = <div className="text-center">
                <FontAwesomeIcon icon={faVideo} className={`${iconClassName} c-secondary`} />
                <p className="fw-lightBold">Video</p>
            </div>

            break;
        case 'Sound':
            mediaIcon = <div className="text-center">
                <FontAwesomeIcon icon={faMusic} className={`${iconClassName} c-secondary`} />
                <p className="fw-lightBold">Audio</p>
            </div>

            break;
        default:
            if (format === 'application/json' || format === 'application/ld+json') {
                mediaIcon = <button type="button"
                    className="h-100 w-100 rounded-c b-none mx-auto d-flex justify-content-around align-items-center"
                    onClick={() => { if (clickEvent) { clickEvent() } }}
                >
                    <img src={IIIFLogo} alt="IIIF Logo" />
                </button>;
            } else {
                mediaIcon = <div className="text-center">
                    <FontAwesomeIcon icon={faFile} className={`${iconClassName} c-secondary`} />
                    <p className="fw-lightBold">File</p>
                </div>
            }
    }

    return mediaIcon;
}

export default MediaRepresentation;