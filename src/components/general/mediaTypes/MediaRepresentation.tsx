/* Import Dependencies */
import classNames from "classnames";

/* Import Icons */
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
    ClickEvent?: Function
};


const MediaRepresentation = (props: Props) => {
    const { mediaType, iconClassName, accessUri, format, ClickEvent } = props;

    /* Base variables */
    let mediaIcon: JSX.Element | undefined;

    /* Function for when media representation is selected */
    const OnSelect = () => {
        if (ClickEvent) {
            ClickEvent()
        }
    }

    /* ClassNames */
    const classMediaIcon = classNames({
        'c-pointer': OnSelect
    });

    switch (mediaType) {
        case 'StillImage':
            mediaIcon = <div className={`${classMediaIcon} h-100 w-100 rounded-c b-none d-flex justify-content-center overflow-hidden`}
                onClick={() => OnSelect()}
                onKeyDown={() => OnSelect()}
            >
                <img src={accessUri}
                    alt={`Broken ${accessUri} link`}
                    className="h-100 d-flex justify-content-around align-items-center"
                />
            </div>

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
                    onClick={() => OnSelect()}
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