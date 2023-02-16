/* Import Dependencies */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getDigitalMedia } from 'redux/digitalMedia/DigitalMediaSlice';

/* Import Types */
import { DigitalMedia } from 'global/Types';


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
            alt={specimenDigitalMedia.id}
            className="w-100"
        />
    } else {
        digitalMediaContent = <img src={specimenDigitalMedia.mediaUrl}
        alt={specimenDigitalMedia.id}
        className="w-100"
    />;
    }

    /* Function for hovering over Digital Media List Items */
    const [hover, setHover] = useState(false);

    /* ClassName for hovering over a Digital Media List Item */
    const classHover = classNames({
        'hover': hover
    });

    /* ClassName for selecting a Digital Media List Item */
    const classActive = classNames({
        'active': (specimenDigitalMedia.id === digitalMedia.id)
    });

    return (
        <Row>
            <Col className={`digitalMedia_mediaListItem position-relative d-flex align-items-center justify-content-center`}
                onMouseEnter={() => { if (specimenDigitalMedia.id !== digitalMedia.id) { setHover(true) } }}
                onMouseLeave={() => { if (specimenDigitalMedia.id !== digitalMedia.id) { setHover(false) } }}
                onClick={() => { if (specimenDigitalMedia.id !== digitalMedia.id) { navigate(`/dm/${specimenDigitalMedia.id}`) } }}
            >
                <div className={`digitalMedia_mediaListItemImage ${classHover} position-absolute overflow-hidden w-100 h-100 top-0 start-0`}>
                    {digitalMediaContent}
                </div>

                <div className={`digitalMedia_mediaListItemText ${classHover} ${classActive} position-relative text-center z-1 fw-bold`}>
                    {specimenDigitalMedia['type']}
                </div>
            </Col>
        </Row>
    );
}

export default DigitalMediaListItem;