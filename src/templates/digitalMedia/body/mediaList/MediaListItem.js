import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';


const MediaListItem = (props) => {
    const digitalMediaItem = props.digitalMediaItem;
    const chosen = props.chosen;

    let digitalMediaContent;

    switch (digitalMediaItem['type']) {
        case "2DImageObject":
            digitalMediaContent = <img src={digitalMediaItem['mediaUrl']}
                alt={digitalMediaItem['id']}
                className="w-100"
            />

            break;
    }

    const [hoverOn, setHoverOn] = useState();

    useEffect(() => {
        setHoverOn();
    }, [chosen])

    function HoverOnMediaListItem(hover) {
        if (hover) {
            setHoverOn('hover');
        } else {
            setHoverOn();
        }
    }

    return (
        <Row>
            {(chosen) ?
                <Col className={`digitalMedia_mediaListItem ${chosen} position-relative d-flex align-items-center justify-content-center`}>
                    <div className={`digitalMedia_mediaListItemImage position-absolute overflow-hidden w-100 h-100 top-0 start-0`}>
                        {digitalMediaContent}
                    </div>

                    <div className={`digitalMedia_mediaListItemText ${chosen} position-relative text-center z-1 fw-bold`}>
                        {digitalMediaItem['type']}
                    </div>
                </Col>
                : <Link to={`/dm/${digitalMediaItem['id']}`}>
                    <Col className={`digitalMedia_mediaListItem ${hoverOn} position-relative d-flex align-items-center justify-content-center`}
                        onMouseEnter={() => HoverOnMediaListItem(true)}
                        onMouseLeave={() => HoverOnMediaListItem(false)}
                    >
                        <div className={`digitalMedia_mediaListItemImage ${hoverOn} position-absolute overflow-hidden w-100 h-100 top-0 start-0`}>
                            {digitalMediaContent}
                        </div>

                        <div className={`digitalMedia_mediaListItemText ${hoverOn} position-relative text-center z-1 fw-bold`}>
                            {digitalMediaItem['type']}
                        </div>
                    </Col>
                </Link>
            }
        </Row>
    );
}

export default MediaListItem;