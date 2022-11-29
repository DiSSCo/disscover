import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

/* Import Components */
import MediaListItem from './MediaListItem';

/* Import API */
import GetSpecimenDigitalMedia from 'api/specimen/GetSpecimenDigitalMedia';


const MediaList = (props) => {
    const digitalMediaItem = props.digitalMediaItem;

    const [specimenDigitalMediaItems, setSpecimenDigitalMediaItems] = useState();

    useEffect(() => {
        GetSpecimenDigitalMedia(digitalMediaItem['MediaMeta']['digitalSpecimenId']['value'], Process);

        function Process(result) {
            setSpecimenDigitalMediaItems(result);
        }
    }, [digitalMediaItem]);

    if (specimenDigitalMediaItems) {
        let digitalMediaItemsView = [];

        for (const i in specimenDigitalMediaItems) {
            if (digitalMediaItem['MediaMeta']['id']['value'] === specimenDigitalMediaItems[i]['id']) {
                digitalMediaItemsView.push(
                    <Row key={i}>
                        <Col className="border border-white position-relative">
                            <MediaListItem digitalMediaItem={specimenDigitalMediaItems[i]} 
                                chosen={'chosen'}
                            />

                            <div className="position-absolute bg-dark w-100 h-100 start-0 top-0 opacity-50" />
                        </Col>
                    </Row>
                );
            } else {
                digitalMediaItemsView.push(
                    <Row key={i}>
                        <Col className="border border-white">
                            <MediaListItem digitalMediaItem={specimenDigitalMediaItems[i]} />
                        </Col>
                    </Row>
                );
            }
        }

        return digitalMediaItemsView;
    }
}

export default MediaList;