/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';

/* Import Icons */
import { faFile } from '@fortawesome/free-solid-svg-icons';

/* Import Webroot */
import IIIFLogo from 'webroot/logos/IIIFLogo.png';


/* Props Type */
type Props = {
    digitalMedia: DigitalMedia,
    className?: string
};


/**
 * Component that renders a suitable visualisation of the Digital Media item provided
 * @param digitalMedia: The Digital Media item
 * @returns JSX Component
 */
export const DigitalMediaItem = (props: Props) => {
    const { digitalMedia, className } = props;

    switch (digitalMedia['dcterms:type']) {
        case 'StillImage':
        case 'Image':
            return (
                <div className={`${className} h-100 w-100 d-flex justify-content-center`}>
                    <img src={digitalMedia['ac:accessURI']}
                        alt={digitalMedia['ac:accessURI']}
                        className="h-100 object-fit-contain"
                    />
                </div>
            );
        default:
            if (digitalMedia['dcterms:format'] === 'application/json' || digitalMedia['dcterms:format'] === 'application/ld+json') {
                return (
                    <div className={`${className} h-100 d-flex justify-content-center align-items-center`}>
                        <img src={IIIFLogo}
                            alt="IIIF Logo"
                        />
                    </div>
                );
            } else {
                return (
                    <div className={`${className} h-100`}>
                        <FontAwesomeIcon icon={faFile}
                            className="tc-primary"
                        />
                        <p>{digitalMedia['dcterms:type']}</p>
                    </div>
                );
            }
    };
};
