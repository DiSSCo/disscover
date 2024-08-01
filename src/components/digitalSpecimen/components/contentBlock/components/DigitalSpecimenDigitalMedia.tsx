/* Import Dependencies */
import { Row, Col, Card } from 'react-bootstrap';

/* Import Types */
import { DigitalMedia } from 'app/types/DigitalMedia';

/* Import Components */
import { Audio, File, Image, Video } from 'components/elements/media/MediaComponents';


/* Props Type */
type Props = {
    digitalSpecimenDigitalMedia: DigitalMedia[]
};


/**
 * Component that renders the digital media content block on the digital specimen page
 * @param digitalSpecimenDigitalMedia An array containing the digital media items belonging to the digital specimen
 * @returns JSX Component
 */
const DigitalSpecimenDigitalMedia = (props: Props) => {
    const { digitalSpecimenDigitalMedia } = props;

    /* Base variables */
    const digitalMediaComponentsDict: {
        [mediaType: string]: JSX.Element[]
    } = {};

    /* Determine digital media components based upon their type */
    digitalSpecimenDigitalMedia.forEach(digitalMedia => {
        switch (digitalMedia['dcterms:type']) {
            case 'Image':
            case 'StillImage':
                (digitalMediaComponentsDict.images || (digitalMediaComponentsDict.images = [])).push(
                    <Image accessURI={digitalMedia['ac:accessURI']}
                        sizeOrientation="height"
                        hoverText={digitalMedia['ods:ID']}
                    />);

                break;
            case 'Sound':
                (digitalMediaComponentsDict.audio || (digitalMediaComponentsDict.images = [])).push(
                    <Audio accessURI={digitalMedia['ac:accessURI']} />
                );

                break;
            case 'MovingImage':
                (digitalMediaComponentsDict.video || (digitalMediaComponentsDict.images = [])).push(
                    <Video accessURI={digitalMedia['ac:accessURI']} />
                );

                break;
            default:
                (digitalMediaComponentsDict.otherMedia || (digitalMediaComponentsDict.images = [])).push(
                    <File accessURI={digitalMedia['ac:accessURI']} />
                );
        };
    });

    return (
        <div className="h-100">
            {/* Render dedicated media components per type */}
            {Object.entries(digitalMediaComponentsDict).map(([mediaType, digitalMediaComponents]) => (
                <Row key={mediaType}>
                    <Col>
                        <Card>
                            {digitalMediaComponents}
                        </Card>
                    </Col>
                </Row>
            ))}
        </div>
    );
};

export default DigitalSpecimenDigitalMedia;