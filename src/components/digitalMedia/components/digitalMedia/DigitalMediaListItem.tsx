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

/* Import Components */
import MediaIcon from 'components/general/mediaTypes/MediaRepresentation';


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
    let digitalMediaContent: React.ReactElement = <div className="text-center h-100">
        <MediaIcon mediaType={specimenDigitalMedia.digitalEntity['dcterms:type'] as string}
            iconClassName={`${styles.digitalMediaListItemIcon} c-secondary`}
            accessUri={specimenDigitalMedia.digitalEntity['ac:accessUri']}
            format={specimenDigitalMedia.digitalEntity['dcterms:format']}
        />
    </div>

    /* Function for hovering over Digital Media List Items */
    const [hover, setHover] = useState(false);

    /* ClassName for a Digital Media List Item */
    const classDigitalMediaListItem = classNames({
        [`${styles.digitalMediaListItem} h-100 d-inline-block bgc-grey overflow-hidden`]: true,
        [`${styles.hover}`]: hover && (specimenDigitalMedia.digitalEntity['ods:id'] !== digitalMedia.digitalEntity['ods:id'])
    });

    /* ClassName for Dynamic Image Title */
    const classImageTitle = classNames({
        [`${styles.digitalMediaListItemTitle} start-0 top-0 end-0 bottom-0 m-auto c-white position-absolute text-center z-1 fw-bold transition opacity-0`]: true,
        'opacity-100': digitalMedia.digitalEntity['ods:id'] === specimenDigitalMedia.digitalEntity['ods:id'] || hover
    });

    /* ClassName for Dynamic Backdrop */
    const classBackdrop = classNames({
        'position-absolute bg-dark w-100 h-100 start-0 top-0 opacity-50 transition': digitalMedia.digitalEntity['ods:id'] === specimenDigitalMedia.digitalEntity['ods:id'] || hover
    });

    return (
        <div className={`${classDigitalMediaListItem} button-no-style position-relative px-1`}>
            <button type="button" className="button-no-style h-100 w-100"
                onMouseEnter={() => { if (specimenDigitalMedia.digitalEntity['ods:id'] !== digitalMedia.digitalEntity['ods:id']) { setHover(true) } }}
                onMouseLeave={() => { if (specimenDigitalMedia.digitalEntity['ods:id'] !== digitalMedia.digitalEntity['ods:id']) { setHover(false) } }}
                onClick={() => {
                    if (specimenDigitalMedia.digitalEntity['ods:id'] !== digitalMedia.digitalEntity['ods:id']) {
                        navigate(`/dm/${specimenDigitalMedia.digitalEntity['ods:id'].replace(process.env.REACT_APP_DOI_URL as string, '')}`)
                    }
                }}
            >
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    {digitalMediaContent}

                    <div className={classImageTitle}>
                        {specimenDigitalMedia.digitalEntity['dcterms:type'] && Capitalize(specimenDigitalMedia.digitalEntity['dcterms:type'])}
                    </div>

                    <div className={classBackdrop} />
                </div>
            </button>
        </div>
    );
}

export default DigitalMediaListItem;