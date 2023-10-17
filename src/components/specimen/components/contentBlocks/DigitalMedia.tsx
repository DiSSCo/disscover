/* Import Dependencies */
import { Link } from 'react-router-dom';
import { Capitalize } from 'app/Utilities';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimenDigitalMedia } from 'redux/specimen/SpecimenSlice';

/* Import Types */
import { DigitalMedia as DigitalMediaType } from 'app/Types';

/* Components */
import Image from 'components/general/mediaTypes/Image';
import Video from 'components/general/mediaTypes/Video';
import Audio from 'components/general/mediaTypes/Audio';
import File from 'components/general/mediaTypes/File';


const DigitalMedia = () => {
    /* Base variables */
    const specimenDigitalMedia = useAppSelector(getSpecimenDigitalMedia);
    let sortedDigitalMedia: { [mediaType: string]: React.ReactElement[] } = {};

    /* Sort Digital Media based upon type/format */
    specimenDigitalMedia.forEach((digitalMediaItem: DigitalMediaType) => {
        switch (digitalMediaItem['ods:type']) {
            case '2DImageObject':
                (sortedDigitalMedia.images || (sortedDigitalMedia.images = [])).push(
                    <Link to={`/dm/${digitalMediaItem['ods:id'].replace('https://doi.org/', '')}`}>
                        <Image digitalMedia={digitalMediaItem}
                            sizeOrientation='width' hoverEffect={true}
                        />
                    </Link>
                );

                return;
            case 'video':
                (sortedDigitalMedia.videos || (sortedDigitalMedia.videos = [])).push(
                    <Video digitalMedia={digitalMediaItem}
                        hoverEffect={true}
                    />
                );

                return;
            case 'audio':
                (sortedDigitalMedia.audio || (sortedDigitalMedia.audio = [])).push(
                    <Audio digitalMedia={digitalMediaItem} />
                );

                return;
            default:
                (sortedDigitalMedia['other Media'] || (sortedDigitalMedia['other Media'] = [])).push(
                    <File digitalMedia={digitalMediaItem} />
                );
        }
    });

    return (
        <Row className="h-100 overflow-scroll">
            <Col className="h-100">
                {Object.keys(sortedDigitalMedia).map((mediaType) => {
                    const mediaComponents = sortedDigitalMedia[mediaType];

                    return (
                        <Card key={mediaType} className="px-4 py-3 mb-3">
                            {/* Digital Media type title */}
                            <Row>
                                <Col>
                                    <p className="fs-3 c-accent fw-lightBold">
                                        {Capitalize(mediaType)}
                                    </p>
                                </Col>
                            </Row>
                            {/* Digital Media Components */}
                            <Row className="mt-2">
                                {mediaComponents.map((mediaComponent, index) => {
                                    const key = `${mediaType} ${index}`;

                                    return (
                                        <Col key={key} lg={{ span: 3 }}>
                                            {mediaComponent}
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Card>
                    );
                })}
            </Col>
        </Row>
    );
}

export default DigitalMedia;