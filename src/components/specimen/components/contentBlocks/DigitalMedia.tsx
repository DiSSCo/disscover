/* Import Dependencies */
import { Capitalize } from 'global/Utilities';
import { Row, Col, Card } from 'react-bootstrap';

/* Import Store */
import { useAppSelector } from 'app/hooks';
import { getSpecimenDigitalMedia } from 'redux/specimen/SpecimenSlice';

/* Import Styles */
import styles from 'components/specimen/specimen.module.scss';

/* Components */
import Image from './digitalMediaBlock/Image';
import Video from './digitalMediaBlock/Video';
import Audio from './digitalMediaBlock/Audio';
import File from './digitalMediaBlock/File';


const DigitalMedia = () => {
    /* Base variables */
    const specimenDigitalMedia = useAppSelector(getSpecimenDigitalMedia);
    let sortedDigitalMedia: { [mediaType: string]: React.ReactElement[] } = {};

    let created = new Date();

    let test = [...specimenDigitalMedia];

    test.push({
        annotations: [],
        created: new Date(),
        digitalMediaObject: {
            id: '100',
            data: {},
            created: new Date(),
            digitalSpecimenId: '200',
            format: 'video',
            mediaUrl: '',
            originalData: {},
            sourceSystemId: '300',
            type: 'video',
            version: 2
        }
    });

    test.push({
        annotations: [],
        created: new Date(),
        digitalMediaObject: {
            id: '100',
            data: {},
            created: new Date(),
            digitalSpecimenId: '200',
            format: 'video',
            mediaUrl: '',
            originalData: {},
            sourceSystemId: '300',
            type: 'audio',
            version: 2
        }
    });

    test.push({
        annotations: [],
        created: new Date(),
        digitalMediaObject: {
            id: '100',
            data: {},
            created: new Date(),
            digitalSpecimenId: '200',
            format: 'video',
            mediaUrl: 'File.pdf',
            originalData: {},
            sourceSystemId: '300',
            type: 'file',
            version: 2
        }
    });

    /* Sort Digital Media based upon type/format */
    test.forEach((item) => {
        const digitalMediaItem = item.digitalMediaObject;

        switch (digitalMediaItem.type) {
            case '2DImageObject':
                (sortedDigitalMedia.images || (sortedDigitalMedia.images = [])).push(
                    <Image digitalMedia={digitalMediaItem} />
                );

                return;
            case 'video':
                (sortedDigitalMedia.videos || (sortedDigitalMedia.videos = [])).push(
                    <Video digitalMedia={digitalMediaItem} />
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
                                    <p className={`${styles.digitalMediaTitle} c-accent fw-lightBold`}>
                                        {Capitalize(mediaType)}
                                    </p>
                                </Col>
                            </Row>
                            {/* Digital Media Components */}
                            <Row className="mt-2">
                                {mediaComponents.map((mediaComponent, index) => {
                                    const key = `${mediaType} ${index}`;

                                    return (
                                        <Col key={key} lg={{span: 3}}>
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