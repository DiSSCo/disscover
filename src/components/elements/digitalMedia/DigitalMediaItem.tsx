/* Import Dependencies */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';

/* Import Icons */
import { faFile } from '@fortawesome/free-solid-svg-icons';


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
const DigitalMediaItem = (props: Props) => {
    const { digitalMedia, className } = props;

    switch (digitalMedia['dcterms:type']) {
        case 'StillImage':
        case 'Image':
            return (
                <div className={`${className} h-100 w-100 d-flex justify-content-center`}>
                    <img src={digitalMedia['ac:accessURI']}
                        alt={digitalMedia['ac:accessURI']}
                        className="h-100"
                    />
                </div>
            );
        default:
            return (
                <div className={`${className} h-100`}>
                    <FontAwesomeIcon icon={faFile}
                        className="tc-primary"
                    />
                    <p>{digitalMedia['dcterms:type']}</p>
                </div>
            );
    };
};

export default DigitalMediaItem;