/* Import Dependencies */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Types */
import { DigitalMedia } from 'global/Types';

/* Import Styles */
import styles from 'components/digitalMedia/digitalMedia.module.scss';


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

    if (specimenDigitalMedia.type === '2DImageObject') {
        digitalMediaContent = <img src={specimenDigitalMedia.mediaUrl}
            alt={`Broken ${specimenDigitalMedia.format} link`}
            className={`${styles.digitalMediaListItemImage} h-100`}
        />
    } else {
        digitalMediaContent = <img src={specimenDigitalMedia.mediaUrl}
            alt={specimenDigitalMedia.mediaUrl}
            className="h-100"
        />;
    }

    /* Function for hovering over Digital Media List Items */
    const [hover, setHover] = useState(false);

    /* ClassName for a Digital Media List Item */
    const classDigitalMediaListItem = classNames({
        [`${styles.digitalMediaListItem}`]: true,
        [`${styles.hover}`]: hover && (specimenDigitalMedia.id !== digitalMedia.id)
    });

    /* ClassName for Dynamic Image Title */
    const classImageTitle = classNames({
        [`${styles.digitalMediaListItemTitle} position-absolute text-center z-1 fw-bold transition opacity-0`]: true,
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
            onClick={() => { if (specimenDigitalMedia.id !== digitalMedia.id) {
                navigate(`/dm/${specimenDigitalMedia.id.replace('https://hdl.handle.net/', '')}`)
            } }}
        >
            {digitalMediaContent}

            <div className={classImageTitle}>
                {specimenDigitalMedia['type']}
            </div>

            <div className={classBackdrop} />
        </div>
    );
}

export default DigitalMediaListItem;