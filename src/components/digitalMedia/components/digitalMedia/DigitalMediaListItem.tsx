/* Import Dependencies */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capitalize } from 'app/Utilities';
import classNames from 'classnames';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Types */
import { DigitalMedia } from 'app/Types';

/* Import Styles */
import styles from 'components/digitalMedia/digitalMedia.module.scss';

/* Import Icons */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faMusic, faFile } from '@fortawesome/free-solid-svg-icons';

/* Import Webroot */
import IIIFLogo from 'webroot/img/IIIFLogo.png';


/* Props Typing */
interface Props {
    specimenDigitalMedia: DigitalMedia
};


const DigitalMediaListItem = (props: Props) => {
    const { specimenDigitalMedia } = props;

    /* Hooks */
    const navigate = useNavigate();

    /* Base variables */
    const digitalMedia = useAppSelector(getDigitalMedia);

    /* Check for the type of Digital Media and set content appropiate to it */
    let digitalMediaContent: React.ReactElement;

    switch (specimenDigitalMedia.type) {
        case '2DImageObject':
            digitalMediaContent = <img src={specimenDigitalMedia['ac:accessUri']}
                alt={`Broken ${specimenDigitalMedia.format} link`}
                className="h-100 mx-auto d-flex justify-content-around align-items-center"
            />

            break;
        case 'video':
            digitalMediaContent = <div className="text-center">
                <FontAwesomeIcon icon={faVideo} className={`${styles.digitalMediaListItemIcon} c-secondary`} />
                <p className="fw-lightBold">Video</p>
            </div>

            break;
        case 'audio':
            digitalMediaContent = <div className="text-center">
                <FontAwesomeIcon icon={faMusic} className={`${styles.digitalMediaListItemIcon} c-secondary`} />
                <p className="fw-lightBold">Audio</p>
            </div>

            break;
        default:
            if (specimenDigitalMedia.format === 'application/json' || specimenDigitalMedia.format === 'application/ld+json') {
                digitalMediaContent = <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <img src={IIIFLogo} alt="IIIF Logo" />
                </div>;
            } else {
                digitalMediaContent = <div className="text-center">
                    <FontAwesomeIcon icon={faFile} className={`${styles.digitalMediaListItemIcon} c-secondary`} />
                    <p className="fw-lightBold">File</p>
                </div>
            }
    }

    /* Function for hovering over Digital Media List Items */
    const [hover, setHover] = useState(false);

    /* ClassName for a Digital Media List Item */
    const classDigitalMediaListItem = classNames({
        [`${styles.digitalMediaListItem} h-100 d-inline-block bgc-grey overflow-hidden`]: true,
        [`${styles.hover}`]: hover && (specimenDigitalMedia.id !== digitalMedia.id)
    });

    /* ClassName for Dynamic Image Title */
    const classImageTitle = classNames({
        [`${styles.digitalMediaListItemTitle} start-0 top-0 end-0 bottom-0 m-auto c-white position-absolute text-center z-1 fw-bold transition opacity-0`]: true,
        'opacity-100': digitalMedia.id === specimenDigitalMedia.id || hover
    });

    /* ClassName for Dynamic Backdrop */
    const classBackdrop = classNames({
        'position-absolute bg-dark w-100 h-100 start-0 top-0 opacity-50 transition': digitalMedia.id === specimenDigitalMedia.id || hover
    });

    return (
        <div className={`${classDigitalMediaListItem} position-relative px-1`}
            onMouseEnter={() => { if (specimenDigitalMedia.id !== digitalMedia.id) { setHover(true) } }}
            onMouseLeave={() => { if (specimenDigitalMedia.id !== digitalMedia.id) { setHover(false) } }}
            onClick={() => {
                if (specimenDigitalMedia.id !== digitalMedia.id) {
                    navigate(`/dm/${specimenDigitalMedia['ods:id'].replace('https://doi.org/', '')}`)
                }
            }}
        >
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                {digitalMediaContent}

                <div className={classImageTitle}>
                    {specimenDigitalMedia['dcterms:type'] && Capitalize(specimenDigitalMedia['dcterms:type'])}
                </div>

                <div className={classBackdrop} />
            </div>
        </div>
    );
}

export default DigitalMediaListItem;